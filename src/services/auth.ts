import api from './api';

export interface LoginResponse {
  access: string;
  refresh: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post('/auth/token/', { username, password });
  return data;
}

export function saveTokens(tokens: LoginResponse) {
  localStorage.setItem('access_token', tokens.access);
  localStorage.setItem('refresh_token', tokens.refresh);
}

export function getAccessToken(): string | null {
  return localStorage.getItem('access_token');
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refresh_token');
}

export function setAccessToken(token: string) {
  localStorage.setItem('access_token', token);
}

export async function refreshAccessToken(): Promise<string> {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error('No refresh token');
  const { data } = await api.post('/auth/token/refresh/', { refresh });
  const newAccess: string = data.access;
  setAccessToken(newAccess);
  return newAccess;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}