import { useEffect, useState, useMemo } from 'react';
import { listDailySpecials } from '../services/dailySpecials';
import type { DailySpecial } from '../types/dailySpecial';
import { useToast } from '../contexts/ToastContext';
import { NavLink } from 'react-router-dom';

export default function Dashboard() {
  const { showToast } = useToast();
  const [items, setItems] = useState<DailySpecial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAll() {
    try {
      setLoading(true);
      setError(null);
      let page = 1;
      let all: DailySpecial[] = [];
      let next: string | null = null;
      do {
        const data = await listDailySpecials(page);
        all = all.concat(data.results);
        next = data.next;
        page += 1;
      } while (next);
      setItems(all);
    } catch (e: any) {
      setError(e?.message || 'Failed to load dashboard');
      showToast('Failed to load dashboard', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const stats = useMemo(() => {
    const total = items.length;
    const active = items.filter((i) => i.is_active).length;
    const inactive = total - active;
    const recent = [...items]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
    return { total, active, inactive, recent };
  }, [items]);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="rounded-2xl bg-background border border-border text-foreground shadow-heritage-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-playfair text-2xl text-text-heading">Kohinoor Admin Dashboard</h2>
            <p className="font-cormorant text-sm mt-1 text-foreground-subtle">Curate heritage-inspired daily specials and manage content effortlessly.</p>
          </div>
          <NavLink to="/admin/daily-specials" className="btn btn-secondary">
            Manage Specials
          </NavLink>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background-secondary p-6 shadow-heritage-lg">
          <p className="text-sm text-foreground-subtle">Total Specials</p>
          <p className="mt-2 font-playfair text-3xl text-text-heading">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-border bg-background-secondary p-6 shadow-heritage-lg">
          <p className="text-sm text-foreground-subtle">Active</p>
          <p className="mt-2 font-playfair text-3xl text-green-600">{stats.active}</p>
        </div>
        <div className="rounded-xl border border-border bg-background-secondary p-6 shadow-heritage-lg">
          <p className="text-sm text-foreground-subtle">Inactive</p>
          <p className="mt-2 font-playfair text-3xl text-text-heading">{stats.inactive}</p>
        </div>
      </section>

      {/* Recent Items */}
      <section className="rounded-xl border border-border bg-background p-6 shadow-heritage-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-playfair text-lg text-text-heading">Recent Specials</h3>
          {loading && <span className="text-sm text-foreground-subtle">Loading...</span>}
        </div>
        {error && <div className="mt-2 rounded bg-red-50 p-3 text-red-700">{error}</div>}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background-secondary">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-poppins font-medium text-foreground-subtle uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-poppins font-medium text-foreground-subtle uppercase tracking-wider">Price</th>
                <th className="px-4 py-2 text-left text-xs font-poppins font-medium text-foreground-subtle uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-poppins font-medium text-foreground-subtle uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stats.recent.map((it) => (
                <tr key={it.id} className="hover:bg-background-secondary/60 transition">
                  <td className="px-4 py-2 text-text-heading">{it.name}</td>
                  <td className="px-4 py-2 text-text-heading">₹ {it.price}</td>
                  <td className="px-4 py-2">
                    <span className={`rounded-full px-2 py-1 text-xs ${it.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{it.is_active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-4 py-2 text-sm text-foreground-subtle">{new Date(it.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {stats.recent.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-sm text-foreground-subtle" colSpan={4}>No specials yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}