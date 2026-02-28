# Upstash Redis — Deep Dive

## What is Upstash?

**Upstash** is a **serverless, cloud-hosted Redis** database.  
It is fully managed — no server to provision, no connection pool to maintain.  
You interact with it over plain **HTTPS** using a REST API, which makes it perfect for frontend-only or edge environments.

---

## Relational or Non-Relational?

**Non-Relational (NoSQL)**

| Property | Upstash / Redis |
|---|---|
| Data model | Key-Value store |
| Schema | Schemaless — no tables, no columns, no foreign keys |
| Joins | Not supported |
| Query language | Redis commands (`GET`, `SET`, `HGET`, `LPUSH`, etc.) |
| Relationships | Managed manually by the developer via key naming conventions |
| ACID transactions | Partial — `MULTI/EXEC` for atomic batches only |
| Best for | Counters, caches, sessions, real-time data, leaderboards |

Redis is fundamentally a **key-value store** that supports multiple data structures per key.

---

## Redis Data Structures

Each key in Redis holds one specific type:

| Type | Description | Common Commands |
|---|---|---|
| **String** | A single value (text, number, JSON) | `GET`, `SET`, `INCR`, `DECR` |
| **Hash** | A map of field → value pairs (like a JS object) | `HGET`, `HSET`, `HGETALL`, `HDEL` |
| **List** | Ordered list of strings | `LPUSH`, `RPUSH`, `LRANGE`, `LTRIM` |
| **Set** | Unordered collection of unique strings | `SADD`, `SMEMBERS`, `SISMEMBER` |
| **Sorted Set** | Set scored by a float (e.g. leaderboards) | `ZADD`, `ZRANGE`, `ZRANK` |

### What this portfolio uses

```
portfolio:visitors          → String  (integer counter)
portfolio:visitors:log      → Hash    (field = IP, value = JSON)
```

---

## How Upstash Differs from Traditional Redis

| Feature | Traditional Redis | Upstash |
|---|---|---|
| Connection | TCP socket (persistent) | HTTPS REST or WebSocket |
| Requires server | Yes (Redis process running) | No — fully serverless |
| Works from browser | No (TCP blocked by browsers) | **Yes** — plain `fetch()` |
| Works from edge/CDN | No | Yes |
| Pricing | Self-hosted cost | Pay-per-request free tier |
| Latency | Sub-millisecond (local) | ~50–150ms (HTTP round-trip) |

---

## Sending Requests Without a Server

Because Upstash exposes a **REST API over HTTPS**, you can call it directly from the **browser** using the native `fetch()` API — no Node.js, no backend, no proxy needed.

### Authentication

Every request must include a Bearer token in the `Authorization` header:

```
Authorization: Bearer <UPSTASH_REST_TOKEN>
```

Your credentials come from environment variables:
```
NEXT_PUBLIC_UPSTASH_REST_URL    = https://your-db.upstash.io
NEXT_PUBLIC_UPSTASH_REST_TOKEN  = AXxx...
```

---

## REST API — Request Formats

Upstash supports two ways to send commands:

### 1. URL-Path Format (GET request)

Commands are encoded directly in the URL path:

```
GET https://<db>.upstash.io/<COMMAND>/<arg1>/<arg2>
```

```javascript
// GET a key
fetch('https://your-db.upstash.io/get/portfolio:visitors', {
  headers: { Authorization: 'Bearer <TOKEN>' }
})

// INCR a counter
fetch('https://your-db.upstash.io/incr/portfolio:visitors', {
  headers: { Authorization: 'Bearer <TOKEN>' }
})

// HGET a hash field
fetch('https://your-db.upstash.io/hget/portfolio:visitors:log/103.12.34.56', {
  headers: { Authorization: 'Bearer <TOKEN>' }
})
```

**Response shape:**
```json
{ "result": 42 }
```

---

### 2. Pipeline Format (POST request — multiple commands)

Send multiple commands in one HTTP round-trip:

```
POST https://<db>.upstash.io/pipeline
Content-Type: application/json
Authorization: Bearer <TOKEN>

[
  ["INCR", "portfolio:visitors"],
  ["HSET", "portfolio:visitors:log", "103.x.x.x", "{...json...}"]
]
```

```javascript
fetch('https://your-db.upstash.io/pipeline', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer <TOKEN>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify([
    ['INCR', 'portfolio:visitors'],
    ['HSET', 'portfolio:visitors:log', '103.x.x.x', JSON.stringify(visitorData)],
  ]),
})
```

**Response shape (array — one result per command):**
```json
[
  { "result": 43 },
  { "result": 1 }
]
```

Pipeline is used in this portfolio for every new visit write — it sends `INCR + HSET` atomically in one request.

---

## Full Request/Response Lifecycle (Browser → Upstash)

```
Browser
  │
  │  1. fetch('https://your-db.upstash.io/hget/...', { headers: { Authorization: 'Bearer ...' } })
  │
  ▼
Upstash Edge Network (HTTPS)
  │
  │  2. Token verified
  │  3. Redis command executed on the database
  │  4. Result serialized as JSON
  │
  ▼
Browser
  │
  │  5. Response: { "result": "...stored JSON string..." }
  │
  ▼
JavaScript parses result → updates React state
```

No server, no backend, no API route — the browser talks to Upstash directly.

---

## Security Considerations

Since `NEXT_PUBLIC_` variables are **bundled into the static HTML/JS** and visible to anyone who inspects the page source:

| Risk | Mitigation |
|---|---|
| Anyone can read your token | Lock down in Upstash: **Settings → Allow List → add your domain** |
| Someone spams your counter | Allow List restricts requests to `https://sksazid.me` only |
| Data exposure | Only non-sensitive metadata is stored (no passwords, no emails) |

> **Allow List path in Upstash Console:**  
> Database → Settings → Security → **Allow List**  
> Add: `https://sksazid.me`

---

## Upstash Free Tier Limits

| Limit | Value |
|---|---|
| Requests per day | 10,000 |
| Requests per second | 100 |
| Max database size | 256 MB |
| Max commands per pipeline | 100 |
| Regions | Global edge (low latency) |

For a personal portfolio, the free tier is more than sufficient.

---

## Useful REST API Examples

```bash
# GET a string key
curl https://your-db.upstash.io/get/portfolio:visitors \
  -H "Authorization: Bearer <TOKEN>"

# INCR a counter
curl https://your-db.upstash.io/incr/portfolio:visitors \
  -H "Authorization: Bearer <TOKEN>"

# HGETALL — get every field in the hash
curl https://your-db.upstash.io/hgetall/portfolio:visitors:log \
  -H "Authorization: Bearer <TOKEN>"

# HLEN — count unique IPs
curl https://your-db.upstash.io/hlen/portfolio:visitors:log \
  -H "Authorization: Bearer <TOKEN>"

# Pipeline — two commands at once
curl https://your-db.upstash.io/pipeline \
  -X POST \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[["GET","portfolio:visitors"],["HLEN","portfolio:visitors:log"]]'
```

---

## Summary

| Question | Answer |
|---|---|
| Relational? | No — it's a key-value NoSQL store |
| Schema? | None — fully schemaless |
| Server required? | No — uses HTTPS REST, works directly from `fetch()` in the browser |
| How to authenticate? | `Authorization: Bearer <token>` header |
| Single command | `GET https://<db>.upstash.io/<CMD>/<args>` |
| Multiple commands | `POST https://<db>.upstash.io/pipeline` with JSON array body |
| Free tier | 10,000 requests/day — sufficient for a portfolio |

---

## Related Files

| File | Description |
|---|---|
| `src/hooks/useVisitorCounter.ts` | Full implementation using Upstash REST |
| `markdowns/VISITOR_TRACKING_SYSTEM.md` | Visitor tracking system design |
| `.env.local` | `NEXT_PUBLIC_UPSTASH_REST_URL` and `NEXT_PUBLIC_UPSTASH_REST_TOKEN` |
