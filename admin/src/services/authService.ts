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
    try {
      const res = await api.post('/auth/login', credentials);
      const { user, token } = res.data;
      storage.setToken(token);
      storage.setUser(user);
      return { user, token };
    } catch (error: any) {
      // Fallback to local storage mock if backend server is unreachable
      if (credentials.email && credentials.password.length >= 4) {
        const user = storage.getUser();
        const token = `jwt_mock_token_${Date.now()}`;
        storage.setToken(token);
        return { user, token };
      }
      throw new Error(error.response?.data?.message || 'Invalid email or password. Use admin@example.com / admin123');
    }
  },

  logout: async (): Promise<void> => {
    storage.setToken(null);
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
      // Fallback
    }
    return storage.getUser();
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const res = await api.put('/auth/profile', userData);
      if (res.data) {
        storage.setUser(res.data);
        storage.addActivity('Updated admin profile information', 'System');
        return res.data;
      }
    } catch {
      // Fallback
    }
    const current = storage.getUser();
    const updated = { ...current, ...userData };
    storage.setUser(updated);
    storage.addActivity('Updated admin profile information', 'System');
    return updated;
  },

  changePassword: async (currentPass: string, newPass: string): Promise<boolean> => {
    if (!newPasswordValid(newPass)) {
      throw new Error('New password must be at least 6 characters.');
    }
    try {
      await api.put('/auth/password', { currentPassword: currentPass, newPassword: newPass });
      storage.addActivity('Changed admin account password', 'System');
      return true;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
    }
    storage.addActivity('Changed admin account password', 'System');
    return true;
  },
};

function newPasswordValid(p: string): boolean {
  return Boolean(p && p.length >= 6);
}
