import axios from 'axios';
import { getAccessToken, refreshAccessToken, logout } from './auth';

// Determine API base URL with production fallback for Vercel
const envBase = import.meta.env.VITE_API_BASE_URL;
const fallbackProdBase = 'https://amritha-heritage-backend.onrender.com/api';
let baseURL = envBase;

// If no env var set, detect production environment and use fallback
if (!baseURL) {
  try {
    const host = typeof window !== 'undefined' ? window.location.hostname : '';
    const isProdHost = host.endsWith('vercel.app') || host.includes('amrithaheritage.com');
    baseURL = isProdHost ? fallbackProdBase : 'http://127.0.0.1:8000/api';
  } catch {
    baseURL = 'http://127.0.0.1:8000/api';
  }
}

export const api = axios.create({
  baseURL,
});

// Attach Authorization header if access token present
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  const url = config.url || '';
  const isAuthEndpoint = url.includes('/auth/token/');
  if (token && !isAuthEndpoint) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  } else if (isAuthEndpoint) {
    // Ensure Authorization is not sent to token endpoints
    if (config.headers && 'Authorization' in config.headers) {
      delete (config.headers as any)['Authorization'];
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;
      try {
        const newAccess = await refreshAccessToken();
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch {
        logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;