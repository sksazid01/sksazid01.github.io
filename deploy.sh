#!/bin/bash

# Portfolio Deployment Script
# This script builds the Next.js portfolio and copies it to the root for GitHub Pages

echo "🚀 Starting portfolio deployment..."

# Navigate to the Next.js project
cd nextjs-portfolio

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building Next.js portfolio..."
npm run build

echo "📁 Copying static files to root..."
cp -r out/* ../

echo "🧹 Cleaning up build directory..."
rm -rf out

cd ..

echo "✅ Deployment ready!"
echo "💡 Next steps:"
echo "   1. git add ."
echo "   2. git commit -m 'Deploy portfolio update'"
echo "   3. git push origin main"
echo ""
echo "🌐 Your portfolio will be live at: https://sksazid.me"
