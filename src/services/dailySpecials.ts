import api from './api';
import type { DailySpecial, Paginated } from '../types/dailySpecial';

export async function listDailySpecials(page = 1): Promise<Paginated<DailySpecial>> {
  const { data } = await api.get(`/menu/daily-specials/`, { params: { page } });
  return data;
}

export async function listActiveDailySpecials(): Promise<{ results: DailySpecial[]; count: number }>{
  const { data } = await api.get(`/menu/daily-specials/active/`);
  return data;
}

export async function createDailySpecial(payload: {
  name: string;
  description: string;
  price: string | number;
  image?: File | null;
}): Promise<DailySpecial> {
  const form = new FormData();
  form.append('name', payload.name);
  form.append('description', payload.description);
  form.append('price', String(payload.price));
  if (payload.image) form.append('image', payload.image);
  const { data } = await api.post(`/menu/daily-specials/`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function toggleActive(id: number): Promise<DailySpecial> {
  const { data } = await api.post(`/menu/daily-specials/${id}/toggle_active/`);
  return data.data;
}

export async function removeDailySpecial(id: number): Promise<void> {
  await api.delete(`/menu/daily-specials/${id}/`);
}

export async function updateDailySpecial(
  id: number,
  payload: {
    name?: string;
    description?: string;
    price?: string | number;
    image?: File | null;
    is_active?: boolean;
  }
): Promise<DailySpecial> {
  const form = new FormData();
  if (payload.name !== undefined) form.append('name', payload.name);
  if (payload.description !== undefined) form.append('description', payload.description);
  if (payload.price !== undefined) form.append('price', String(payload.price));
  if (payload.image) form.append('image', payload.image);
  if (payload.is_active !== undefined) form.append('is_active', String(payload.is_active));
  const { data } = await api.patch(`/menu/daily-specials/${id}/`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}