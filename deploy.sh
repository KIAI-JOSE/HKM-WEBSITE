#!/bin/bash

# HKM Website Auto-Deploy Script
# This script pulls latest changes and rebuilds the site

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /var/www/HKM-WEBSITE

# Stash any local changes
echo "📦 Stashing local changes..."
git stash

# Pull latest changes from GitHub
echo "⬇️  Pulling latest changes from GitHub..."
git pull origin main-hkm

# Install dependencies if package.json changed
echo "📚 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building production bundle..."
sudo rm -rf /var/www/HKM-WEBSITE/dist
npm run build

# Add cache-busting timestamp to index.html
echo "⏰ Adding cache-busting timestamp..."
TIMESTAMP=$(date +%s)
sudo sed -i "s|</title>|</title><meta name=\"build-version\" content=\"$TIMESTAMP\">|" /var/www/HKM-WEBSITE/dist/index.html

# Fix permissions
echo "🔐 Fixing permissions..."
sudo chown -R www-data:www-data /var/www/HKM-WEBSITE/dist

# Reload Nginx to clear cache
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ Deployment complete!"
echo "🌐 Your site is now live with the latest changes."
