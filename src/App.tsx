import { useEffect, useState } from 'react';
import { listDailySpecials, toggleActive, removeDailySpecial, createDailySpecial } from './services/dailySpecials';
import type { DailySpecial } from './types/dailySpecial';

function App() {
  const [items, setItems] = useState<DailySpecial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);

  async function refresh() {
    try {
      setLoading(true);
      const data = await listDailySpecials();
      setItems(data.results);
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onToggle(id: number) {
    try {
      await toggleActive(id);
      refresh();
    } catch (e: any) {
      alert('Failed to toggle');
    }
  }

  async function onDelete(id: number) {
    if (!confirm('Delete this daily special?')) return;
    try {
      await removeDailySpecial(id);
      refresh();
    } catch (e: any) {
      alert('Failed to delete');
    }
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createDailySpecial({ name, description, price, image });
      setName(''); setDescription(''); setPrice(''); setImage(null);
      refresh();
    } catch (err: any) {
      alert(err?.response?.data || 'Failed to create');
    }
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-600">Manage Daily Specials</p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4 space-y-6">
        <form onSubmit={onCreate} className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-medium text-gray-900">Create Daily Special</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand" rows={3} required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="mt-1 block w-full text-sm" />
            </div>
          </div>
          <button type="submit" className="mt-4 inline-flex items-center rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark">Create</button>
        </form>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Daily Specials</h2>
            {loading && <span className="text-sm text-gray-500">Loading...</span>}
          </div>
          {error && <div className="mt-2 rounded bg-red-50 p-3 text-red-700">{error}</div>}
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((it) => (
                  <tr key={it.id}>
                    <td className="px-4 py-2">{it.name}</td>
                    <td className="px-4 py-2">₹ {it.price}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => onToggle(it.id)} className={`rounded px-2 py-1 text-xs ${it.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{it.is_active ? 'Active' : 'Inactive'}</button>
                    </td>
                    <td className="px-4 py-2">
                      {it.image ? <a href={it.image} target="_blank" rel="noreferrer" className="text-brand hover:text-brand-dark">View</a> : <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button onClick={() => onDelete(it.id)} className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App
