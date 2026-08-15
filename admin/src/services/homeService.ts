import { api } from './api';
import { storage } from './storage';
import { HomeData } from '../types';

export const homeService = {
  getHomeData: async (): Promise<HomeData> => {
    try {
      const res = await api.get('/home');
      if (res.data) {
        storage.setHome(res.data);
        return res.data;
      }
    } catch {
      // Fallback to local storage if server offline
    }
    return storage.getHome();
  },

  updateHomeData: async (data: HomeData): Promise<HomeData> => {
    try {
      const res = await api.put('/home', data);
      if (res.data) {
        storage.setHome(res.data);
        storage.addActivity('Updated Home hero configuration & tags', 'Home');
        return res.data;
      }
    } catch {
      // Fallback
    }
    storage.setHome(data);
    storage.addActivity('Updated Home hero configuration & tags', 'Home');
    return data;
  },
};
