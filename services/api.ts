import { FEATURED_SERMONS, UPCOMING_EVENTS, BLOG_POSTS, GALLERY_IMAGES } from '../constants';
import { Sermon, Event, BlogPost, GalleryItem } from '../types';

// ==============================================================================
// 🟢 TINA CMS CONFIGURATION
// 1. Create account at app.tina.io
// 2. Create a project and link your GitHub repository.
// 3. Get your Client ID and Read-Only Token from the project settings.
// ==============================================================================

const TINA_CONFIG = {
  CLIENT_ID: 'bc437c5c-80db-4ebb-abcf-1300be1b4bfc',
  TOKEN: '2bbb24d795baeaa734b7b768a383af9bf716b618',
  BRANCH: 'kiro',   // Using the kiro branch
};

// 🟢 TOGGLE THIS TO TRUE TO USE TINA CMS
const ENABLE_TINA = true; 

// ==============================================================================

// Helper to simulate network latency (for mock mode)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to fetch from Tina Cloud GraphQL
async function fetchTina(query: string, variables = {}) {
  if (!TINA_CONFIG.CLIENT_ID || !TINA_CONFIG.TOKEN) {
    throw new Error("TinaCMS Configuration missing");
  }

  const endpoint = `https://content.tinajs.io/1.4/content/${TINA_CONFIG.CLIENT_ID}/github/${TINA_CONFIG.BRANCH}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': TINA_CONFIG.TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

export const api = {
  // ---------------------------------------------------------------------------
  // SERMONS
  // Assumes a 'sermon' collection in tina/config.ts
  // ---------------------------------------------------------------------------
  getSermons: async (): Promise<Sermon[]> => {
    if (ENABLE_TINA) {
      const query = `
        query {
          sermonsConnection(sort: "date", last: 10) {
            edges {
              node {
                id
                title
                speaker
                date
                series
                thumbnail
                topics
                videoUrl
              }
            }
          }
        }
      `;
      try {
        const data = await fetchTina(query);
        return data.sermonsConnection.edges.map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.title,
          speaker: edge.node.speaker,
          date: edge.node.date,
          series: edge.node.series,
          videoUrl: edge.node.videoUrl,
          thumbnail: edge.node.thumbnail || 'https://picsum.photos/seed/sermon_fallback/800/450',
          topics: edge.node.topics || []
        }));
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
  // Assumes an 'event' collection in tina/config.ts
  // ---------------------------------------------------------------------------
  getEvents: async (): Promise<Event[]> => {
    if (ENABLE_TINA) {
      const query = `
        query {
          eventsConnection(sort: "date", first: 10) {
            edges {
              node {
                id
                title
                date
                time
                location
                description
                image
              }
            }
          }
        }
      `;
      try {
        const data = await fetchTina(query);
        return data.eventsConnection.edges.map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.title,
          date: new Date(edge.node.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: edge.node.time,
          location: edge.node.location,
          description: edge.node.description,
          image: edge.node.image || 'https://picsum.photos/seed/event_fallback/800/600'
        }));
      } catch (error) {
        console.warn("CMS Load Failed (Events). Using fallback data.", error);
      }
    }

    await delay(600);
    return UPCOMING_EVENTS;
  },

  // ---------------------------------------------------------------------------
  // BLOG POSTS
  // Assumes a 'post' collection in tina/config.ts
  // ---------------------------------------------------------------------------
  getBlogPosts: async (): Promise<BlogPost[]> => {
    if (ENABLE_TINA) {
      const query = `
        query {
          blogConnection(sort: "date", last: 10) {
            edges {
              node {
                id
                title
                excerpt
                author
                date
                category
                image
              }
            }
          }
        }
      `;
      try {
        const data = await fetchTina(query);
        return data.blogConnection.edges.map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.title,
          excerpt: edge.node.excerpt,
          content: 'Read more...', // Fetch full content in a detail view
          author: edge.node.author,
          date: new Date(edge.node.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          category: edge.node.category,
          image: edge.node.image || 'https://picsum.photos/seed/blog_fallback/800/600'
        }));
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