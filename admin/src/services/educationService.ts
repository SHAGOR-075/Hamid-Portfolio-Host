import { api } from './api';
import { storage } from './storage';
import { Education } from '../types';

function formatEdu(item: any): Education {
  return {
    ...item,
    id: item.id || item.customId || item._id,
  };
}

export const educationService = {
  getEducation: async (): Promise<Education[]> => {
    try {
      const res = await api.get('/education');
      if (Array.isArray(res.data)) {
        const formatted = res.data.map(formatEdu);
        storage.setEducation(formatted);
        return formatted;
      }
    } catch (err) {
      console.warn('[API Warning] getEducation fallback to local storage:', err);
    }
    return storage.getEducation();
  },

  createEducation: async (edu: Omit<Education, 'id'>): Promise<Education> => {
    try {
      const res = await api.post('/education', edu);
      if (res.data) {
        const created = formatEdu(res.data);
        const current = storage.getEducation();
        storage.setEducation([...current, created]);
        storage.addActivity(`Added educational qualification "${created.degree}"`, 'Education');
        return created;
      }
    } catch (err) {
      console.warn('[API Warning] createEducation fallback to local storage:', err);
    }
    const list = storage.getEducation();
    const newEdu: Education = {
      ...edu,
      id: `edu_${Date.now()}`,
      order: edu.order || list.length + 1,
    };
    const updated = [...list, newEdu];
    storage.setEducation(updated);
    storage.addActivity(`Added educational qualification "${newEdu.degree}"`, 'Education');
    return newEdu;
  },

  updateEducation: async (id: string, updates: Partial<Education>): Promise<Education> => {
    try {
      const res = await api.put(`/education/${id}`, updates);
      if (res.data) {
        const updated = formatEdu(res.data);
        const current = storage.getEducation();
        const next = current.map((e) => (e.id === id ? { ...e, ...updated } : e));
        storage.setEducation(next);
        storage.addActivity(`Updated education "${updated.degree}"`, 'Education');
        return updated;
      }
    } catch (err) {
      console.warn('[API Warning] updateEducation fallback to local storage:', err);
    }
    const list = storage.getEducation();
    const index = list.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Education item not found');
    const updated = { ...list[index], ...updates };
    list[index] = updated;
    storage.setEducation(list);
    storage.addActivity(`Updated education "${updated.degree}"`, 'Education');
    return updated;
  },

  deleteEducation: async (id: string): Promise<void> => {
    try {
      await api.delete(`/education/${id}`);
    } catch (err) {
      console.warn('[API Warning] deleteEducation fallback to local storage:', err);
    }
    const list = storage.getEducation();
    const item = list.find((e) => e.id === id);
    const filtered = list.filter((e) => e.id !== id);
    storage.setEducation(filtered);
    if (item) {
      storage.addActivity(`Deleted education entry "${item.degree}"`, 'Education');
    }
  },

  reorderEducation: async (reordered: Education[]): Promise<Education[]> => {
    const withUpdatedOrder = reordered.map((e, idx) => ({ ...e, order: idx + 1 }));
    try {
      const res = await api.put('/education', withUpdatedOrder);
      if (Array.isArray(res.data)) {
        const formatted = res.data.map(formatEdu);
        storage.setEducation(formatted);
        storage.addActivity('Reordered education history timeline', 'Education');
        return formatted;
      }
    } catch (err) {
      console.warn('[API Warning] reorderEducation fallback to local storage:', err);
    }
    storage.setEducation(withUpdatedOrder);
    storage.addActivity('Reordered education history timeline', 'Education');
    return withUpdatedOrder;
  },
};
