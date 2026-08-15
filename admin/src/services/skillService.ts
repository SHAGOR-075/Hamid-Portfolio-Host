import { api } from './api';
import { storage } from './storage';
import { Skill } from '../types';

function formatSkill(item: any): Skill {
  return {
    ...item,
    id: item.id || item.customId || item._id,
  };
}

export const skillService = {
  getSkills: async (): Promise<Skill[]> => {
    try {
      const res = await api.get('/skills');
      if (Array.isArray(res.data)) {
        const formatted = res.data.map(formatSkill);
        storage.setSkills(formatted);
        return formatted;
      }
    } catch (err) {
      console.warn('[API Warning] getSkills fallback to local storage:', err);
    }
    return storage.getSkills();
  },

  createSkill: async (skill: Omit<Skill, 'id'>): Promise<Skill> => {
    try {
      const res = await api.post('/skills', skill);
      if (res.data) {
        const created = formatSkill(res.data);
        const current = storage.getSkills();
        storage.setSkills([...current, created]);
        storage.addActivity(`Created new skill "${created.name}"`, 'Skills');
        return created;
      }
    } catch (err) {
      console.warn('[API Warning] createSkill fallback to local storage:', err);
    }
    const skills = storage.getSkills();
    const newSkill: Skill = {
      ...skill,
      id: `sk_${Date.now()}`,
      order: skill.order || skills.length + 1,
    };
    const updated = [...skills, newSkill];
    storage.setSkills(updated);
    storage.addActivity(`Created new skill "${newSkill.name}"`, 'Skills');
    return newSkill;
  },

  updateSkill: async (id: string, updates: Partial<Skill>): Promise<Skill> => {
    try {
      const res = await api.put(`/skills/${id}`, updates);
      if (res.data) {
        const updated = formatSkill(res.data);
        const current = storage.getSkills();
        const next = current.map((s) => (s.id === id ? { ...s, ...updated } : s));
        storage.setSkills(next);
        storage.addActivity(`Updated skill "${updated.name}"`, 'Skills');
        return updated;
      }
    } catch (err) {
      console.warn('[API Warning] updateSkill fallback to local storage:', err);
    }
    const skills = storage.getSkills();
    const index = skills.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Skill not found');
    const updatedSkill = { ...skills[index], ...updates };
    skills[index] = updatedSkill;
    storage.setSkills(skills);
    storage.addActivity(`Updated skill "${updatedSkill.name}"`, 'Skills');
    return updatedSkill;
  },

  deleteSkill: async (id: string): Promise<void> => {
    try {
      await api.delete(`/skills/${id}`);
    } catch (err) {
      console.warn('[API Warning] deleteSkill fallback to local storage:', err);
    }
    const skills = storage.getSkills();
    const skill = skills.find((s) => s.id === id);
    const filtered = skills.filter((s) => s.id !== id);
    storage.setSkills(filtered);
    if (skill) {
      storage.addActivity(`Deleted skill "${skill.name}"`, 'Skills');
    }
  },

  reorderSkills: async (reorderedSkills: Skill[]): Promise<Skill[]> => {
    const withUpdatedOrder = reorderedSkills.map((s, idx) => ({ ...s, order: idx + 1 }));
    try {
      const res = await api.put('/skills', withUpdatedOrder);
      if (Array.isArray(res.data)) {
        const formatted = res.data.map(formatSkill);
        storage.setSkills(formatted);
        storage.addActivity('Reordered technical skills list', 'Skills');
        return formatted;
      }
    } catch (err) {
      console.warn('[API Warning] reorderSkills fallback to local storage:', err);
    }
    storage.setSkills(withUpdatedOrder);
    storage.addActivity('Reordered technical skills list', 'Skills');
    return withUpdatedOrder;
  },
};
