#!/bin/bash

# Simplified Portfolio Deployment Script
# Builds and deploys in one command

echo "🚀 Starting portfolio deployment..."

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building Next.js portfolio..."
npm run build

echo "✅ Build complete! Static files are in the 'docs' folder."
echo ""
echo "📤 Committing and pushing to GitHub..."
git add .
git commit -m "Deploy: Portfolio update $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

echo ""
echo "✨ Deployment complete!"
echo "🌐 Your portfolio will be live at: https://sksazid.me"
