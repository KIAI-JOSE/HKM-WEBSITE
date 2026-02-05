import { client } from '../tina/__generated__/client';

// Utility functions to fetch content from TinaCMS
export const tinaService = {
  // Fetch all sermons
  async getSermons() {
    try {
      const response = await client.queries.sermonsConnection();
      return response.data.sermonsConnection.edges?.map(edge => edge?.node) || [];
    } catch (error) {
      console.error('Error fetching sermons:', error);
      return [];
    }
  },

  // Fetch a single sermon by filename
  async getSermon(filename: string) {
    try {
      const response = await client.queries.sermons({ relativePath: `${filename}.mdx` });
      return response.data.sermons;
    } catch (error) {
      console.error('Error fetching sermon:', error);
      return null;
    }
  },

  // Fetch all blog posts
  async getBlogPosts() {
    try {
      const response = await client.queries.blogConnection();
      return response.data.blogConnection.edges?.map(edge => edge?.node) || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },

  // Fetch a single blog post by filename
  async getBlogPost(filename: string) {
    try {
      const response = await client.queries.blog({ relativePath: `${filename}.mdx` });
      return response.data.blog;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },

  // Fetch all events
  async getEvents() {
    try {
      const response = await client.queries.eventsConnection();
      return response.data.eventsConnection.edges?.map(edge => edge?.node) || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  // Fetch all staff members
  async getStaff() {
    try {
      const response = await client.queries.staffConnection();
      return response.data.staffConnection.edges?.map(edge => edge?.node) || [];
    } catch (error) {
      console.error('Error fetching staff:', error);
      return [];
    }
  },

  // Fetch all gallery items
  async getGallery() {
    try {
      const response = await client.queries.galleryConnection();
      return response.data.galleryConnection.edges?.map(edge => edge?.node) || [];
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
  },

  // Fetch site settings
  async getSiteSettings() {
    try {
      const response = await client.queries.settings({ relativePath: 'site.json' });
      return response.data.settings;
    } catch (error) {
      console.error('Error fetching site settings:', error);
      return null;
    }
  },

  // Fetch a page by filename
  async getPage(filename: string) {
    try {
      const response = await client.queries.pages({ relativePath: `${filename}.mdx` });
      return response.data.pages;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  }
};