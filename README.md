# Portfolio Website

A modern, feature-rich portfolio website built with Next.js, TypeScript, and Tailwind CSS. Deployed on GitHub Pages.

🌐 **Live Site**: [sksazid.me](https://sksazid.me)

## 🚀 New Features Added

### 1. **Advanced Theme System**
- **Light/Dark/System** theme modes
- Persistent theme preferences
- Smooth theme transitions
- Enhanced theme dropdown in header

### 2. **Interactive Skills Visualization**
- Animated progress bars with proficiency levels
- Hover effects and 3D transforms
- Real-time skill metrics
- Color-coded proficiency indicators

### 3. **Achievements & Milestones Section**
- Categorized achievements (Coding, Projects, Learning, Recognition)
- Interactive filters and animations
- Progress tracking for each achievement
- Dynamic statistics overview

### 4. **Advanced Settings Panel**
- Customizable user preferences
- Sound effects toggle
- Animation controls
- Reduced motion support
- Auto-save settings

### 5. **Interactive Terminal**
- Full-featured portfolio terminal
- Multiple commands (help, about, skills, projects, contact, etc.)
- Real-time command execution
- Retro terminal styling with animations

### 6. **Performance Monitoring**
- Real-time performance metrics
- Page load time tracking
- Network status monitoring
- Performance score display

### 7. **Enhanced Visual Effects**
- Cursor trail animation
- Improved starry background
- Smooth scroll indicators
- Advanced loading screen

### 8. **Better User Experience**
- Responsive design improvements
- Enhanced animations
- Better accessibility
- SEO optimizations

## 🛠️ Technologies Used

- **Next.js 15** - React framework with static export
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **EmailJS** - Contact form handling
- **GitHub Pages** - Hosting platform

## 📂 Project Structure

```
sksazid01.github.io/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── hooks/         # Custom hooks
│   ├── services/      # API services
│   └── utils/         # Utility functions
├── public/            # Static assets
│   ├── assets/        # Images and resources
│   └── workflow/      # Documentation files
├── docs/              # Build output (GitHub Pages serves from here)
├── next.config.ts     # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── package.json       # Dependencies and scripts
└── deploy.sh          # Deployment script
```

## 📱 Features Overview

### Core Sections
- **Hero Section** with real-time activity status
- **About Me** with GitHub stats integration
- **Skills** with interactive visualizations
- **Experience** timeline with detailed achievements
- **Projects** showcase with GitHub integration
- **Contact** form with dynamic validation

### Interactive Features
- **Theme System**: Light/Dark/System modes
- **Settings Panel**: Customize experience preferences
- **Terminal**: Interactive command-line interface
- **Performance Monitor**: Real-time metrics display
- **Cursor Effects**: Animated cursor trail
- **Sound Controls**: Audio feedback options

### Dynamic Content
- **GitHub Integration**: Real-time repository data
- **Visitor Counter**: Track portfolio views
- **Activity Status**: Current development status
- **Performance Metrics**: Load time and optimization scores

## 🎨 Design Features

### Visual Enhancements
- Smooth animations and transitions
- 3D hover effects and transforms
- Gradient backgrounds and glass morphism
- Responsive grid layouts
- Interactive progress indicators

### User Interface
- Clean, modern design
- Intuitive navigation
- Mobile-first responsive design
- Accessibility improvements
- Performance optimizations

## 🚀 Getting Started

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sksazid01/sksazid01.github.io.git
   cd sksazid01.github.io
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

### Deployment

The project uses a simplified deployment workflow:

**Option 1: Quick Deploy (Recommended)**
```bash
npm run deploy
```
This command builds the project, commits changes, and pushes to GitHub in one step.

**Option 2: Manual Deploy**
```bash
npm run build    # Builds to docs/ folder
git add .
git commit -m "Deploy: Update portfolio"
git push origin main
```

**Option 3: Deploy Script**
```bash
./deploy.sh
```

### GitHub Pages Setup

The site is configured to deploy from the `docs` folder:
1. Repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` → `/docs`

All build outputs are stored in the `docs` folder, which GitHub Pages serves automatically.

## 📊 Performance

- **Lighthouse Score**: 98/100
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Static Export**: Optimized for GitHub Pages

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build static export to `docs` folder
- `npm run deploy` - Build and deploy to GitHub (automated)
- `npm run start` - Start production server (for testing)
- `npm run lint` - Run ESLint

## 🎯 Interactive Elements

### Terminal Commands
- `help` - Show available commands
- `about` - Display personal information
- `skills` - List technical skills
- `projects` - Show recent projects
- `contact` - Get contact information
- `clear` - Clear terminal output
- `ls` - List directory contents
- `cat [file]` - Display file contents

### Settings Options
- Theme selection (Light/Dark/System)
- Sound effects toggle
- Animation preferences
- Reduced motion support
- Performance monitoring

### Keyboard Shortcuts
- `Ctrl + K` - Open terminal
- `Esc` - Close modals
- `Tab` - Navigate interactive elements

## 🔧 Customization

### Theme Customization
The theme system supports easy customization through CSS variables and the `ThemeProvider` component.

### Adding New Sections
New sections can be added by:
1. Creating a new component in `/src/components/`
2. Adding it to the main page layout in `/src/app/`
3. Including navigation links in the header

### Performance Optimization
- Static export for fast loading
- Lazy loading for images and components
- Code splitting and tree shaking
- Optimized bundle size
- Efficient re-rendering

### Deployment Configuration

The project uses Next.js static export configured in `next.config.ts`:
- `output: 'export'` - Generates static HTML/CSS/JS
- `distDir: 'docs'` - Build output directory for GitHub Pages
- `trailingSlash: true` - Ensures proper routing
- `images.unoptimized: true` - Compatible with static hosting

## 📈 Analytics & Monitoring

- Real-time performance metrics
- User interaction tracking
- Error boundary monitoring
- Page load optimization

## 🌟 Highlights

### Technical Excellence
- TypeScript for type safety
- Modern React patterns
- Optimized performance
- Responsive design
- Accessibility compliance

### User Experience
- Smooth animations
- Interactive elements
- Fast loading times
- Mobile optimization
- Intuitive navigation

### Developer Experience
- Clean code structure
- Modular components
- Easy customization
- Comprehensive documentation
- Performance monitoring

---

**Built with ❤️ by Ahasanul Haque Sazid**

*A showcase of modern web development techniques and user experience design.*
