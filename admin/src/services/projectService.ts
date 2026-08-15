import { api } from './api';
import { storage } from './storage';
import { Project } from '../types';

function formatProj(item: any): Project {
  return {
    ...item,
    id: item.id || item.customId || item._id,
  };
}

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    try {
      const res = await api.get('/projects');
      if (Array.isArray(res.data)) {
        const formatted = res.data.map(formatProj);
        storage.setProjects(formatted);
        return formatted;
      }
    } catch (err) {
      console.warn('[API Warning] getProjects fallback to local storage:', err);
    }
    return storage.getProjects();
  },

  getProjectById: async (id: string): Promise<Project | undefined> => {
    try {
      const res = await api.get(`/projects/${id}`);
      if (res.data) {
        return formatProj(res.data);
      }
    } catch (err) {
      console.warn('[API Warning] getProjectById fallback to local storage:', err);
    }
    const projects = storage.getProjects();
    return projects.find((p) => p.id === id);
  },

  createProject: async (project: Omit<Project, 'id' | 'updatedAt'>): Promise<Project> => {
    try {
      const res = await api.post('/projects', project);
      if (res.data) {
        const created = formatProj(res.data);
        const current = storage.getProjects();
        storage.setProjects([created, ...current]);
        storage.addActivity(`Added new portfolio project "${created.title}"`, 'Projects');
        return created;
      }
    } catch (err) {
      console.warn('[API Warning] createProject fallback to local storage:', err);
    }
    const projects = storage.getProjects();
    const newProject: Project = {
      ...project,
      id: `proj_${Date.now()}`,
      slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      order: project.order || projects.length + 1,
      updatedAt: new Date().toISOString(),
    };
    const updated = [newProject, ...projects];
    storage.setProjects(updated);
    storage.addActivity(`Added new portfolio project "${newProject.title}"`, 'Projects');
    return newProject;
  },

  updateProject: async (id: string, updates: Partial<Project>): Promise<Project> => {
    try {
      const res = await api.put(`/projects/${id}`, updates);
      if (res.data) {
        const updated = formatProj(res.data);
        const current = storage.getProjects();
        const next = current.map((p) => (p.id === id ? { ...p, ...updated } : p));
        storage.setProjects(next);
        storage.addActivity(`Updated project "${updated.title}"`, 'Projects');
        return updated;
      }
    } catch (err) {
      console.warn('[API Warning] updateProject fallback to local storage:', err);
    }
    const projects = storage.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Project not found');
    const updated = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    projects[index] = updated;
    storage.setProjects(projects);
    storage.addActivity(`Updated project "${updated.title}"`, 'Projects');
    return updated;
  },

  deleteProject: async (id: string): Promise<void> => {
    try {
      await api.delete(`/projects/${id}`);
    } catch (err) {
      console.warn('[API Warning] deleteProject fallback to local storage:', err);
    }
    const projects = storage.getProjects();
    const item = projects.find((p) => p.id === id);
    const filtered = projects.filter((p) => p.id !== id);
    storage.setProjects(filtered);
    if (item) {
      storage.addActivity(`Deleted project "${item.title}"`, 'Projects');
    }
  },

  toggleFeatured: async (id: string): Promise<Project> => {
    const projects = storage.getProjects();
    const project = projects.find((p) => p.id === id);
    if (!project) throw new Error('Project not found');
    const isNowFeatured = !project.featured;

    try {
      const res = await api.put(`/projects/${id}`, { featured: isNowFeatured });
      if (res.data) {
        const updated = formatProj(res.data);
        const current = storage.getProjects();
        const next = current.map((p) => (p.id === id ? { ...p, featured: isNowFeatured } : p));
        storage.setProjects(next);
        storage.addActivity(
          `Set project "${updated.title}" featured status to ${isNowFeatured ? 'ON' : 'OFF'}`,
          'Projects'
        );
        return updated;
      }
    } catch (err) {
      console.warn('[API Warning] toggleFeatured fallback to local storage:', err);
    }
    project.featured = isNowFeatured;
    storage.setProjects(projects);
    storage.addActivity(
      `Set project "${project.title}" featured status to ${isNowFeatured ? 'ON' : 'OFF'}`,
      'Projects'
    );
    return project;
  },

  reorderProjects: async (reordered: Project[]): Promise<Project[]> => {
    const withUpdatedOrder = reordered.map((p, idx) => ({ ...p, order: idx + 1 }));
    try {
      const res = await api.put('/projects', withUpdatedOrder);
      if (Array.isArray(res.data)) {
        const formatted = res.data.map(formatProj);
        storage.setProjects(formatted);
        storage.addActivity('Reordered portfolio projects', 'Projects');
        return formatted;
      }
    } catch (err) {
      console.warn('[API Warning] reorderProjects fallback to local storage:', err);
    }
    storage.setProjects(withUpdatedOrder);
    storage.addActivity('Reordered portfolio projects', 'Projects');
    return withUpdatedOrder;
  },
};
