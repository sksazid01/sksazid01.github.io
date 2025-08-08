# Portfolio

This repository contains my personal portfolio built with Next.js, deployed on GitHub Pages.

## 🚀 Live Site
Visit: [https://sksazid.me](https://sksazid.me)

## Features
- ✨ Modern responsive design with Next.js 15 & TypeScript
- 🌙 Dark/Light mode toggle
- 🎨 Smooth animations with Framer Motion
- 🔗 Dynamic GitHub API integration
- 📊 Real-time coding statistics
- 📧 Contact form with Formspree integration
- 📱 Mobile-optimized interface
- 🌟 Interactive starry background

## Architecture

### Next.js Portfolio (`/nextjs-portfolio`)
The main portfolio application built with:
- **Next.js 15** - React framework with static export
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **GitHub API** - Live repository data integration
- **Formspree** - Contact form handling

### Static Build (`/`)
The compiled static files ready for deployment:
- `index.html` - Main portfolio page
- `/_next/` - Next.js static assets
- `favicon.ico` - Site icon
- `CNAME` - Custom domain configuration

## Development

```bash
cd nextjs-portfolio
npm install
npm run dev
```

## Deployment

The portfolio is automatically deployed to GitHub Pages using static export:

1. Build the project: `npm run build`
2. Copy files to root: `cp -r out/* ../`
3. Commit and push to main branch
4. GitHub Pages serves from root directory

## Custom Domain
Configured with `CNAME` file pointing to: **sksazid.me**
