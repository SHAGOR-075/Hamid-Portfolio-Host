import { api } from './api';
import { storage } from './storage';
import { TravelPost, TravelPhoto, TravelCarouselSettings } from '../types';

function formatTravel(item: any): TravelPost {
  return {
    ...item,
    id: item.id || item.customId || item._id,
  };
}

export const travelService = {
  getTravelPosts: async (): Promise<TravelPost[]> => {
    try {
      const res = await api.get('/travel');
      if (Array.isArray(res.data)) {
        const formatted = res.data.map(formatTravel);
        storage.setTravel(formatted);
        return formatted;
      }
    } catch (err) {
      console.warn('[API Warning] getTravelPosts fallback to local storage:', err);
    }
    return storage.getTravel();
  },

  getTravelPostById: async (id: string): Promise<TravelPost | undefined> => {
    try {
      const res = await api.get(`/travel/${id}`);
      if (res.data) {
        return formatTravel(res.data);
      }
    } catch (err) {
      console.warn('[API Warning] getTravelPostById fallback to local storage:', err);
    }
    const posts = storage.getTravel();
    return posts.find((p) => p.id === id);
  },

  createTravelPost: async (post: Omit<TravelPost, 'id' | 'updatedAt'>): Promise<TravelPost> => {
    try {
      const res = await api.post('/travel', post);
      if (res.data) {
        const created = formatTravel(res.data);
        const current = storage.getTravel();
        storage.setTravel([created, ...current]);
        storage.addActivity(`Created travel journal post "${created.location}"`, 'Travel');
        return created;
      }
    } catch (err) {
      console.warn('[API Warning] createTravelPost fallback to local storage:', err);
    }
    const posts = storage.getTravel();
    const newPost: TravelPost = {
      ...post,
      id: `trv_${Date.now()}`,
      order: post.order || posts.length + 1,
      updatedAt: new Date().toISOString(),
    };
    const updated = [newPost, ...posts];
    storage.setTravel(updated);
    storage.addActivity(`Created travel journal post "${newPost.location}"`, 'Travel');
    return newPost;
  },

  updateTravelPost: async (id: string, updates: Partial<TravelPost>): Promise<TravelPost> => {
    try {
      const res = await api.put(`/travel/${id}`, updates);
      if (res.data) {
        const updated = formatTravel(res.data);
        const current = storage.getTravel();
        const next = current.map((p) => (p.id === id ? { ...p, ...updated } : p));
        storage.setTravel(next);
        storage.addActivity(`Updated travel journal post "${updated.location}"`, 'Travel');
        return updated;
      }
    } catch (err) {
      console.warn('[API Warning] updateTravelPost fallback to local storage:', err);
    }
    const posts = storage.getTravel();
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Travel post not found');
    const updated = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    posts[index] = updated;
    storage.setTravel(posts);
    storage.addActivity(`Updated travel journal post "${updated.location}"`, 'Travel');
    return updated;
  },

  deleteTravelPost: async (id: string): Promise<void> => {
    try {
      await api.delete(`/travel/${id}`);
    } catch (err) {
      console.warn('[API Warning] deleteTravelPost fallback to local storage:', err);
    }
    const posts = storage.getTravel();
    const item = posts.find((p) => p.id === id);
    const filtered = posts.filter((p) => p.id !== id);
    storage.setTravel(filtered);
    if (item) {
      storage.addActivity(`Deleted travel post "${item.location}"`, 'Travel');
    }
  },

  updateCarouselSettings: async (
    id: string,
    settings: TravelCarouselSettings
  ): Promise<TravelPost> => {
    try {
      const res = await api.put(`/travel/${id}`, { carouselSettings: settings });
      if (res.data) {
        const updated = formatTravel(res.data);
        storage.addActivity(`Updated carousel slider settings for "${updated.location}"`, 'Travel');
        return updated;
      }
    } catch (err) {
      console.warn('[API Warning] updateCarouselSettings fallback to local storage:', err);
    }
    const posts = storage.getTravel();
    const post = posts.find((p) => p.id === id);
    if (!post) throw new Error('Travel post not found');
    post.carouselSettings = settings;
    storage.setTravel(posts);
    storage.addActivity(`Updated carousel slider settings for "${post.location}"`, 'Travel');
    return post;
  },

  updatePhotos: async (id: string, photos: TravelPhoto[]): Promise<TravelPost> => {
    const coverPhoto = photos.find((p) => p.isCover);
    const updates: Partial<TravelPost> = { photos };
    if (coverPhoto) updates.coverImage = coverPhoto.url;

    try {
      const res = await api.put(`/travel/${id}`, updates);
      if (res.data) {
        const updated = formatTravel(res.data);
        storage.addActivity(`Updated photos gallery for "${updated.location}" (${photos.length} photos)`, 'Travel');
        return updated;
      }
    } catch (err) {
      console.warn('[API Warning] updatePhotos fallback to local storage:', err);
    }
    const posts = storage.getTravel();
    const post = posts.find((p) => p.id === id);
    if (!post) throw new Error('Travel post not found');
    post.photos = photos;
    if (coverPhoto) post.coverImage = coverPhoto.url;
    storage.setTravel(posts);
    storage.addActivity(`Updated photos gallery for "${post.location}" (${photos.length} photos)`, 'Travel');
    return post;
  },

  reorderTravelPosts: async (reordered: TravelPost[]): Promise<TravelPost[]> => {
    const withUpdatedOrder = reordered.map((p, idx) => ({ ...p, order: idx + 1 }));
    try {
      const res = await api.put('/travel', withUpdatedOrder);
      if (Array.isArray(res.data)) {
        const formatted = res.data.map(formatTravel);
        storage.setTravel(formatted);
        storage.addActivity('Reordered travel stories', 'Travel');
        return formatted;
      }
    } catch (err) {
      console.warn('[API Warning] reorderTravelPosts fallback to local storage:', err);
    }
    storage.setTravel(withUpdatedOrder);
    storage.addActivity('Reordered travel stories', 'Travel');
    return withUpdatedOrder;
  },
};
