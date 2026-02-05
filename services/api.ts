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
        const sermons = response.data.sermonsConnection.edges?.map((edge: any) => ({
          id: edge?.node?.id || '',
          title: edge?.node?.title || '',
          speaker: edge?.node?.speaker || '',
          date: edge?.node?.date || '',
          series: edge?.node?.series || '',
          videoUrl: edge?.node?.videoUrl || '',
          thumbnail: edge?.node?.thumbnail || 'https://picsum.photos/seed/sermon_fallback/800/450',
          topics: edge?.node?.topics || []
        })) || [];
        
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
  getGallery: async (): Promise<GalleryItem[]> => {
    await delay(600);
    return GALLERY_IMAGES;
  }
};