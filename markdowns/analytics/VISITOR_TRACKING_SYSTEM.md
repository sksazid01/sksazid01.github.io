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
        │  Step 1: GET ipapi.co/json/
        │    ├─ success → IP + full geo captured
        │    └─ fail/error
        │         │
        │         ▼
        │       Step 2: GET api.ipify.org  → IP only
        │         │
        │         ▼
        │       Step 3: GET ipapi.co/{ip}/json/  → full geo
        │
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
        │  backfill geo      (full record)
        │  if still Unknown  
        │        │       │
        │        └───┬───┘
        │            ▼
        │   Pipeline to Upstash:
        │     INCR  portfolio:visitors
        │     HSET  portfolio:visitors:log <ip> <json>
        │            │
        ▼            ▼
  GET portfolio:visitors   Return counter value
        │
        ▼
  Display: raw Redis counter (no offset)
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

#### 3-step geo resolution

Geo is resolved in up to 3 steps per new session:

| Step | Endpoint | What it provides |
|---|---|---|
| 1 | `https://ipapi.co/json/` | IP + full geo (client auto-detect) |
| 2 | `https://api.ipify.org?format=json` | IP only — runs if step 1 failed |
| 3 | `https://ipapi.co/{ip}/json/` | Full geo via specific-IP endpoint — runs if step 2 ran |

The trailing slash on ipapi.co URLs is **required** — `ipapi.co/{ip}/json` (no slash) returns `RateLimited` even when the quota is not exhausted.

ipapi.co returns HTTP 200 even on rate-limit/block, with `{ "error": true, "reason": "RateLimited" }` in the body. The code detects this and falls through to the next step rather than storing empty/`"Unknown"` values.

If all three steps fail, the IP falls back to `anon:{uuid}` so sessions are still counted and don't overwrite each other in the hash.

#### Geo backfill for returning visitors

When a known IP revisits and its stored record still has `country === "Unknown"` (e.g. created before the geo fix, or when ipapi was rate-limited on first visit), the code automatically backfills the missing geo fields on the next successful visit:

```typescript
if (record.country === 'Unknown' && baseData.country !== 'Unknown') {
  record.country      = baseData.country
  record.country_code = baseData.country_code
  record.region       = baseData.region
  record.city         = baseData.city
  record.latitude     = baseData.latitude
  record.longitude    = baseData.longitude
  record.org          = baseData.org
}
```

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
