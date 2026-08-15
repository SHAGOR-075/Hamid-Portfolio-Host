import { api } from './api';
import { storage } from './storage';
import { SocialLink, ContactData, ContactMessage } from '../types';

function formatSocial(item: any): SocialLink {
  return {
    ...item,
    id: item.id || item.customId || item._id,
  };
}

export const socialService = {
  getSocials: async (): Promise<SocialLink[]> => {
    try {
      const res = await api.get('/socials');
      if (Array.isArray(res.data)) {
        const formatted = res.data.map(formatSocial);
        storage.setSocials(formatted);
        return formatted;
      }
    } catch {
      // Fallback
    }
    return storage.getSocials();
  },

  getSocialLinks: async (): Promise<SocialLink[]> => {
    return socialService.getSocials();
  },

  updateSocialLinks: async (socials: SocialLink[]): Promise<SocialLink[]> => {
    try {
      const res = await api.put('/socials', socials);
      if (Array.isArray(res.data)) {
        const formatted = res.data.map(formatSocial);
        storage.setSocials(formatted);
        storage.addActivity('Updated social media channels & URLs', 'Social Links');
        return formatted;
      }
    } catch {
      // Fallback
    }
    storage.setSocials(socials);
    storage.addActivity('Updated social media channels & URLs', 'Social Links');
    return socials;
  },

  updateSocial: async (id: string, updates: Partial<SocialLink>): Promise<SocialLink> => {
    try {
      const res = await api.put(`/socials/${id}`, updates);
      if (res.data) {
        const updated = formatSocial(res.data);
        storage.addActivity('Updated social media channel', 'Social Links');
        return updated;
      }
    } catch {
      // Fallback
    }
    const list = storage.getSocials();
    const updated = list.map((s) => (s.id === id ? { ...s, ...updates } : s));
    storage.setSocials(updated);
    storage.addActivity('Updated social media channel', 'Social Links');
    return updated.find((s) => s.id === id)!;
  },

  createSocial: async (item: Omit<SocialLink, 'id'>): Promise<SocialLink> => {
    try {
      const res = await api.post('/socials', item);
      if (res.data) {
        const created = formatSocial(res.data);
        storage.addActivity(`Added social network link for ${created.platform}`, 'Social Links');
        return created;
      }
    } catch {
      // Fallback
    }
    const list = storage.getSocials();
    const newItem: SocialLink = {
      ...item,
      id: `soc_${Date.now()}`,
      order: item.order || list.length + 1,
      active: item.active ?? true,
    };
    const updated = [...list, newItem];
    storage.setSocials(updated);
    storage.addActivity(`Added social network link for ${newItem.platform}`, 'Social Links');
    return newItem;
  },

  addSocialLink: async (item: Omit<SocialLink, 'id'>): Promise<SocialLink> => {
    return socialService.createSocial(item);
  },

  deleteSocial: async (id: string): Promise<void> => {
    try {
      await api.delete(`/socials/${id}`);
    } catch {
      // Fallback
    }
    const list = storage.getSocials();
    const filtered = list.filter((s) => s.id !== id);
    storage.setSocials(filtered);
    storage.addActivity('Removed social network link', 'Social Links');
  },

  deleteSocialLink: async (id: string): Promise<void> => {
    return socialService.deleteSocial(id);
  },

  reorderSocials: async (reordered: SocialLink[]): Promise<SocialLink[]> => {
    const withOrder = reordered.map((item, idx) => ({ ...item, order: idx + 1 }));
    try {
      const res = await api.put('/socials', withOrder);
      if (Array.isArray(res.data)) {
        const formatted = res.data.map(formatSocial);
        storage.setSocials(formatted);
        storage.addActivity('Reordered social profile priority', 'Social Links');
        return formatted;
      }
    } catch {
      // Fallback
    }
    storage.setSocials(withOrder);
    storage.addActivity('Reordered social profile priority', 'Social Links');
    return withOrder;
  },

  toggleSocialVisibility: async (id: string): Promise<SocialLink[]> => {
    const list = storage.getSocials();
    const item = list.find((s) => s.id === id);
    if (item) {
      const nextState = !(item.visible ?? item.active ?? true);
      return socialService.updateSocialLinks(
        list.map((s) => (s.id === id ? { ...s, visible: nextState, active: nextState } : s))
      );
    }
    return list;
  },
};

export const contactService = {
  getContactData: async (): Promise<ContactData> => {
    try {
      const res = await api.get('/contact');
      if (res.data) {
        storage.setContact(res.data);
        return res.data;
      }
    } catch {
      // Fallback
    }
    return storage.getContact();
  },

  updateContactData: async (data: ContactData): Promise<ContactData> => {
    try {
      const res = await api.put('/contact', data);
      if (res.data) {
        storage.setContact(res.data);
        storage.addActivity('Updated portfolio contact details & preferences', 'Contact');
        return res.data;
      }
    } catch {
      // Fallback
    }
    storage.setContact(data);
    storage.addActivity('Updated portfolio contact details & preferences', 'Contact');
    return data;
  },

  getContactMessages: async (): Promise<ContactMessage[]> => {
    try {
      const res = await api.get('/contact/messages');
      if (Array.isArray(res.data)) {
        const formatted = res.data.map((m: any) => ({
          ...m,
          id: m.id || m.customId || m._id,
        }));
        storage.setContactMessages(formatted);
        return formatted;
      }
    } catch {
      // Fallback
    }
    return storage.getContactMessages();
  },

  updateContactMessage: async (id: string, updates: Partial<ContactMessage>): Promise<ContactMessage> => {
    try {
      const res = await api.patch(`/contact/messages/${id}`, updates);
      if (res.data) {
        const updated = {
          ...res.data,
          id: res.data.id || res.data.customId || res.data._id,
        };
        return updated;
      }
    } catch {
      // Fallback
    }
    return storage.updateContactMessage(id, updates);
  },

  deleteContactMessage: async (id: string): Promise<void> => {
    try {
      await api.delete(`/contact/messages/${id}`);
    } catch {
      // Fallback
    }
    storage.deleteContactMessage(id);
  },
};
