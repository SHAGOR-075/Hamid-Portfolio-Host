import { api } from './api';
import { storage } from './storage';
import { WebsiteSettings, ActivityLog } from '../types';

export const settingsService = {
  getSettings: async (): Promise<WebsiteSettings> => {
    try {
      const res = await api.get('/settings');
      if (res.data) {
        storage.setSettings(res.data);
        return res.data;
      }
    } catch {
      // Fallback
    }
    return storage.getSettings();
  },

  updateSettings: async (settings: WebsiteSettings): Promise<WebsiteSettings> => {
    try {
      const res = await api.put('/settings', settings);
      if (res.data) {
        storage.setSettings(res.data);
        storage.addActivity('Updated global website metadata & footer settings', 'Settings');
        return res.data;
      }
    } catch {
      // Fallback
    }
    storage.setSettings(settings);
    storage.addActivity('Updated global website metadata & footer settings', 'Settings');
    return settings;
  },

  getActivityLogs: async (): Promise<ActivityLog[]> => {
    try {
      const res = await api.get('/activities');
      if (Array.isArray(res.data)) {
        return res.data;
      }
    } catch {
      // Fallback
    }
    return storage.getActivities();
  },

  clearActivityLogs: async (): Promise<void> => {
    localStorage.removeItem('portfolio_admin_activities');
  },
};
