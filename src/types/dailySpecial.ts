export interface DailySpecial {
  id: number;
  name: string;
  description: string;
  price: string; // DRF returns decimals as strings by default
  image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}