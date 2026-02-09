#!/usr/bin/env node
/**
 * Generate static JSON files from TinaCMS content
 * This allows the production build to work without the TinaCMS GraphQL server
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content');
const publicDir = path.join(__dirname, '../public');
const outputDir = path.join(publicDir, 'api');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to parse frontmatter from MDX files
function parseMDX(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return {};
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  let currentKey = null;
  let currentValue = [];
  
  lines.forEach(line => {
    if (line.includes(':')) {
      if (currentKey) {
        frontmatter[currentKey] = currentValue.length > 1 ? currentValue : currentValue[0];
      }
      const [key, ...valueParts] = line.split(':');
      currentKey = key.trim();
      const value = valueParts.join(':').trim();
      currentValue = value ? [value] : [];
    } else if (line.trim().startsWith('-')) {
      currentValue.push(line.trim().substring(1).trim());
    }
  });
  
  if (currentKey) {
    frontmatter[currentKey] = currentValue.length > 1 ? currentValue : currentValue[0];
  }
  
  return frontmatter;
}

// Process sermons
const sermonsDir = path.join(contentDir, 'sermons');
const sermons = [];

if (fs.existsSync(sermonsDir)) {
  const files = fs.readdirSync(sermonsDir).filter(f => f.endsWith('.mdx'));
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(sermonsDir, file), 'utf-8');
    const data = parseMDX(content);
    const id = file.replace('.mdx', '');
    
    sermons.push({
      id,
      title: data.title || '',
      speaker: data.speaker || '',
      date: data.date || '',
      series: data.series || '',
      videoUrl: data.videoUrl || '',
      thumbnail: data.thumbnail || '',
      topics: Array.isArray(data.topics) ? data.topics : (data.topics ? [data.topics] : [])
    });
  });
}

fs.writeFileSync(path.join(outputDir, 'sermons.json'), JSON.stringify(sermons, null, 2));
console.log(`✅ Generated ${sermons.length} sermons`);

// Process events
const eventsDir = path.join(contentDir, 'events');
const events = [];

if (fs.existsSync(eventsDir)) {
  const files = fs.readdirSync(eventsDir).filter(f => f.endsWith('.mdx'));
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(eventsDir, file), 'utf-8');
    const data = parseMDX(content);
    const id = file.replace('.mdx', '');
    
    events.push({
      id,
      title: data.title || '',
      date: data.date || '',
      time: data.time || '',
      location: data.location || '',
      description: data.description || '',
      image: data.image || ''
    });
  });
}

fs.writeFileSync(path.join(outputDir, 'events.json'), JSON.stringify(events, null, 2));
console.log(`✅ Generated ${events.length} events`);

// Process blog posts
const blogDir = path.join(contentDir, 'blog');
const blog = [];

if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const data = parseMDX(content);
    const id = file.replace('.mdx', '');
    
    blog.push({
      id,
      title: data.title || '',
      excerpt: data.excerpt || '',
      author: data.author || '',
      date: data.date || '',
      category: data.category || '',
      image: data.image || ''
    });
  });
}

fs.writeFileSync(path.join(outputDir, 'blog.json'), JSON.stringify(blog, null, 2));
console.log(`✅ Generated ${blog.length} blog posts`);

// Process staff
const staffDir = path.join(contentDir, 'staff');
const staff = [];

if (fs.existsSync(staffDir)) {
  const files = fs.readdirSync(staffDir).filter(f => f.endsWith('.mdx'));
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(staffDir, file), 'utf-8');
    const data = parseMDX(content);
    const id = file.replace('.mdx', '');
    
    staff.push({
      id,
      name: data.name || '',
      role: data.role || '',
      image: data.image || '',
      bio: data.bio || ''
    });
  });
}

fs.writeFileSync(path.join(outputDir, 'staff.json'), JSON.stringify(staff, null, 2));
console.log(`✅ Generated ${staff.length} staff members`);

// Process gallery
const galleryDir = path.join(contentDir, 'gallery');
const gallery = [];

function processGalleryDir(dir) {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processGalleryDir(fullPath);
    } else if (item.endsWith('.mdx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const data = parseMDX(content);
      const id = item.replace('.mdx', '');
      
      gallery.push({
        id,
        title: data.title || '',
        category: data.category || '',
        imageUrl: data.imageUrl || ''
      });
    }
  });
}

if (fs.existsSync(galleryDir)) {
  processGalleryDir(galleryDir);
}

fs.writeFileSync(path.join(outputDir, 'gallery.json'), JSON.stringify(gallery, null, 2));
console.log(`✅ Generated ${gallery.length} gallery items`);

console.log('\n🎉 All content JSON files generated successfully!');
