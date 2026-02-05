import { FEATURED_SERMONS, UPCOMING_EVENTS, BLOG_POSTS, GALLERY_IMAGES } from '../constants';
import { Sermon, Event, BlogPost, GalleryItem } from '../types';
import { client } from '../tina/__generated__/client';

// Helper to simulate network latency (for mock mode)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 🟢 TOGGLE THIS TO TRUE TO USE TINA CMS
const ENABLE_TINA = true;

export const api = {
  // ---------------------------------------------------------------------------
  // SERMONS
  // ---------------------------------------------------------------------------
  getSermons: async (): Promise<Sermon[]> => {
    if (ENABLE_TINA) {
      try {
        const response = await client.queries.sermonsConnection();
        const sermons = response.data.sermonsConnection.edges?.map((edge: any) => {
          // Extract filename from the full path for cleaner IDs
          const filename = edge?.node?.id?.split('/').pop()?.replace('.mdx', '') || edge?.node?.id || '';
          
          return {
            id: filename,
            title: edge?.node?.title || '',
            speaker: edge?.node?.speaker || '',
            date: edge?.node?.date || '',
            series: edge?.node?.series || '',
            videoUrl: edge?.node?.videoUrl || '',
            thumbnail: edge?.node?.thumbnail || 'https://picsum.photos/seed/sermon_fallback/800/450',
            topics: edge?.node?.topics || []
          };
        }) || [];
        
        console.log('TinaCMS Sermons loaded:', sermons);
        return sermons;
      } catch (error) {
        console.warn("CMS Load Failed (Sermons). Using fallback data.", error);
      }
    }
    
    // MOCK DATA FALLBACK
    await delay(800);
    return [
        ...FEATURED_SERMONS,
        { ...FEATURED_SERMONS[0], id: '4', title: 'Walking in Faith', date: '2023-09-24', topics: ['Faith', 'Discipleship'] },
        { ...FEATURED_SERMONS[1], id: '5', title: 'The Heart of Worship', date: '2023-09-17', topics: ['Worship'] },
    ];
  },

  // Get single sermon by ID
  getSermon: async (id: string): Promise<Sermon | null> => {
    if (ENABLE_TINA) {
      try {
        const response = await client.queries.sermons({ relativePath: `${id}.mdx` });
        const sermon = response.data.sermons;
        
        if (sermon) {
          return {
            id: id,
            title: sermon.title || '',
            speaker: sermon.speaker || '',
            date: sermon.date || '',
            series: sermon.series || '',
            videoUrl: sermon.videoUrl || '',
            thumbnail: sermon.thumbnail || 'https://picsum.photos/seed/sermon_fallback/800/450',
            topics: sermon.topics || []
          };
        }
      } catch (error) {
        console.warn("CMS Load Failed (Single Sermon). Using fallback data.", error);
      }
    }
    
    // FALLBACK: Get from the list
    const sermons = await api.getSermons();
    return sermons.find(s => s.id === id) || null;
  },

  // ---------------------------------------------------------------------------
  // STAFF
  // ---------------------------------------------------------------------------
  getStaff: async () => {
    if (ENABLE_TINA) {
      try {
        const response = await client.queries.staffConnection();
        const staff = response.data.staffConnection.edges?.map((edge: any) => {
          const filename = edge?.node?.id?.split('/').pop()?.replace('.mdx', '') || edge?.node?.id || '';
          
          return {
            id: filename,
            name: edge?.node?.name || '',
            role: edge?.node?.role || '',
            image: edge?.node?.image || 'https://picsum.photos/seed/staff_fallback/400/400',
            bio: edge?.node?.bio || ''
          };
        }) || [];
        
        console.log('TinaCMS Staff loaded:', staff);
        return staff;
      } catch (error) {
        console.warn("CMS Load Failed (Staff). Using fallback data.", error);
      }
    }
    
    // FALLBACK
    await delay(600);
    return [
      {
        id: 's1',
        name: 'Rev. Dr. John Doe',
        role: 'Senior Pastor',
        bio: 'Rev. Doe has served HKM Ministries for over 20 years with a passion for teaching.',
        image: 'https://picsum.photos/seed/pastor1/400/400'
      },
      {
        id: 's2',
        name: 'Pastor Jane Smith',
        role: 'Executive Pastor',
        bio: 'Pastor Jane oversees the day-to-day operations and women\'s ministry.',
        image: 'https://picsum.photos/seed/pastor2/400/400'
      }
    ];
  },

  // ---------------------------------------------------------------------------
  // EVENTS
  // ---------------------------------------------------------------------------
  getEvents: async (): Promise<Event[]> => {
    if (ENABLE_TINA) {
      try {
        const response = await client.queries.eventsConnection();
        const events = response.data.eventsConnection.edges?.map((edge: any) => ({
          id: edge?.node?.id || '',
          title: edge?.node?.title || '',
          date: new Date(edge?.node?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: edge?.node?.time || '',
          location: edge?.node?.location || '',
          description: edge?.node?.description || '',
          image: edge?.node?.image || 'https://picsum.photos/seed/event_fallback/800/600'
        })) || [];
        
        console.log('TinaCMS Events loaded:', events);
        return events;
      } catch (error) {
        console.warn("CMS Load Failed (Events). Using fallback data.", error);
      }
    }

    await delay(600);
    return UPCOMING_EVENTS;
  },

  // ---------------------------------------------------------------------------
  // BLOG POSTS
  // ---------------------------------------------------------------------------
  getBlogPosts: async (): Promise<BlogPost[]> => {
    if (ENABLE_TINA) {
      try {
        const response = await client.queries.blogConnection();
        const posts = response.data.blogConnection.edges?.map((edge: any) => ({
          id: edge?.node?.id || '',
          title: edge?.node?.title || '',
          excerpt: edge?.node?.excerpt || '',
          content: 'Read more...', // Fetch full content in a detail view
          author: edge?.node?.author || '',
          date: new Date(edge?.node?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          category: edge?.node?.category || '',
          image: edge?.node?.image || 'https://picsum.photos/seed/blog_fallback/800/600'
        })) || [];
        
        console.log('TinaCMS Blog Posts loaded:', posts);
        return posts;
      } catch (error) {
         console.warn("CMS Load Failed (Blog). Using fallback data.", error);
      }
    }

    await delay(600);
    return BLOG_POSTS;
  },
  
  // ---------------------------------------------------------------------------
  // GALLERY
  // ---------------------------------------------------------------------------
  getGallery: async () => {
    if (ENABLE_TINA) {
      try {
        const response = await client.queries.galleryConnection();
        const gallery = response.data.galleryConnection.edges?.map((edge: any) => {
          const filename = edge?.node?.id?.split('/').pop()?.replace('.mdx', '') || edge?.node?.id || '';
          
          return {
            id: filename,
            title: edge?.node?.title || '',
            category: edge?.node?.category || '',
            imageUrl: edge?.node?.imageUrl || 'https://picsum.photos/seed/gallery_fallback/600/600'
          };
        }) || [];
        
        console.log('TinaCMS Gallery loaded:', gallery);
        return gallery;
      } catch (error) {
        console.warn("CMS Load Failed (Gallery). Using fallback data.", error);
      }
    }
    
    await delay(600);
    return [
      { id: 'g1', title: 'Worship Night', category: 'Events', imageUrl: 'https://picsum.photos/seed/g1/600/600' },
      { id: 'g2', title: 'Community Picnic', category: 'Outreach', imageUrl: 'https://picsum.photos/seed/g2/600/600' },
      { id: 'g3', title: 'Baptism Sunday', category: 'Service', imageUrl: 'https://picsum.photos/seed/g3/600/600' },
      { id: 'g4', title: 'Youth Retreat', category: 'Youth', imageUrl: 'https://picsum.photos/seed/g4/600/600' },
      { id: 'g5', title: 'Christmas Production', category: 'Events', imageUrl: 'https://picsum.photos/seed/g5/600/600' },
      { id: 'g6', title: 'Food Drive', category: 'Outreach', imageUrl: 'https://picsum.photos/seed/g6/600/600' },
    ];
  }
};