import { useEffect, useState } from 'react';
import { listDailySpecials, toggleActive, removeDailySpecial, createDailySpecial, updateDailySpecial } from '../services/dailySpecials';
import type { DailySpecial } from '../types/dailySpecial';
import { useToast } from '../contexts/ToastContext';

export default function DailySpecialsPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<DailySpecial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<DailySpecial | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editImage, setEditImage] = useState<File | null>(null);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const pageSize = items.length || 10; // best-effort display size

  async function refresh(targetPage = page) {
    try {
      setLoading(true);
      const data = await listDailySpecials(targetPage);
      setItems(data.results);
      setCount(data.count);
      setNext(data.next);
      setPrevious(data.previous);
      setError(null);
      setPage(targetPage);
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
      showToast('Status updated', 'success');
    } catch (e: any) {
      showToast('Failed to toggle', 'error');
    }
  }

  async function onDelete(id: number) {
    if (!confirm('Delete this daily special?')) return;
    try {
      await removeDailySpecial(id);
      // After deletion, if current page becomes empty and there is a previous page, go back
      const nextPage = items.length === 1 && page > 1 ? page - 1 : page;
      refresh(nextPage);
      showToast('Deleted successfully', 'success');
    } catch (e: any) {
      showToast('Failed to delete', 'error');
    }
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createDailySpecial({ name, description, price, image });
      setName(''); setDescription(''); setPrice(''); setImage(null);
      refresh(1); // return to first page to show newest item
      showToast('Created successfully', 'success');
    } catch (err: any) {
      showToast('Failed to create', 'error');
    }
  }

  function openEdit(item: DailySpecial) {
    setEditItem(item);
    setEditName(item.name);
    setEditDescription(item.description);
    setEditPrice(String(item.price));
    setEditImage(null);
    setEditOpen(true);
  }

  function closeEdit() {
    setEditOpen(false);
    setEditItem(null);
    setEditName('');
    setEditDescription('');
    setEditPrice('');
    setEditImage(null);
  }

  async function onUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editItem) return;
    try {
      await updateDailySpecial(editItem.id, {
        name: editName,
        description: editDescription,
        price: editPrice,
        image: editImage || undefined,
      });
      showToast('Updated successfully', 'success');
      closeEdit();
      refresh(page);
    } catch (err: any) {
      showToast('Failed to update', 'error');
    }
  }

  return (
    <div className="space-y-10">
      {/* Create Form - Modern Glass Card */}
      <section className="rounded-2xl border border-border bg-background/80 backdrop-blur-xl p-6 md:p-8 shadow-heritage-lg hover-glow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-cinzel tracking-wide text-text-heading">Create Daily Special</h2>
            <p className="text-sm font-cormorant text-foreground-subtle">Add a new dish with price, description and image</p>
          </div>
          <div className="h-1 w-32 bg-sunrise bg-400% animate-gradient-flow rounded-full" />
        </div>
        <form onSubmit={onCreate} className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium font-poppins text-foreground-subtle">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background-secondary/60 px-3 py-2 text-text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary hover:shadow-soft-sunlight" required />
          </div>
          <div>
            <label className="block text-sm font-medium font-poppins text-foreground-subtle">Price</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background-secondary/60 px-3 py-2 text-text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary hover:shadow-soft-sunlight" required />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium font-poppins text-foreground-subtle">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background-secondary/60 px-3 py-2 text-text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary hover:shadow-soft-sunlight" rows={3} required />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium font-poppins text-foreground-subtle">Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="mt-1 block w-full text-sm file:mr-4 file:rounded-lg file:border file:border-border file:bg-background-secondary file:px-3 file:py-2 file:text-text-heading hover:file:bg-background-tertiary" />
          </div>
          <button type="submit" className="sm:col-span-2 mt-2 btn btn-primary w-full hover-3d hover-glow">
            Create
          </button>
        </form>
      </section>

      {/* Items Grid - Cards with Images */}
      <section className="rounded-2xl border border-border bg-background/80 backdrop-blur-xl p-6 md:p-8 shadow-heritage-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-cinzel tracking-wide text-text-heading">Daily Specials</h2>
          {loading && <span className="text-sm text-foreground-subtle">Loading...</span>}
        </div>
        {error && <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">{error}</div>}

        <div className="mt-6 space-y-4">
          {items.map((it) => (
            <div key={it.id} className="group rounded-2xl border border-border bg-background/80 shadow-heritage-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="relative h-32 lg:h-24 lg:w-32 bg-background-secondary flex-shrink-0">
                  {it.image ? (
                    <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-foreground-subtle text-sm">No image</div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold shadow-soft-sunlight ${it.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {it.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-4 lg:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Title and Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="font-playfair text-lg lg:text-xl text-text-heading truncate">{it.name}</h3>
                        <span className="font-poppins text-lg font-semibold text-primary flex-shrink-0">₹ {it.price}</span>
                      </div>
                      <p className="text-sm text-foreground-subtle line-clamp-2 lg:line-clamp-1">{it.description}</p>
                    </div>
                    
                    {/* Controls Section */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 flex-shrink-0">
                      {/* Active Toggle Switch */}
                      <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={it.is_active}
                          onChange={() => onToggle(it.id)}
                          className="sr-only peer"
                        />
                        <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ease-in-out ${
                          it.is_active 
                            ? 'bg-green-500 shadow-lg shadow-green-500/30' 
                            : 'bg-red-500 shadow-lg shadow-red-500/30'
                        }`}>
                          <div className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ease-in-out transform ${
                            it.is_active ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </div>
                        <span className={`text-xs lg:text-sm font-poppins font-medium transition-colors duration-200 ${
                          it.is_active ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {it.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </label>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button 
                          onClick={() => openEdit(it)} 
                          className="inline-flex items-center rounded-md border border-blue-300 px-3 py-1.5 text-xs lg:text-sm text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition font-medium"
                        >
                          Edit
                        </button>
                        {it.image && (
                          <a 
                            href={it.image} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-xs lg:text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition font-medium"
                          >
                            View
                          </a>
                        )}
                        <button
                          onClick={() => onDelete(it.id)}
                          className="inline-flex items-center rounded-md border border-red-300 px-3 py-1.5 text-xs lg:text-sm text-red-700 hover:bg-red-50 hover:border-red-400 transition font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-foreground-subtle">
            Showing <span className="font-medium">{items.length}</span> of <span className="font-medium">{count}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={!previous}
              onClick={() => previous && refresh(page - 1)}
              className={`btn btn-ghost ${previous ? '' : 'opacity-50 cursor-not-allowed'}`}
            >
              Previous
            </button>
            <span className="text-sm text-foreground-subtle">Page {page}</span>
            <button
              disabled={!next}
              onClick={() => next && refresh(page + 1)}
              className={`btn btn-ghost ${next ? '' : 'opacity-50 cursor-not-allowed'}`}
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Edit Modal */}
      {editOpen && editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-background shadow-heritage-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-playfair text-text-heading">Edit Daily Special</h3>
              <button onClick={closeEdit} className="btn btn-ghost">Close</button>
            </div>
            <form onSubmit={onUpdate} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium font-poppins text-foreground-subtle">Name</label>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background-secondary px-3 py-2 text-text-heading focus:border-primary focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium font-poppins text-foreground-subtle">Price</label>
                <input type="number" step="0.01" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background-secondary px-3 py-2 text-text-heading focus:border-primary focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium font-poppins text-foreground-subtle">Description</label>
                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background-secondary px-3 py-2 text-text-heading focus:border-primary focus:ring-2 focus:ring-primary" rows={4} />
              </div>
              <div>
                <label className="block text-sm font-medium font-poppins text-foreground-subtle">Replace Image (optional)</label>
                <input type="file" accept="image/*" onChange={(e) => setEditImage(e.target.files?.[0] || null)} className="mt-1 block w-full text-sm file:mr-4 file:rounded-lg file:border file:border-border file:bg-background-secondary file:px-3 file:py-2 file:text-text-heading" />
              </div>
              <div className="flex items-center justify-end gap-2">
                <button type="button" onClick={closeEdit} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}