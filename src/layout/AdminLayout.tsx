import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

export default function AdminLayout() {
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left Sidebar with nav links */}
      <aside className="w-64 border-r border-border bg-background/80 backdrop-blur-xl sticky top-0 h-screen flex flex-col justify-between">
        <nav className="px-4 py-6 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-foreground-on-color shadow-heritage-lg'
                  : 'text-foreground-subtle border border-border hover:bg-background-secondary hover:text-text-heading'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/daily-specials"
            className={({ isActive }) =>
              `block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-foreground-on-color shadow-heritage-lg'
                  : 'text-foreground-subtle border border-border hover:bg-background-secondary hover:text-text-heading'
              }`
            }
          >
            Daily Specials
          </NavLink>
        </nav>
        <div className="px-4 pb-6">
          <button onClick={onLogout} className="btn btn-secondary w-full">Logout</button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 min-h-screen">
        {/* Header: centered, styled, bigger Amritha logo */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-center">
            <img
              src="/logoBlack.png"
              alt="Amritha Heritage"
              className="h-12 md:h-14 w-auto rounded-xl shadow-heritage-md transition-transform duration-300"
            />
          </div>
          {/* Removed accent gradient line as requested */}
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl p-6 md:p-8">
          <div className="rounded-2xl border border-border bg-background/80 shadow-heritage-lg">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}