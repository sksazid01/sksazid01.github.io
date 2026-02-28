# LeetCode Real-Time Stats — How It Works

## Overview

The portfolio uses **two independent layers** to surface LeetCode data in real time.
Neither layer requires a self-hosted backend or a Next.js API route — both work
with the static export (`output: 'export'`) used to deploy to GitHub Pages.

---

## Layer 1 — The Visual Card (`LeetCodeWidget.tsx`)

### Service: `leetcard.jacoblin.cool`

The widget is a clickable `<img>` pointing to:

```
https://leetcard.jacoblin.cool/sksazid?theme=dark&font=ZCOOL%20XiaoWei&border=0&radius=8&ext=heatmap
```

**What happens when a visitor loads the page:**

```
Browser
  │
  └──► GET https://leetcard.jacoblin.cool/sksazid?...
            │
            └──► leetcard server (Cloudflare Worker)
                      │
                      └──► POST https://leetcode.com/graphql
                                (LeetCode's own public GraphQL API)
                                │
                                └──► Returns: totalSolved, easySolved,
                                             mediumSolved, hardSolved,
                                             ranking, submission heatmap
                      │
                      └──► Renders data → returns SVG image
            │
  Browser displays the SVG as a normal <img>
```

The SVG is generated fresh on the leetcard server and returned directly to the
browser. No data ever passes through this portfolio's code.

### Theme Awareness

`LeetCodeWidget.tsx` reads the portfolio's active theme via `useTheme()` and
sets the `?theme=` query parameter accordingly:

```tsx
// Resolves 'system' → checks prefers-color-scheme
const mq = window.matchMedia('(prefers-color-scheme: dark)')
setCardTheme(mq.matches ? 'dark' : 'light')
```

When the user toggles the theme, `cardTheme` state changes → a new URL is
built → the browser fetches a freshly themed SVG.

### Caching

`leetcard.jacoblin.cool` caches the LeetCode GraphQL response for **60 seconds**
by default (Cloudflare edge cache). This means:

- The card is never more than 60 seconds stale.
- Repeated page loads within 60 s return the cached SVG instantly — no extra
  load on LeetCode's API.
- You can force an uncached fetch by appending `&cache=0` (useful during
  development, not recommended in production).

### Extension: Heatmap

The `ext=heatmap` parameter activates the heatmap extension on the leetcard
server, which fetches the **past 52 weeks of submission history** from LeetCode
GraphQL and renders it as a heat-colored calendar grid inside the SVG card.

Other available extensions (swap the `ext` prop):

| Value      | Shows |
|------------|-------|
| `heatmap`  | 52-week submission heatmap (default) |
| `activity` | Recent submissions list |
| `contest`  | Contest rating graph |

---

## Layer 2 — Numeric Stats (`fetchLeetCodeStats` in `competitiveProgramming.ts`)

### Service: `alfa-leetcode-api` (open-source proxy)

Used by `useCompetitiveProgramming.ts` to provide numeric LeetCode values to
other parts of the site (e.g. overall stats counters).

```
Browser
  │
  └──► GET https://alfa-leetcode-api.onrender.com/sksazid
            │
            └──► alfa-leetcode-api server (Node.js on Render free tier)
                      │
                      └──► POST https://leetcode.com/graphql
                                (same public GraphQL endpoint)
                      │
                      └──► Returns JSON:
                           {
                             totalSolved, easySolved, mediumSolved, hardSolved,
                             totalEasy, totalMedium, totalHard, ranking
                           }
```

### Timeout + Fallback

The fetch has an 8-second `AbortController` timeout. If the Render instance is
cold (free tier sleeps after inactivity) or the request fails for any reason,
the function silently returns hardcoded fallback values:

```typescript
const fallback = {
  sksazid: { totalSolved: 155, easySolved: 82, ... }
}
```

These fallback values should be kept roughly up to date manually so the rest
of the site never shows wildly wrong numbers.

> **Note:** The free Render tier can take ~5–10 s to wake up after inactivity.
> With the 8 s timeout the first cold call may return the fallback; subsequent
> calls within the same session hit the warm instance and resolve quickly.

---

## Why Two Layers?

| | Layer 1 (Card) | Layer 2 (Numeric) |
|---|---|---|
| **Output** | Full visual card SVG with heatmap | Raw JSON numbers |
| **Used by** | `LeetCodeWidget.tsx` | `useCompetitiveProgramming.ts` |
| **Update frequency** | Every 60 s (CDN cache) | On component mount |
| **Fallback** | Broken image → text placeholder | Hardcoded values |
| **Works offline / API down** | Shows fallback text | Shows hardcoded values |

---

## Relevant Files

| File | Role |
|------|------|
| `src/components/LeetCodeWidget.tsx` | Renders the SVG card; manages theme switching |
| `src/utils/competitiveProgramming.ts` | `fetchLeetCodeStats()` — Layer 2 numeric fetch |
| `src/hooks/useCompetitiveProgramming.ts` | Calls `fetchLeetCodeStats` and exposes data to components |

---

## Customising the Card

All options are passed as props to `<LeetCodeWidget />`:

```tsx
<LeetCodeWidget
  handle="sksazid"
  font="ZCOOL%20XiaoWei"   // any Google Font name, URL-encoded
  ext="heatmap"             // 'heatmap' | 'activity' | 'contest' | ''
/>
```

The `theme` prop is intentionally absent — it is derived automatically from the
portfolio's `ThemeProvider` so the card always matches the site theme.
