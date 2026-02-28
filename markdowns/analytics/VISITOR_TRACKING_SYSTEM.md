# Visitor Tracking System — How It Works

## Overview

The visitor tracking system is implemented in `src/hooks/useVisitorCounter.ts`.  
It tracks every visit to the portfolio and stores rich visitor data in **Upstash Redis** (a serverless Redis database accessed via HTTP REST API).

---

## Redis Data Model

Two keys are used in the database:

| Key | Type | Purpose |
|---|---|---|
| `portfolio:visitors` | STRING (integer) | Total visit counter — increments on every new session |
| `portfolio:visitors:log` | HASH | One entry per unique IP address containing full visitor info |

### Structure of each Hash entry

```
field  →  IP address  (e.g. "103.12.34.56")
value  →  JSON string
```

```json
{
  "ip":           "103.12.34.56",
  "country":      "Bangladesh",
  "country_code": "BD",
  "region":       "Dhaka Division",
  "city":         "Dhaka",
  "latitude":     23.7104,
  "longitude":    90.4074,
  "org":          "AS24389 Bangladesh Telecommunications",
  "browser":      "Chrome",
  "os":           "Windows",
  "device":       "Desktop",
  "screen":       "1920x1080",
  "referrer":     "https://github.com",
  "language":     "en-US",
  "count":        7,
  "firstVisit":   "2026-03-01T10:00:00.000Z",
  "lastVisit":    "2026-03-01T18:45:00.000Z"
}
```

---

## Visit Detection Logic

The system uses the browser's `sessionStorage` to distinguish between a **new session** and a **normal page refresh**.

```
sessionStorage key: "visitor_counted"
```

| Scenario | sessionStorage flag | Action |
|---|---|---|
| New tab / hard refresh / first visit | Absent (cleared by browser) | Full tracking + counter increment |
| Normal refresh (F5 / Ctrl+R) | Present (`"1"`) | Read-only GET of counter, no write |

---

## Flow Diagram

```
User opens portfolio
        │
        ▼
sessionStorage["visitor_counted"] === "1" ?
        │
   YES  │  NO
        │   │
        │   ▼
        │  Set sessionStorage["visitor_counted"] = "1"
        │   │
        │   ▼
        │  Fetch geo data from ipapi.co
        │  (if ipapi fails/errors → fallback to api.ipify.org for IP only)
        │  Parse browser / OS / device from User-Agent
        │  Capture screen, referrer, language, timestamp
        │   │
        │   ▼
        │  HGET portfolio:visitors:log <ip>
        │        │
        │   Found │  Not Found
        │        │       │
        │        ▼       ▼
        │  count++   Create new record
        │  lastVisit = now    count = 1
        │        │       │
        │        └───┬───┘
        │            ▼
        │   Pipeline to Upstash:
        │     INCR  portfolio:visitors
        │     HSET  portfolio:visitors:log <ip> <json>
        │            │
        ▼            ▼
  GET portfolio:visitors   Return new counter value
        │
        ▼
  Display: counter + 2000 (BASE_OFFSET)
```

---

## Data Collected Per Visitor

### Geolocation

Primary source: **[ipapi.co](https://ipapi.co)** — free, no API key required (`GET https://ipapi.co/json/`)  
Fallback source: **[api.ipify.org](https://api.ipify.org)** — used only if ipapi.co fails or returns an error, captures IP address only.

| Field | Description | Source |
|---|---|---|
| `ip` | Visitor's public IP address | ipapi.co → ipify fallback |
| `country` | Full country name (e.g. "Bangladesh") | ipapi.co |
| `country_code` | ISO 2-letter code (e.g. "BD") | ipapi.co (`country_code` or `country`) |
| `region` | State / division | ipapi.co |
| `city` | City name | ipapi.co |
| `latitude` | Geographic latitude | ipapi.co |
| `longitude` | Geographic longitude | ipapi.co |
| `org` | ISP / organization name | ipapi.co |

#### ipapi.co error handling

ipapi.co returns HTTP 200 even on failure (e.g. rate limit), with `{ "error": true, "reason": "..." }` in the body. The code checks for this and skips the broken field mapping rather than storing empty/`"Unknown"` values:

```typescript
if (!g.error) {
  // map all fields normally
} else if (g.ip) {
  // error response may still include the IP
  base.ip = g.ip
}
```

If ipapi fails entirely (network error or error response with no IP), `api.ipify.org` is called as a last resort to capture at least the real IP address, ensuring hash keys are real IPs rather than `anon:UUID`.

### Browser & Device (parsed from `navigator.userAgent`)

| Field | Detected values |
|---|---|
| `browser` | Chrome, Firefox, Edge, Opera, Safari |
| `os` | Windows, macOS, Android, iOS, Linux |
| `device` | Desktop, Mobile, Tablet |

### Page Context (from browser APIs)

| Field | Source |
|---|---|
| `screen` | `window.screen.width x window.screen.height` |
| `referrer` | `document.referrer` (or `"Direct"` if none) |
| `language` | `navigator.language` |
| `firstVisit` | ISO 8601 timestamp of first ever visit from this IP |
| `lastVisit` | ISO 8601 timestamp of most recent visit from this IP |
| `count` | Total number of sessions from this IP |

---

## Display Offset

The raw counter stored in Redis starts from `0`, but the displayed count adds a `BASE_OFFSET` of **2000**:

```
displayed count = Redis counter + 2000
```

This gives the portfolio a more realistic starting number rather than showing `1` on the first visit.

---

## Singleton Pattern

A module-level `singletonPromise` variable ensures that even if multiple React components mount `useVisitorCounter()` simultaneously, **only one HTTP request** is made per page load:

```typescript
let singletonPromise: Promise<number | null> | null = null
```

All hook instances share the same promise and receive the same result.

---

## Upstash Pipeline

For new sessions, two Redis commands are sent in **a single HTTP round-trip** using the Upstash pipeline endpoint (`POST /pipeline`):

```json
[
  ["INCR", "portfolio:visitors"],
  ["HSET", "portfolio:visitors:log", "<ip>", "<json>"]
]
```

This reduces latency compared to two separate requests.

---

## Security Notes

- The Upstash REST token is embedded in the client bundle (`NEXT_PUBLIC_` prefix).
- To restrict access: go to **Upstash Console → Settings → Allow List** and add `https://sksazid.me`.
- No passwords, emails, or sensitive personal input is ever stored — only automatically collected browser/network metadata.

---

## Useful Redis Commands (Upstash Console)

```bash
# View the total visit count
GET portfolio:visitors

# View all visitor records (IP → JSON)
HGETALL portfolio:visitors:log

# View data for a specific IP
HGET portfolio:visitors:log 103.12.34.56

# Count number of unique IPs tracked
HLEN portfolio:visitors:log

# Delete a specific IP record
HDEL portfolio:visitors:log 103.12.34.56

# Reset the total counter
SET portfolio:visitors 0
```

---

## Files

| File | Role |
|---|---|
| `src/hooks/useVisitorCounter.ts` | Core hook — all tracking logic lives here |
| `.env.local` | `NEXT_PUBLIC_UPSTASH_REST_URL` and `NEXT_PUBLIC_UPSTASH_REST_TOKEN` |
