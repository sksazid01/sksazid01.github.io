# Portfolio — sksazid.me

Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS, deployed on GitHub Pages.

🌐 **Live**: [sksazid.me](https://sksazid.me)

## Tech Stack

- **Next.js 15** (static export, Turbopack)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- **EmailJS** — contact form
- **Upstash Redis** — visitor counter (REST API)

## Project Structure

```
src/
├── app/            # Next.js app directory (layout, page, globals)
├── components/     # UI components
├── hooks/          # Custom React hooks
├── services/       # EmailJS service
└── utils/          # Competitive programming helpers
public/assets/      # Static images and certificates
docs/               # Build output (served by GitHub Pages)
markdowns/          # Developer notes and documentation
```

## Features

### Sections
- **Hero** — intro with real-time current activity status
- **About** — bio with GitHub stats widget
- **Professional Achievements** — categorized accomplishments
- **Projects** — GitHub-integrated project showcase
- **Skills** — animated proficiency visualization
- **Experience** — timeline
- **Contact** — form via EmailJS

### Competitive Programming Widgets
Live stats pulled from public APIs for LeetCode, Codeforces, CodeChef, and VJudge.

### Visitor Counter
Session-aware counter backed by Upstash Redis. Tracks unique IPs with geo, browser, and device metadata. See [markdowns/analytics/VISITOR_TRACKING_SYSTEM.md](markdowns/analytics/VISITOR_TRACKING_SYSTEM.md).

### UI / UX
- Light / Dark / System theme (persistent)
- Starry background + cursor trail
- Interactive terminal (`Ctrl+K`) with portfolio commands
- Advanced settings panel (animations, sound, reduced motion)
- Performance indicator overlay
- Responsive, mobile-first design

## Getting Started

```bash
git clone https://github.com/sksazid01/sksazid01.github.io.git
cd sksazid01.github.io
npm install
npm run dev        # http://localhost:3000
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_UPSTASH_REST_URL=<your-upstash-url>
NEXT_PUBLIC_UPSTASH_REST_TOKEN=<your-upstash-token>
NEXT_PUBLIC_EMAILJS_SERVICE_ID=<your-service-id>
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=<your-template-id>
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=<your-public-key>
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Static export to `docs/` |
| `npm run deploy` | Build + commit + push in one step |
| `npm run preview` | Serve `docs/` locally on port 3000 |
| `npm run lint` | ESLint |

## Deployment

GitHub Pages is configured to serve from the `docs/` folder on `main`.

```bash
npm run deploy
```

Builds the project, copies `CNAME`, touches `.nojekyll`, then commits and pushes automatically.

---

**Built by Md Ahasanul Haque Sazid**
