import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import ordersData from '../../data/orders.json';
import customersData from '../../data/customers.json';
import {
  BsClipboardCheck, BsPeopleFill, BsCurrencyDollar, BsXCircle
} from 'react-icons/bs';

const P = {
  text:    '#1A1614',
  muted:   '#8C7B6B',
  accent:  '#C8A96A',
  border:  '#EDE8E3',
  surface: '#F5F0EB',
};

/* ── Status Badge ── */
function StatusBadge({ status }) {
  const map = {
    Completed: { bg: '#EDFAF3', color: '#2D7A55', dot: '#4AAB7A' },
    Pending:   { bg: '#FDF8EC', color: '#8A6D2F', dot: '#C8A96A' },
    Cancelled: { bg: '#FDF0EE', color: '#8A3A2A', dot: '#C97060' },
  };
  const s = map[status] || { bg: '#F5F0EB', color: '#8C7B6B', dot: '#C8A96A' };
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.color }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
      {status}
    </span>
  );
}

/* ── Mini Calendar ── */
function MiniCalendar() {
  const today = new Date();
  const [cur, setCur] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const year  = cur.getFullYear();
  const month = cur.getMonth();
  const monthName  = cur.toLocaleString('en', { month: 'long' });
  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const cells = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );
  const isToday = d =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="rounded-2xl p-4" style={{ background: '#fff', border: `1px solid ${P.border}` }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold" style={{ color: P.text }}>{monthName} {year}</p>
        <div className="flex gap-1">
          {['‹', '›'].map((ch, i) => (
            <button key={i}
              onClick={() => setCur(new Date(year, month + (i === 0 ? -1 : 1), 1))}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-sm transition-colors"
              style={{ color: P.muted }}
              onMouseEnter={e => e.currentTarget.style.background = P.surface}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {ch}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {days.map(d => (
          <div key={d} className="text-center text-xs font-semibold py-1" style={{ color: P.muted }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((d, i) => (
          <div key={i}
            className="text-center text-xs py-1.5 rounded-lg cursor-pointer transition-colors"
            style={d && isToday(d)
              ? { background: '#1A1614', color: '#C8A96A', fontWeight: 700 }
              : d ? { color: P.text } : {}
            }
            onMouseEnter={e => d && !isToday(d) && (e.currentTarget.style.background = P.surface)}
            onMouseLeave={e => d && !isToday(d) && (e.currentTarget.style.background = 'transparent')}>
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function Dashboard() {
  const { searchQuery = '' } = useOutletContext?.() || {};

  const totalOrders    = ordersData.length;
  const completed      = ordersData.filter(o => o.status === 'Completed').length;
  const pending        = ordersData.filter(o => o.status === 'Pending').length;
  const cancelled      = ordersData.filter(o => o.status === 'Cancelled').length;
  const totalRevenue   = ordersData.filter(o => o.status === 'Completed').reduce((s, o) => s + o.totalPrice, 0);
  const totalCustomers = customersData.length;

  const recentOrders = [...ordersData].reverse().slice(0, 5).filter(o => {
    const q = searchQuery.toLowerCase();
    return !q || o.customerName.toLowerCase().includes(q) || o.id.toLowerCase().includes(q);
  });

  const statCards = [
    { label: 'Total Orders',    value: totalOrders,    sub: `${completed} selesai`,       change: '+12%', up: true,  icon: <BsClipboardCheck size={20} /> },
    { label: 'Total Customers', value: totalCustomers, sub: `${customersData.filter(c => c.loyalty === 'Gold').length} gold members`, change: '+5%',  up: true,  icon: <BsPeopleFill size={20} /> },
    { label: 'Revenue',         value: `Rp ${(totalRevenue / 1000000).toFixed(1)}M`, sub: 'dari order selesai', change: '+18%', up: true,  icon: <BsCurrencyDollar size={20} /> },
    { label: 'Dibatalkan',      value: cancelled,      sub: `${pending} masih pending`,   change: '-3%',  up: false, icon: <BsXCircle size={20} /> },
  ];

  const activities = [
    { text: `${ordersData[ordersData.length - 1].customerName} membuat order baru`,       time: '2m lalu',  icon: '🛍️' },
    { text: `${customersData[customersData.length - 1].name} bergabung sebagai customer`, time: '15m lalu', icon: '👤' },
    { text: `Order ${ordersData[ordersData.length - 3].id} selesai`,                      time: '1j lalu',  icon: '✅' },
    { text: `${ordersData[ordersData.length - 5].customerName} order masih pending`,      time: '2j lalu',  icon: '⏳' },
    { text: `Member Gold baru: ${customersData.find(c => c.loyalty === 'Gold')?.name}`,   time: '3j lalu',  icon: '👑' },
  ];

  return (
    <div className="space-y-5">

      {/* ── Row 1: Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <div key={card.label} className="rounded-2xl p-5 transition-shadow hover:shadow-md"
            style={{ background: '#fff', border: `1px solid ${P.border}` }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: P.surface, color: '#5C4F45' }}>
                {card.icon}
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={card.up
                  ? { background: '#EDFAF3', color: '#2D7A55' }
                  : { background: '#FDF0EE', color: '#8A3A2A' }}>
                {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold leading-none mb-1" style={{ color: P.text }}>{card.value}</p>
            <p className="text-xs font-semibold" style={{ color: P.text }}>{card.label}</p>
            <p className="text-xs mt-0.5" style={{ color: P.muted }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Row 2: Order Status + Loyalty + Calendar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Order Status breakdown */}
        <div className="rounded-2xl p-5" style={{ background: '#fff', border: `1px solid ${P.border}` }}>
          <p className="text-sm font-bold mb-1" style={{ color: P.text }}>Status Pesanan</p>
          <p className="text-xs mb-4" style={{ color: P.muted }}>Ringkasan semua order</p>
          {[
            { label: 'Completed', count: completed,  color: '#4AAB7A', bg: '#EDFAF3', pct: Math.round(completed  / totalOrders * 100) },
            { label: 'Pending',   count: pending,    color: '#C8A96A', bg: '#FDF8EC', pct: Math.round(pending    / totalOrders * 100) },
            { label: 'Cancelled', count: cancelled,  color: '#C97060', bg: '#FDF0EE', pct: Math.round(cancelled  / totalOrders * 100) },
          ].map(item => (
            <div key={item.label} className="mb-4 last:mb-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs font-medium" style={{ color: P.text }}>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: item.bg, color: item.color }}>{item.count}</span>
                  <span className="text-xs" style={{ color: P.muted }}>{item.pct}%</span>
                </div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: P.border }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${item.pct}%`, background: item.color }} />
              </div>
            </div>
          ))}
          {/* Total */}
          <div className="mt-4 pt-3 flex items-center justify-between"
            style={{ borderTop: `1px solid ${P.border}` }}>
            <span className="text-xs font-semibold" style={{ color: P.muted }}>Total Orders</span>
            <span className="text-sm font-bold" style={{ color: P.text }}>{totalOrders}</span>
          </div>
        </div>

        {/* Customer Loyalty */}
        <div className="rounded-2xl p-5" style={{ background: '#fff', border: `1px solid ${P.border}` }}>
          <p className="text-sm font-bold mb-1" style={{ color: P.text }}>Customer Loyalty</p>
          <p className="text-xs mb-4" style={{ color: P.muted }}>Distribusi tier pelanggan</p>
          {[
            { tier: 'Gold',   icon: '👑', color: '#8A6D2F', bg: '#FDF8EC', pct: Math.round(customersData.filter(c => c.loyalty === 'Gold').length   / totalCustomers * 100), count: customersData.filter(c => c.loyalty === 'Gold').length },
            { tier: 'Silver', icon: '⭐', color: '#5C6B7A', bg: '#EEF3F8', pct: Math.round(customersData.filter(c => c.loyalty === 'Silver').length / totalCustomers * 100), count: customersData.filter(c => c.loyalty === 'Silver').length },
            { tier: 'Bronze', icon: '🥉', color: '#7A4A3A', bg: '#FDF0EE', pct: Math.round(customersData.filter(c => c.loyalty === 'Bronze').length / totalCustomers * 100), count: customersData.filter(c => c.loyalty === 'Bronze').length },
          ].map(item => (
            <div key={item.tier} className="mb-4 last:mb-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                    style={{ background: item.bg }}>{item.icon}</span>
                  <span className="text-xs font-medium" style={{ color: P.text }}>{item.tier}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: item.color }}>{item.count} members</span>
                  <span className="text-xs" style={{ color: P.muted }}>{item.pct}%</span>
                </div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: P.border }}>
                <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
              </div>
            </div>
          ))}
          <div className="mt-4 pt-3 flex items-center justify-between"
            style={{ borderTop: `1px solid ${P.border}` }}>
            <span className="text-xs font-semibold" style={{ color: P.muted }}>Total Customers</span>
            <span className="text-sm font-bold" style={{ color: P.text }}>{totalCustomers}</span>
          </div>
        </div>

        {/* Calendar */}
        <MiniCalendar />
      </div>

      {/* ── Row 3: Recent Orders + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Orders table — tanpa date strip */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ background: '#fff', border: `1px solid ${P.border}` }}>
          <div className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: `1px solid ${P.border}`, background: P.surface }}>
            <div>
              <p className="text-sm font-bold" style={{ color: P.text }}>Recent Orders</p>
              <p className="text-xs" style={{ color: P.muted }}>
                {searchQuery ? `Filter: "${searchQuery}"` : '5 transaksi terbaru'}
              </p>
            </div>
            <Link to="/orders"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: '#1A1614', color: '#C8A96A' }}>
              Lihat Semua
            </Link>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: P.surface }}>
                {['Order ID', 'Customer', 'Status', 'Total'].map((h, i) => (
                  <th key={h}
                    className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider ${i === 3 ? 'text-right' : 'text-left'}`}
                    style={{ color: P.muted }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-xs" style={{ color: P.muted }}>
                    Tidak ada order yang cocok
                  </td>
                </tr>
              ) : recentOrders.map((order, i) => (
                <tr key={order.id}
                  style={{ borderTop: i > 0 ? `1px solid #F5F0EB` : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = P.surface}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td className="px-5 py-3.5">
                    <Link to={`/orders/${order.id}`}
                      className="font-mono text-xs px-2 py-0.5 rounded-md hover:underline"
                      style={{ background: P.surface, color: '#8C7B6B' }}>
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: P.border, color: '#5C4F45' }}>
                        {order.customerName[0]}
                      </div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: P.text }}>{order.customerName}</p>
                        <p className="text-xs" style={{ color: P.muted }}>{order.orderDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={order.status} /></td>
                  <td className="px-5 py-3.5 text-right text-xs font-bold" style={{ color: P.text }}>
                    Rp {order.totalPrice.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: `1px solid ${P.border}` }}>
          <div className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: `1px solid ${P.border}`, background: P.surface }}>
            <p className="text-sm font-bold" style={{ color: P.text }}>Aktivitas Terbaru</p>
          </div>
          <div>
            {activities.map((a, i) => (
              <div key={i}
                className="px-5 py-3.5 flex items-start gap-3 transition-colors"
                style={{ borderTop: i > 0 ? `1px solid #F5F0EB` : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = P.surface}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: P.surface }}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium leading-snug" style={{ color: P.text }}>{a.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: P.muted }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="px-5 py-4" style={{ borderTop: `1px solid ${P.border}`, background: P.surface }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: P.muted }}>
              Akses Cepat
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Orders',    to: '/orders',    icon: <BsClipboardCheck size={13} /> },
                { label: 'Customers', to: '/customers', icon: <BsPeopleFill size={13} /> },
              ].map(item => (
                <Link key={item.to} to={item.to}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{ background: '#1A1614', color: '#C8A96A' }}>
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
