import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { storage } from './storage';

// Base Axios instance ready for live REST API connection
export const api: AxiosInstance = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for attaching JWT Bearer token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.setToken(null);
    }
    return Promise.reject(error);
  }
);

// Helper for simulated network delay when operating with local client-side persistence
export const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));
