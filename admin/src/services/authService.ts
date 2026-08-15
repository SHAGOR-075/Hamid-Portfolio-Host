import { api } from './api';
import { storage } from './storage';
import { User } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const res = await api.post('/auth/login', credentials);
    const { user, token } = res.data;
    const rememberMe = credentials.rememberMe ?? false;

    storage.setToken(token, rememberMe);
    storage.setUser(user);

    if (rememberMe) {
      storage.setSavedEmail(credentials.email.trim());
    } else {
      storage.clearSavedEmail();
    }

    return { user, token };
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore network errors during logout.
    } finally {
      storage.clearAuth();
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    const token = storage.getToken();
    if (!token) return null;

    try {
      const res = await api.get('/auth/me');
      if (res.data) {
        storage.setUser(res.data);
        return res.data;
      }
    } catch {
      storage.clearAuth();
      return null;
    }

    return null;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const res = await api.put('/auth/profile', userData);
    if (res.data) {
      storage.setUser(res.data);
      storage.addActivity('Updated admin profile information', 'System');
      return res.data;
    }

    throw new Error('Failed to update profile.');
  },

  changePassword: async (currentPass: string, newPass: string): Promise<boolean> => {
    if (!newPasswordValid(newPass)) {
      throw new Error('New password must be at least 6 characters.');
    }

    await api.put('/auth/password', {
      currentPassword: currentPass,
      newPassword: newPass,
    });
    storage.addActivity('Changed admin account password', 'System');
    return true;
  },
};

function newPasswordValid(p: string): boolean {
  return Boolean(p && p.length >= 6);
}
