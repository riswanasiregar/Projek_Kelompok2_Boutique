import { NavLink } from 'react-router-dom';

const menuItems = [
  { to: '/', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/orders', label: 'Orders', icon: '📦' },
  { to: '/customers', label: 'Customers', icon: '👥' },
  { to: '/products', label: 'Products', icon: '👗' },
];

const errorItems = [
  { to: '/error-400', label: 'Error 400' },
  { to: '/error-401', label: 'Error 401' },
  { to: '/error-403', label: 'Error 403' },
];

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-rose-100 text-rose-600'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">
          Boutique<span className="text-rose-500">.</span>
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">Fashion Admin</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
        {menuItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">Error Pages</p>
        {errorItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            <span>⚠️</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">© 2026 Boutique.</p>
      </div>
    </aside>
  );
}
