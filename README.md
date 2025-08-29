# Portfolio

This repository contains my personal portfolio built with Next.js, deployed on GitHub Pages.

## 🚀 Live Site
Visit: [https://sksazid.me](https://sksazid.me)

## Features
- ✨ Modern responsive design with Next.js 15 & TypeScript
- 🌙 Dark/Light mode toggle with system preference detection
- 🎨 Smooth animations with Framer Motion
- 🔗 Dynamic GitHub API integration
- 📊 Real-time coding statistics with static data fallback
- 📧 Contact form with EmailJS integration
- 📱 Mobile-optimized interface
- 🌟 Interactive starry background and cursor effects
- 🖥️ Interactive terminal with portfolio commands
- ⚙️ Advanced settings panel with user preferences
- 📈 Performance monitoring with real-time metrics
- 🏆 Achievements & milestones section with filtering

## Architecture

### Main Portfolio (`/Main Portfolio`)
The main portfolio application built with:
- **Next.js 15** - React framework with static export
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **EmailJS** - Contact form handling with Gmail SMTP
- **Static Data Integration** - Competitive programming stats (optimized for static export)

### Static Build (`/`)
The compiled static files ready for deployment:
- `index.html` - Main portfolio page
- `/_next/` - Next.js static assets
- `favicon.ico` - Site icon
- `CNAME` - Custom domain configuration

## Development

```bash
cd "Main Portfolio"
npm install
npm run dev
```

## Recent Updates
- ✅ Fixed build issues with API routes by converting to static data
- ✅ Implemented static export compatibility for GitHub Pages
- ✅ Added enhanced theme system with system preference detection
- ✅ Integrated interactive terminal with portfolio commands
- ✅ Added performance monitoring and real-time metrics
- ✅ Enhanced visual effects and user experience

## Deployment

The portfolio is automatically deployed to GitHub Pages using static export:

1. Build the project: `npm run build`
2. Export static files: `npm run export`
3. Copy files to root: `cp -r out/* ../`
4. Commit and push to main branch
5. GitHub Pages serves from root directory

## Custom Domain
Configured with `CNAME` file pointing to: **sksazid.me**
