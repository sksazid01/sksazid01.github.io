# Visitor Counter — Bug Report & Fix Log

## Overview

The real-time visitor counter (backed by Upstash Redis) was over-counting on
every page load. This document records the two bugs discovered and the fixes
applied to `src/hooks/useVisitorCounter.ts`.

---

## Bug 1 — Multiple `INCR` calls per page load (over-count on every refresh)

### Symptom

- Normal refresh (`F5` / `Ctrl+R`) incremented the counter by **2 or more**
  instead of 0 (it should not increment at all on a refresh).
- Hard refresh (`Ctrl+Shift+R`) incremented by **4 or more**.

### Root Cause

`useDynamicPortfolio` (which internally calls `useVisitorCounter`) was imported
and mounted by **four separate components** on the same page:

| Component | Import |
|---|---|
| `Footer.tsx` | `useDynamicPortfolio()` |
| `PerformanceIndicator.tsx` | `useDynamicPortfolio()` |
| `About.tsx` | `useDynamicPortfolio()` |
| `Skills.tsx` | `useDynamicPortfolio()` |

Each component independently instantiated the hook, and each hook instance
independently called `upstashFetch(['incr', ...])` inside its `useEffect`.
With 4 components mounted, every page load fired **4 separate `INCR` commands**
to Upstash.

React's StrictMode (used in development) also double-invokes effects, which
multiplied the count even further during local development.

```
Before fix — one page load:
  Footer          → INCR → +1
  PerformanceIndicator → INCR → +1
  About           → INCR → +1
  Skills          → INCR → +1
  ─────────────────────────────
  Total per load  → +4
```

### Fix Applied

A **module-level singleton promise** was introduced. The first hook instance to
run creates the `fetch` promise; every subsequent instance (from other
components on the same page) awaits the **same already-in-flight promise**
rather than starting a new one.

```typescript
// Singleton — created once per page load, shared by all hook instances
let singletonPromise: Promise<number | null> | null = null

function getOrIncrCount(): Promise<number | null> {
  if (!singletonPromise) {
    singletonPromise = upstashFetch(['incr', COUNTER_KEY])
  }
  return singletonPromise
}
```

Result: `INCR` fires **exactly once** per page load, regardless of how many
components consume the hook.

---

## Bug 2 — `INCR` on every refresh (should only fire for new / hard-refresh visits)

### Symptom

Even after Bug 1 was fixed (counter incremented only once per load), a normal
refresh (`F5` / `Ctrl+R`) still incremented the counter by 1 each time.
The counter should only go up when:

1. A **brand-new visitor** opens the page, or
2. A visitor does a **hard refresh** (`Ctrl+Shift+R`) — which is semantically a
   "new load" and clears in-memory session state.

A normal refresh of an already-open tab should **not** count as a new visit.

### Root Cause

The hook had no mechanism to distinguish a normal refresh from a new visit. It
always called `INCR` unconditionally, so every reload — including `F5` — added
1 to the counter.

### Fix Applied

`sessionStorage` is used as a per-tab visit flag:

- **First load / hard refresh** → `sessionStorage` is empty (browsers clear it
  on hard refresh and on new tabs) → call `INCR`, then write
  `sessionStorage.setItem('visitor_counted', '1')`.
- **Normal refresh** → `sessionStorage` still contains the `'1'` flag →
  call `GET` (read-only) instead of `INCR` — counter unchanged.

```typescript
const SESSION_KEY = 'visitor_counted'

function resolveCount(): Promise<number | null> {
  if (!singletonPromise) {
    const alreadyCounted =
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem(SESSION_KEY) === '1'

    if (alreadyCounted) {
      // Normal refresh — read current value, do NOT increment
      singletonPromise = upstashFetch(['get', COUNTER_KEY])
    } else {
      // New visitor or hard refresh — increment and flag this session
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(SESSION_KEY, '1')
      }
      singletonPromise = upstashFetch(['incr', COUNTER_KEY])
    }
  }
  return singletonPromise
}
```

### Why `sessionStorage` and not `localStorage`?

| Storage | Lifetime | Behaviour on hard refresh |
|---|---|---|
| `sessionStorage` | Tab lifetime | **Cleared** — correct, hard refresh counts as new visit |
| `localStorage` | Persistent | Survives — would never count repeat visits |
| `cookie (session)` | Tab / expiry | Cleared on hard refresh, but adds complexity |

`sessionStorage` is the exact right primitive here: it persists through normal
refreshes but is wiped on hard refreshes and new tabs.

---

## Bug 3 — `GET` result parsed as `null` (count resets to BASE_OFFSET on normal refresh)

### Symptom

After both previous fixes were applied:

- A **new visitor** sees the correct count (e.g. 2040).
- A **normal refresh** (`F5` / `Ctrl+R`) reverts the displayed count back to
  **2000** — always exactly the `BASE_OFFSET`, never the real value.

### Root Cause

`upstashFetch` returned `null` whenever the command was `GET`. The guard was:

```typescript
return typeof data.result === 'number' ? data.result : null
```

The Upstash REST API returns different JavaScript types depending on the command:

| Command | `data.result` JS type | Example value |
|---|---|---|
| `INCR` | `number` | `40` |
| `GET` | `string` | `"40"` |

Because `typeof "40" === 'string'` (not `'number'`), the ternary always took
the `null` branch for `GET` responses. Back in the hook, when `raw === null`
the `setVisitorCount` call was skipped entirely, so the state remained at its
`useState` initial value — `BASE_OFFSET` (2000):

```typescript
if (raw !== null) {
  setVisitorCount(raw + BASE_OFFSET)   // never reached for GET
}
// → count stays at 2000
```

### Fix Applied

The type check in `upstashFetch` was broadened to handle both `number` and
`string` results:

```typescript
// Before
return typeof data.result === 'number' ? data.result : null

// After
if (typeof data.result === 'number') return data.result
if (typeof data.result === 'string') {
  const parsed = parseInt(data.result, 10)
  return isNaN(parsed) ? null : parsed
}
return null
```

`INCR` still returns a `number` and is handled by the first branch.  
`GET` now returns a `string`, is parsed with `parseInt`, and falls through to
the second branch — the correct count is returned instead of `null`.

---

## Final Behaviour After All Three Fixes

| User action | `INCR` or `GET`? | Counter change | Displayed correctly? |
|---|---|---|---|
| First-ever visit (new tab) | `INCR` | +1 | Yes |
| Hard refresh (`Ctrl+Shift+R`) | `INCR` | +1 | Yes |
| Normal refresh (`F5` / `Ctrl+R`) | `GET` | 0 | Yes (Bug 3 fixed) |
| Second component mounts on same page | awaits singleton | 0 extra requests | Yes |

---

## File Changed

| File | Change |
|---|---|
| `src/hooks/useVisitorCounter.ts` | All three fixes applied; junk text removed |

---

## Junk Text Removed

A previous conversation message was accidentally embedded as raw text inside
the source file between the `useState` declarations and the `useEffect` block.
This was removed as part of the same fix commit.
