# TinaCMS Setup Guide

TinaCMS has been successfully configured for your HKM Ministries website! Here's how to get started:

## 🚀 Quick Start

### Option 1: Local Development (Recommended for Testing)

1. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   This will start both Vite and TinaCMS. The TinaCMS admin will be available at:
   - Main site: `http://localhost:5173`
   - Admin panel: `http://localhost:5173/admin`

2. **Edit content locally:**
   - All content is stored in the `content/` directory as MDX files
   - You can edit these files directly or use the TinaCMS admin interface

### Option 2: Production Setup with TinaCloud

For production deployment with cloud-based content management:

1. **Create a TinaCMS Account**
   - Go to [https://app.tina.io](https://app.tina.io)
   - Sign up for a free account
   - Create a new project
   - Connect your GitHub repository

2. **Get Your Credentials**
   - In your TinaCMS dashboard, navigate to your project settings
   - Copy your `Client ID` and `Read-Only Token`
   - Update `.env.local` with your actual credentials:
     ```
     NEXT_PUBLIC_TINA_CLIENT_ID=your_actual_client_id
     TINA_TOKEN=your_actual_token
     ```

3. **Update the config:**
   - Open `tina/config.ts`
   - Remove the default values from clientId and token lines
   - Rebuild: `npm run tina:build`

4. **Deploy:**
   - Push your code to GitHub
   - Deploy to Vercel/Netlify
   - Set environment variables in your hosting platform

## 📁 Content Structure

Your content is organized in the `content/` directory:

```
content/
├── sermons/          # Sermon content (MDX files)
│   └── walking-in-divine-purpose.mdx
├── events/           # Event information (MDX files)
│   └── annual-youth-conference.mdx
├── blog/             # Blog posts (MDX files)
│   └── finding-peace-in-the-storm.mdx
├── staff/            # Staff member profiles (MDX files)
│   └── rev-john-doe.mdx
├── gallery/          # Gallery items (MDX files)
├── pages/            # Static pages (MDX files)
│   └── about.mdx
└── settings/         # Site configuration (JSON files)
    └── site.json
```

## 🎯 Content Types Available

### Sermons
Fields: Title, Speaker, Date, Series, Video URL, Thumbnail, Topics, Rich text content

### Events
Fields: Title, Date, Time, Location, Event image, Short and full descriptions

### Blog Posts
Fields: Title, Excerpt, Author, Date, Featured image, Category, Rich text content

### Staff Members
Fields: Name, Role, Photo, Short bio, Full biography

### Gallery
Fields: Title, Category, Image, Description

### Site Settings
Fields: Church information, Contact details, Social media links, Logo

## 🛠️ Development Commands

```bash
# Start development with TinaCMS (recommended)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Build TinaCMS schema only
npm run tina:build

# Start TinaCMS admin only
npm run tina:admin
```

## 📝 Editing Content

### Method 1: Via TinaCMS Admin (User-Friendly)
1. Run `npm run dev`
2. Navigate to `http://localhost:5173/admin`
3. Log in (local mode doesn't require authentication)
4. Select a collection (Sermons, Events, Blog, etc.)
5. Edit existing content or create new items
6. Save changes

### Method 2: Via Files (Developer-Friendly)
1. Navigate to the `content/` directory
2. Edit existing MDX files or create new ones
3. Follow the frontmatter structure shown in existing files
4. Save the file

Example sermon file structure:
```mdx
---
title: Your Sermon Title
speaker: Pastor Name
date: 2024-01-15T00:00:00.000Z
series: Series Name
videoUrl: https://youtube.com/...
thumbnail: /uploads/sermon-image.jpg
topics:
  - Faith
  - Prayer
---

## Your sermon content here

Write your sermon content using Markdown...
```

## 🔧 Customizing the Schema

The content schema is defined in `tina/config.ts`. You can:

- **Add new content types:** Add a new collection to the `collections` array
- **Modify fields:** Change field types, add validation, set defaults
- **Add custom UI:** Use custom components for specific fields
- **Change field order:** Reorder fields in the configuration

Example of adding a new field:
```typescript
{
  type: "string",
  name: "subtitle",
  label: "Subtitle",
  required: false,
}
```

## 🚀 Deployment Checklist

- [ ] Create TinaCloud account (if using cloud mode)
- [ ] Set up environment variables
- [ ] Build the project: `npm run build`
- [ ] Test the build locally: `npm run preview`
- [ ] Deploy to hosting provider (Vercel, Netlify, etc.)
- [ ] Verify admin access works in production
- [ ] Test content editing in production

## 📚 Using Content in Your Components

### Fetching Content

You have two options for fetching content:

#### Option 1: Using the TinaCMS Service (Recommended)
```typescript
import { tinaService } from '../services/tina';

// In your component
const sermons = await tinaService.getSermons();
const settings = await tinaService.getSiteSettings();
```

#### Option 2: Direct File Reading
For static sites, you can read MDX files directly using your build tool's import system.

### Example: Updating the Sermons Page

```typescript
import { useEffect, useState } from 'react';
import { tinaService } from '../services/tina';

function SermonsPage() {
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    tinaService.getSermons().then(setSermons);
  }, []);

  return (
    <div>
      {sermons.map(sermon => (
        <div key={sermon.id}>
          <h2>{sermon.title}</h2>
          <p>Speaker: {sermon.speaker}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🎨 Visual Editing

TinaCMS provides contextual editing capabilities. When properly configured, you can:
- Edit content directly on your live site
- See changes in real-time
- Provide a better experience for non-technical users

## 🔐 Authentication & Permissions

### Local Development
- No authentication required
- All content is editable

### Production (TinaCloud)
- Authentication via TinaCloud
- Role-based access control
- Invite team members with specific permissions

## 📞 Support & Resources

- [TinaCMS Documentation](https://tina.io/docs/)
- [TinaCMS Community Discord](https://discord.com/invite/zumN63Ybpf)
- [GitHub Issues](https://github.com/tinacms/tinacms/issues)
- [Video Tutorials](https://tina.io/docs/videos/)

## 🎉 Next Steps

1. ✅ TinaCMS is installed and configured
2. ✅ Sample content has been created
3. ✅ Content schema is defined
4. 🔲 Start the dev server: `npm run dev`
5. 🔲 Explore the admin interface at `/admin`
6. 🔲 Add your actual content
7. 🔲 Customize the schema as needed
8. 🔲 Integrate content fetching into your React components
9. 🔲 Set up TinaCloud account for production
10. 🔲 Deploy to production

## 💡 Tips & Best Practices

1. **Start Local:** Test everything locally before setting up TinaCloud
2. **Backup Content:** Keep your content in version control (Git)
3. **Use MDX:** MDX allows you to embed React components in your content
4. **Optimize Images:** Use appropriate image sizes and formats
5. **Test Thoroughly:** Always test content changes before deploying
6. **Document Custom Fields:** Add clear labels and descriptions to custom fields
7. **Use Collections Wisely:** Group related content types together

Your content management system is now ready to use! 🚀

## 🐛 Troubleshooting

### Issue: "Client not configured properly"
**Solution:** Make sure you're running in local mode or have set up TinaCloud credentials.

### Issue: Admin page not loading
**Solution:** Ensure `npm run dev` is running and check the console for errors.

### Issue: Content not showing up
**Solution:** Verify that MDX files are in the correct `content/` subdirectories and have proper frontmatter.

### Issue: Build fails
**Solution:** Check that all required fields in your content files are filled out correctly.