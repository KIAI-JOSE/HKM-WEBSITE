export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  videoUrl?: string;
  thumbnail: string;
  topics: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export enum MinistryType {
  YOUTH = 'Youth',
  KIDS = 'Kids',
  MEN = 'Men',
  WOMEN = 'Women',
  OUTREACH = 'Outreach',
  WORSHIP = 'Worship'
}