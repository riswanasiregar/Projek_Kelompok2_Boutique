import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate('/login');
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Search */}
      <div className="relative">
        {showSearch ? (
          <input
            autoFocus
            type="text"
            placeholder="Search..."
            onBlur={() => setShowSearch(false)}
            className="border border-gray-300 rounded-lg px-4 py-1.5 text-sm focus:outline-none focus:border-rose-400 w-64"
          />
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
          >
            <span>🔍</span>
            <span>Search...</span>
          </button>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative text-gray-500 hover:text-rose-500 transition-colors">
          <span className="text-xl">🔔</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowSetting(!showSetting)}
            className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
          >
            <img
              src="/img/profile.jpg"
              alt="Admin"
              className="w-8 h-8 rounded-full object-cover border-2 border-rose-200"
              onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Admin&background=f43f5e&color=fff'; }}
            />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">Admin</p>
              <p className="text-xs text-gray-400">Boutique</p>
            </div>
            <span className="text-gray-400 text-xs">▼</span>
          </button>

          {showSetting && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
