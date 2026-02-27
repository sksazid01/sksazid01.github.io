# Real-Time Visitor Counter — Upstash Redis

Replaces the previous nightly Google Analytics batch approach with a true
real-time counter using Upstash Redis REST API.

---

## How It Works

```
User opens portfolio
       │
       ▼
useVisitorCounter hook fires (on mount)
       │
       ▼
GET https://smiling-glowworm-23379.upstash.io/incr/portfolio:visitors
       │
       ▼
Upstash atomically increments counter → returns new value
       │
       ▼
Display:  rawCount + 2000  (baseline offset)
```

Every page load increments the counter in ~50–100 ms. No cron jobs, no
server, no nightly deploys — purely client-side.

---

## Files

| File | Purpose |
|------|---------|
| `src/hooks/useVisitorCounter.ts` | New hook — calls Upstash `INCR`, returns live count |
| `src/hooks/useDynamicPortfolio.tsx` | Consumes `useVisitorCounter` instead of fake hash counts |
| `.github/workflows/deploy.yml` | Injects `NEXT_PUBLIC_UPSTASH_REST_URL/TOKEN` at build time |
| `.env.local` | Local dev credentials (gitignored via `.env*` rule) |

### Deleted (old GA batch approach)
| File | Reason removed |
|------|---------------|
| `scripts/fetch-ga-stats.py` | No longer needed |
| `public/stats/ga-stats.json` | No longer needed |
| `.github/workflows/update-analytics.yml` | Nightly cron removed |

---

## The Hook — `useVisitorCounter.ts`

```typescript
const COUNTER_KEY = 'portfolio:visitors'
const BASE_OFFSET = 2000

// On every page load:
GET /incr/portfolio:visitors
→ returns { result: 47 }
→ displays 47 + 2000 = 2047
```

- Uses plain `fetch()` — no SDK, no extra bundle size
- `cache: 'no-store'` ensures always the latest count
- Falls back to `2000` if Upstash is unreachable
- Cleanup via `cancelled` flag prevents state updates after unmount

---

## Environment Variables

| Variable | Where set |
|----------|-----------|
| `NEXT_PUBLIC_UPSTASH_REST_URL` | `.env.local` (local) + GitHub Secret (CI) |
| `NEXT_PUBLIC_UPSTASH_REST_TOKEN` | `.env.local` (local) + GitHub Secret (CI) |

`NEXT_PUBLIC_` prefix is required because this is a static export — values are
bundled into client-side JS at build time.

### GitHub Secrets required

Repo → **Settings → Secrets and variables → Actions**:

| Secret name | Value |
|---|---|
| `UPSTASH_REST_URL` | `https://smiling-glowworm-23379.upstash.io` |
| `UPSTASH_REST_TOKEN` | your token from Upstash dashboard |

---

## Security

The token is embedded in the static JS bundle (unavoidable with `output: export`).
Mitigation:

- **Use RBAC** (Upstash dashboard → RBAC tab): create a restricted token that
  can only `INCR` and `GET` the `portfolio:visitors` key — nothing else
- Even if extracted, the token can only increment one counter
- The GA `gtag.js` tag remains in `layout.tsx` for the full Analytics dashboard
  (separate from this counter)

---

## Where the Count is Displayed

`visitorCount` flows from `useVisitorCounter` → `useDynamicPortfolio` → props:

| Component | Location |
|-----------|---------|
| `Footer.tsx` | "Portfolio Views: X" — bottom bar |
| `CurrentActivity.tsx` | "Portfolio Views: X" — hero section badge |
| `PerformanceIndicator.tsx` | Visitors row in the performance panel |

---

## Compared to Previous Approach

| | Old (GA nightly) | New (Upstash) |
|--|--|--|
| Latency | Up to 24 hrs stale | Real-time (~100 ms) |
| Backend needed | GitHub Actions cron | None |
| Data source | Google Analytics API | Upstash Redis INCR |
| Accuracy | GA sampled user count | Exact page-load count |
| Complexity | Python script + workflow | Single 60-line hook |
| Cost | Free | Free (500k req/month) |
