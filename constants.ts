import { BlogPost, Event, GalleryItem, Sermon, StaffMember } from './types';

export const CHURCH_NAME = "HKM Ministries International";
export const CHURCH_ADDRESS = "PXH3+P46, Utawala, Mihango near Twinkids Academy, Nairobi, Kenya. P.O. Box 46376-00100";
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/X2G4cP3gouoW9XML6";
export const CHURCH_PHONE = "+254 726 91 25 77 / +254 721 287 053";
export const CHURCH_EMAIL = "info@hkmministries.org";
export const LOGO_URL = "https://i.ibb.co/5xzH9bWR/HKM-LOGO.png";

export const SOCIAL_LINKS = {
  FACEBOOK: 'https://www.facebook.com/people/Heavenly-Gods-Kingdom-MinistryUtawala-Mihango/100081198913245/',
  YOUTUBE: 'https://www.youtube.com/@HKMINISTRRY/featured',
  INSTAGRAM: '#'
};

export const FEATURED_SERMONS: Sermon[] = [
  {
    id: '1',
    title: 'Walking in Divine Purpose',
    speaker: 'Rev. Dr. John Doe',
    date: '2023-10-15',
    series: 'Kingdom Purpose',
    thumbnail: 'https://picsum.photos/seed/sermon1/800/450',
    topics: ['Purpose', 'Faith', 'Calling']
  },
  {
    id: '2',
    title: 'The Power of Prayer',
    speaker: 'Pastor Jane Smith',
    date: '2023-10-08',
    series: 'Foundations',
    thumbnail: 'https://picsum.photos/seed/sermon2/800/450',
    topics: ['Prayer', 'Spiritual Growth']
  },
  {
    id: '3',
    title: 'Grace Abounds',
    speaker: 'Rev. Dr. John Doe',
    date: '2023-10-01',
    series: 'Grace',
    thumbnail: 'https://picsum.photos/seed/sermon3/800/450',
    topics: ['Grace', 'Salvation']
  }
];

export const UPCOMING_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Sunday Worship Service',
    date: 'Every Sunday',
    time: '9:00 AM & 11:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for a powerful time of worship and the word.',
    image: 'https://picsum.photos/seed/worship/800/600'
  },
  {
    id: 'e2',
    title: 'Annual Youth Conference',
    date: 'Nov 15-17, 2023',
    time: '6:00 PM',
    location: 'HKM Conference Center',
    description: 'A 3-day event empowering the next generation.',
    image: 'https://picsum.photos/seed/youth/800/600'
  },
  {
    id: 'e3',
    title: 'Community Outreach',
    date: 'Dec 02, 2023',
    time: '10:00 AM',
    location: 'City Square',
    description: 'Serving our neighbors with food, clothing, and love.',
    image: 'https://picsum.photos/seed/outreach/800/600'
  }
];

export const STAFF: StaffMember[] = [
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
    bio: 'Pastor Jane oversees the day-to-day operations and women’s ministry.',
    image: 'https://picsum.photos/seed/pastor2/400/400'
  },
  {
    id: 's3',
    name: 'Min. Michael Brown',
    role: 'Worship Leader',
    bio: 'Leading the congregation in spirit-filled worship every week.',
    image: 'https://picsum.photos/seed/worshipleader/400/400'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Finding Peace in the Storm',
    excerpt: 'In turbulent times, we can find a peace that surpasses all understanding. Discover how to anchor your soul.',
    content: 'Full content here...',
    author: 'Rev. Dr. John Doe',
    date: 'Oct 20, 2023',
    image: 'https://picsum.photos/seed/peace/800/600',
    category: 'Devotional'
  },
  {
    id: 'b2',
    title: 'The Importance of Community',
    excerpt: 'We were not created to walk this journey alone. Learn why connecting with a local body of believers is vital.',
    content: 'Full content here...',
    author: 'Pastor Jane Smith',
    date: 'Oct 12, 2023',
    image: 'https://picsum.photos/seed/community/800/600',
    category: 'Community'
  },
  {
    id: 'b3',
    title: '5 Ways to Deepen Your Prayer Life',
    excerpt: 'Practical steps to move from routine prayers to a vibrant, conversational relationship with God.',
    content: 'Full content here...',
    author: 'Min. Michael Brown',
    date: 'Oct 05, 2023',
    image: 'https://picsum.photos/seed/prayer/800/600',
    category: 'Spiritual Growth'
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { id: 'g1', title: 'Worship Night', category: 'Events', imageUrl: 'https://picsum.photos/seed/g1/600/600' },
  { id: 'g2', title: 'Community Picnic', category: 'Outreach', imageUrl: 'https://picsum.photos/seed/g2/600/600' },
  { id: 'g3', title: 'Baptism Sunday', category: 'Service', imageUrl: 'https://picsum.photos/seed/g3/600/600' },
  { id: 'g4', title: 'Youth Retreat', category: 'Youth', imageUrl: 'https://picsum.photos/seed/g4/600/600' },
  { id: 'g5', title: 'Christmas Production', category: 'Events', imageUrl: 'https://picsum.photos/seed/g5/600/600' },
  { id: 'g6', title: 'Food Drive', category: 'Outreach', imageUrl: 'https://picsum.photos/seed/g6/600/600' },
];