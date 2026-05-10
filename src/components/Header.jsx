import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  BsSearch, BsBell, BsChevronDown
} from 'react-icons/bs';

const pageTitles = {
  '/': 'Dashboard', '/products': 'Products', '/orders': 'Orders',
  '/customers': 'Customers', '/analytics': 'Analytics', '/promotions': 'Promotions',
  '/reports': 'Reports', '/settings': 'Settings', '/collections': 'Collections',
  '/inventory': 'Inventory', '/suppliers': 'Suppliers',
  '/error-400': 'Error 400', '/error-401': 'Error 401', '/error-403': 'Error 403',
};

// Pages that use search
const searchablePages = ['/products', '/orders', '/customers', '/collections', '/inventory', '/suppliers', '/promotions'];

export default function Header({ onSearch }) {
  const [search, setSearch] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || 'Page';
  const showSearch = searchablePages.includes(location.pathname);

  const notifications = [
    { id: 1, text: 'New order from Andi Saputra', time: '2m ago', unread: true, icon: '🛍️' },
    { id: 2, text: 'Citra Anggraini joined as customer', time: '15m ago', unread: true, icon: '👤' },
    { id: 3, text: 'Order ORD-028 completed', time: '1h ago', unread: false, icon: '✅' },
    { id: 4, text: 'Low stock: Trench Coat (5 left)', time: '2h ago', unread: false, icon: '⚠️' },
  ];

  function handleSearchChange(e) {
    setSearch(e.target.value);
    onSearch?.(e.target.value);
  }

  // Reset search when navigating away
  if (!showSearch && search) {
    setSearch('');
    onSearch?.('');
  }

  return (
    <header className="px-6 py-3.5 flex items-center justify-between sticky top-0 z-30"
      style={{ background: '#FFFFFF', borderBottom: '1px solid #EDE8E3' }}>

      {/* Left */}
      <div>
        <h2 className="text-base font-bold" style={{ color: '#1A1614' }}>{pageTitle}</h2>
        <p className="text-xs mt-0.5" style={{ color: '#8C7B6B' }}>
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search */}
        {showSearch && (
          <div className="relative hidden sm:block">
            <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#8C7B6B' }} />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder={`Search ${pageTitle.toLowerCase()}...`}
              className="pl-9 pr-4 py-2 text-xs rounded-xl w-56 outline-none transition-all"
              style={{ background: '#F5F0EB', border: '1.5px solid #EDE8E3', color: '#1A1614' }}
              onFocus={e => { e.target.style.borderColor = '#C8A96A'; e.target.style.background = '#fff'; }}
              onBlur={e => { e.target.style.borderColor = '#EDE8E3'; e.target.style.background = '#F5F0EB'; }}
            />
          </div>
        )}

        {/* Notification */}
        <div className="relative">
          <button onClick={() => setShowNotif(!showNotif)}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
            style={{ background: showNotif ? '#F5F0EB' : 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F5F0EB'}
            onMouseLeave={e => { if (!showNotif) e.currentTarget.style.background = 'transparent'; }}>
            <BsBell size={18} style={{ color: '#5C4F45' }} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
              style={{ background: '#C8A96A', borderColor: '#FFFFFF' }} />
          </button>

          {showNotif && (
            <div className="absolute right-0 top-full mt-2 rounded-2xl shadow-xl z-50 overflow-hidden"
              style={{ background: '#fff', border: '1px solid #EDE8E3', width: '288px' }}>
              <div className="px-4 py-3 flex items-center justify-between"
                style={{ borderBottom: '1px solid #F5F0EB', background: '#FAFAF8' }}>
                <p className="text-sm font-bold" style={{ color: '#1A1614' }}>Notifications</p>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: '#F5EDD8', color: '#8A6D2F' }}>
                  {notifications.filter(n => n.unread).length} new
                </span>
              </div>
              {notifications.map((n, i) => (
                <div key={n.id} className="px-4 py-3 cursor-pointer transition-colors"
                  style={{ borderTop: i > 0 ? '1px solid #F5F0EB' : 'none', background: n.unread ? '#FAFAF8' : '#fff' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F5F0EB'}
                  onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#FAFAF8' : '#fff'}>
                  <div className="flex items-start gap-3">
                    <span className="text-base flex-shrink-0 mt-0.5">{n.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-medium leading-snug" style={{ color: '#1A1614' }}>{n.text}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#8C7B6B' }}>{n.time}</p>
                    </div>
                    {n.unread && <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ background: '#C8A96A' }} />}
                  </div>
                </div>
              ))}
              <div className="px-4 py-2.5 text-center" style={{ borderTop: '1px solid #F5F0EB' }}>
                <button className="text-xs font-semibold" style={{ color: '#8A6D2F' }}>
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 mx-1" style={{ background: '#EDE8E3' }} />

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-1 cursor-pointer rounded-xl px-2 py-1 transition-colors"
          onMouseEnter={e => e.currentTarget.style.background = '#F5F0EB'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
            style={{ background: '#1A1614', color: '#C8A96A' }}>A</div>
          <div className="hidden sm:block">
            <p className="text-xs font-bold leading-none" style={{ color: '#1A1614' }}>Admin</p>
            <p className="text-xs mt-0.5" style={{ color: '#8C7B6B' }}>Super Admin</p>
          </div>
          <BsChevronDown size={10} style={{ color: '#8C7B6B' }} className="hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
