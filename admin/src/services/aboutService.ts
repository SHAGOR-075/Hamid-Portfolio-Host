import { api } from './api';
import { storage } from './storage';
import { AboutData } from '../types';

export const aboutService = {
  getAboutData: async (): Promise<AboutData> => {
    try {
      const res = await api.get('/about');
      if (res.data) {
        storage.setAbout(res.data);
        return res.data;
      }
    } catch {
      // Fallback
    }
    return storage.getAbout();
  },

  updateAboutData: async (data: AboutData): Promise<AboutData> => {
    try {
      const res = await api.put('/about', data);
      if (res.data) {
        storage.setAbout(res.data);
        storage.addActivity('Updated About section paragraphs & statistics', 'About');
        return res.data;
      }
    } catch {
      // Fallback
    }
    storage.setAbout(data);
    storage.addActivity('Updated About section paragraphs & statistics', 'About');
    return data;
  },
};
