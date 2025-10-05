import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, saveTokens } from '../services/auth';
import { useToast } from '../contexts/ToastContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const tokens = await login(username, password);
      saveTokens(tokens);
      showToast('Signed in successfully', 'success');
      navigate('/admin');
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        'Login failed';
      setError(message);
      showToast(message, 'error');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background">
      {/* Decorative gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-sunset bg-400% animate-gradient-flow opacity-20" />

      <div className="w-full max-w-md rounded-2xl border border-border bg-background/80 backdrop-blur-xl p-8 shadow-heritage-lg hover-glow hover-3d transition">
        <h1 className="text-3xl font-cinzel tracking-wide text-text-heading text-glow-gold">Admin Login</h1>
        <p className="mt-1 text-sm font-cormorant text-foreground-subtle">Sign in to manage content</p>

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium font-poppins text-foreground-subtle">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background-secondary/60 px-3 py-2 text-text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary hover:shadow-soft-sunlight"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium font-poppins text-foreground-subtle">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background-secondary/60 px-3 py-2 text-text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary hover:shadow-soft-sunlight"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-50 hover-3d hover-glow">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}