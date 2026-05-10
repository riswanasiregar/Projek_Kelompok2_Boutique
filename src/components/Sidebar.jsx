import { NavLink, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';
import {
  BsHouseDoor, BsClipboardCheck, BsPeopleFill,
  BsBoxArrowRight, BsStars
} from 'react-icons/bs';

const SB = {
  bg:         '#FDFAF6',
  border:     '#EDE8E3',
  logoAccent: '#C8A96A',
  labelText:  '#A89888',
  itemText:   '#6B5C52',
  itemHover:  '#F5EFE8',
  activeBg:   '#F0E8D8',
  activeText: '#8A6D2F',
  activeLine: '#C8A96A',
  userBg:     '#F5EFE8',
  userText:   '#1A1614',
  userSub:    '#A89888',
};

const mainMenu = [
  { to: '/', label: 'Dashboard', end: true, icon: <BsHouseDoor size={16} /> },
  { to: '/orders',    label: 'Orders',    icon: <BsClipboardCheck size={16} /> },
  { to: '/customers', label: 'Customers', icon: <BsPeopleFill size={16} /> },
];

function NavItem({ item }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative"
      style={({ isActive }) =>
        isActive
          ? { background: SB.activeBg, color: SB.activeText }
          : { color: SB.itemText }
      }
      onMouseEnter={e => {
        if (e.currentTarget.style.background !== SB.activeBg)
          e.currentTarget.style.background = SB.itemHover;
      }}
      onMouseLeave={e => {
        if (e.currentTarget.style.background !== SB.activeBg)
          e.currentTarget.style.background = 'transparent';
      }}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
              style={{ background: SB.activeLine }} />
          )}
          <span className="flex-shrink-0" style={{ color: isActive ? SB.activeText : SB.itemText }}>
            {item.icon}
          </span>
          <span className="flex-1">{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  function handleLogout() { removeToken(); navigate('/login'); }

  return (
    <aside className="w-64 min-h-screen flex flex-col"
      style={{ background: SB.bg, borderRight: `1px solid ${SB.border}` }}>

      {/* Logo */}
      <div className="px-5 py-5" style={{ borderBottom: `1px solid ${SB.border}` }}>
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="Boutique Logo"
            className="w-9 h-9 rounded-lg object-contain flex-shrink-0"
            style={{ background: SB.logoAccent, padding: '4px' }} />
          <div>
            <h1 className="text-sm font-bold tracking-widest uppercase leading-none"
              style={{ color: '#1A1614', letterSpacing: '0.12em' }}>
              Boutique
            </h1>
            <p className="text-xs mt-0.5 tracking-wider uppercase"
              style={{ color: SB.labelText, fontSize: '9px', letterSpacing: '0.15em' }}>
              Fashion Admin
            </p>
          </div>
        </div>
      </div>

      {/* Season tag */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: SB.userBg, border: `1px solid ${SB.border}` }}>
          <BsStars size={10} style={{ color: SB.logoAccent }} />
          <span className="text-xs tracking-wider" style={{ color: SB.labelText, fontSize: '10px' }}>
            SS 2026 Collection
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: SB.labelText, fontSize: '9px', letterSpacing: '0.18em' }}>
          Navigation
        </p>
        <div className="space-y-0.5">
          {mainMenu.map(item => <NavItem key={item.to} item={item} />)}
        </div>
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4" style={{ borderTop: `1px solid ${SB.border}` }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1"
          style={{ background: SB.userBg }}>
          <img src="/img/logo.png" alt="Logo"
            className="w-8 h-8 rounded-full object-contain flex-shrink-0"
            style={{ background: SB.logoAccent, padding: '3px' }} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: SB.userText }}>Admin</p>
            <p className="text-xs truncate" style={{ color: SB.userSub, fontSize: '10px' }}>
              boutique@admin.com
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ color: SB.itemText }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#FEE8E8';
            e.currentTarget.style.color = '#C0392B';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = SB.itemText;
          }}
        >
          <BsBoxArrowRight size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
