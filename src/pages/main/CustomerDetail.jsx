import { useParams, useNavigate, Link } from 'react-router-dom';
import customersData from '../../data/customers.json';
import ordersData from '../../data/orders.json';
import { LoyaltyBadge } from './Customers';
import { StatusBadge } from './Orders';
import PageHeader from '../../components/PageHeader';

const P = { text: '#3d2e22', muted: '#9a8878', accent: '#c9a96e', surface: '#ede5d8', border: '#e2d9ce' };

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const customer = customersData.find(c => c.id === id);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="text-5xl">👤</div>
        <p className="text-lg font-bold" style={{ color: P.text }}>Customer tidak ditemukan</p>
        <p className="text-sm" style={{ color: P.muted }}>ID <span className="font-mono">{id}</span> tidak ada dalam data.</p>
        <button onClick={() => navigate('/customers')}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold mt-2"
          style={{ background: '#3d2e22', color: '#c9a96e' }}>
          ← Kembali ke Customers
        </button>
      </div>
    );
  }

  // Ambil semua order milik customer ini
  const customerOrders = ordersData.filter(o =>
    o.customerName.toLowerCase() === customer.name.toLowerCase()
  );

  const totalSpend = customerOrders
    .filter(o => o.status === 'Completed')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const loyaltyColor = {
    Gold:   { bg: '#f7f3e8', color: '#8a6d2f', ring: '#c9a96e' },
    Silver: { bg: '#f0f4f8', color: '#4a6080', ring: '#8ab0c8' },
    Bronze: { bg: '#f5eeec', color: '#8a5a4a', ring: '#c9906e' },
  }[customer.loyalty] || { bg: '#f5f0eb', color: '#8b7355', ring: '#d4c4b0' };

  return (
    <div>
      <PageHeader
        title="Customer Detail"
        breadcrumb={['Dashboard', 'Customers', customer.name]}
      >
        <button onClick={() => navigate('/customers')}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl"
          style={{ background: '#ede5d8', color: '#6b5040', border: '1px solid #d4c4b0' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Kolom kiri: profil ── */}
        <div className="lg:col-span-1 space-y-4">

          {/* Card profil */}
          <div className="rounded-2xl p-6 text-center"
            style={{ background: '#fff', border: `1px solid ${P.border}` }}>
            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto"
                style={{ background: loyaltyColor.bg, color: loyaltyColor.color, border: `3px solid ${loyaltyColor.ring}` }}>
                {customer.name[0]}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ background: '#3d2e22', color: '#c9a96e', border: '2px solid #fff' }}>
                ✓
              </div>
            </div>

            <h2 className="text-lg font-bold mb-1" style={{ color: P.text }}>{customer.name}</h2>
            <p className="text-xs mb-3" style={{ color: P.muted }}>{customer.id}</p>
            <div className="flex justify-center mb-4">
              <LoyaltyBadge loyalty={customer.loyalty} />
            </div>

            {/* Kontak */}
            <div className="space-y-2 text-left">
              {[
                { icon: '✉️', label: 'Email', value: customer.email },
                { icon: '📞', label: 'Phone', value: customer.phone },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: '#faf7f4' }}>
                  <span className="text-sm">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs" style={{ color: P.muted }}>{item.label}</p>
                    <p className="text-xs font-semibold truncate" style={{ color: P.text }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistik */}
          <div className="rounded-2xl p-5" style={{ background: '#fff', border: `1px solid ${P.border}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: P.muted }}>Statistik</p>
            <div className="space-y-3">
              {[
                { label: 'Total Orders', value: customerOrders.length, icon: '🛍️' },
                { label: 'Completed', value: customerOrders.filter(o => o.status === 'Completed').length, icon: '✅' },
                { label: 'Pending', value: customerOrders.filter(o => o.status === 'Pending').length, icon: '⏳' },
                { label: 'Cancelled', value: customerOrders.filter(o => o.status === 'Cancelled').length, icon: '❌' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{s.icon}</span>
                    <span className="text-xs" style={{ color: P.muted }}>{s.label}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: P.text }}>{s.value}</span>
                </div>
              ))}
              <div className="pt-2 mt-1" style={{ borderTop: '1px solid #f0ebe4' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: P.muted }}>Total Belanja</span>
                  <span className="text-sm font-bold" style={{ color: '#4a7c59' }}>
                    Rp {totalSpend.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Kolom kanan: riwayat order ── */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: `1px solid ${P.border}` }}>
            <div className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid #f0ebe4', background: '#faf7f4' }}>
              <div>
                <p className="text-sm font-bold" style={{ color: P.text }}>Riwayat Order</p>
                <p className="text-xs" style={{ color: P.muted }}>{customerOrders.length} transaksi ditemukan</p>
              </div>
              <Link to="/orders"
                className="text-xs font-semibold hover:underline"
                style={{ color: '#8b7355' }}>
                Lihat semua →
              </Link>
            </div>

            {customerOrders.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-3xl mb-3">🛍️</p>
                <p className="text-sm font-medium" style={{ color: P.muted }}>Belum ada order</p>
              </div>
            ) : (
              <div className="divide-y" style={{ '--tw-divide-opacity': 1 }}>
                {customerOrders.map((order, i) => (
                  <div key={order.id} className="px-5 py-4 flex items-center justify-between transition-colors"
                    style={{ borderTop: i > 0 ? '1px solid #f5f0eb' : 'none' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#faf7f4'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: '#f5f0eb' }}>
                        <svg className="w-4 h-4" fill="none" stroke="#8b7355" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: P.text }}>{order.id}</p>
                        <p className="text-xs" style={{ color: P.muted }}>{order.orderDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={order.status} />
                      <p className="text-sm font-bold w-28 text-right" style={{ color: P.text }}>
                        Rp {order.totalPrice.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total footer */}
            {customerOrders.length > 0 && (
              <div className="px-5 py-3 flex items-center justify-between"
                style={{ borderTop: '1px solid #f0ebe4', background: '#faf7f4' }}>
                <p className="text-xs font-semibold" style={{ color: P.muted }}>
                  Total dari {customerOrders.filter(o => o.status === 'Completed').length} order selesai
                </p>
                <p className="text-sm font-bold" style={{ color: '#4a7c59' }}>
                  Rp {totalSpend.toLocaleString('id-ID')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
