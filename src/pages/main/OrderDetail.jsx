import { useParams, useNavigate, Link } from 'react-router-dom';
import ordersData from '../../data/orders.json';
import customersData from '../../data/customers.json';
import { StatusBadge } from './Orders';
import { LoyaltyBadge } from './Customers';
import PageHeader from '../../components/PageHeader';

const P = { text: '#3d2e22', muted: '#9a8878', accent: '#c9a96e', surface: '#ede5d8', border: '#e2d9ce' };

// Data produk dummy per order (simulasi item dalam order)
const orderItemsMap = {
  'ORD-001': [{ name: 'Floral Midi Dress', qty: 1, price: 89000 }, { name: 'Pastel Cardigan', qty: 1, price: 61000 }],
  'ORD-002': [{ name: 'Linen Blouse', qty: 1, price: 75000 }],
  'ORD-003': [{ name: 'Summer Shorts', qty: 2, price: 20000 }],
  'ORD-004': [{ name: 'Evening Gown', qty: 1, price: 150000 }, { name: 'Silk Scarf', qty: 1, price: 50000 }],
  'ORD-005': [{ name: 'Casual Tee', qty: 3, price: 31667 }],
};

function getOrderItems(orderId) {
  if (orderItemsMap[orderId]) return orderItemsMap[orderId];
  // generate dummy items untuk order lain
  return [
    { name: 'Boutique Item A', qty: 1, price: Math.floor(Math.random() * 80000) + 20000 },
    { name: 'Boutique Item B', qty: 1, price: Math.floor(Math.random() * 60000) + 15000 },
  ];
}

const statusTimeline = {
  Completed: [
    { label: 'Order Diterima', done: true, time: 'Hari ke-1' },
    { label: 'Diproses', done: true, time: 'Hari ke-1' },
    { label: 'Dikirim', done: true, time: 'Hari ke-2' },
    { label: 'Selesai', done: true, time: 'Hari ke-3' },
  ],
  Pending: [
    { label: 'Order Diterima', done: true, time: 'Hari ke-1' },
    { label: 'Diproses', done: true, time: 'Hari ke-1' },
    { label: 'Dikirim', done: false, time: 'Menunggu' },
    { label: 'Selesai', done: false, time: '-' },
  ],
  Cancelled: [
    { label: 'Order Diterima', done: true, time: 'Hari ke-1' },
    { label: 'Dibatalkan', done: true, time: 'Hari ke-1', cancelled: true },
  ],
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = ordersData.find(o => o.id === id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="text-5xl">🛍️</div>
        <p className="text-lg font-bold" style={{ color: P.text }}>Order tidak ditemukan</p>
        <p className="text-sm" style={{ color: P.muted }}>ID <span className="font-mono">{id}</span> tidak ada dalam data.</p>
        <button onClick={() => navigate('/orders')}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold mt-2"
          style={{ background: '#3d2e22', color: '#c9a96e' }}>
          ← Kembali ke Orders
        </button>
      </div>
    );
  }

  const customer = customersData.find(
    c => c.name.toLowerCase() === order.customerName.toLowerCase()
  );
  const items = getOrderItems(order.id);
  const timeline = statusTimeline[order.status] || statusTimeline.Pending;

  return (
    <div>
      <PageHeader
        title="Order Detail"
        breadcrumb={['Dashboard', 'Orders', order.id]}
      >
        <button onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl"
          style={{ background: '#ede5d8', color: '#6b5040', border: '1px solid #d4c4b0' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Kolom kiri ── */}
        <div className="lg:col-span-1 space-y-4">

          {/* Info order */}
          <div className="rounded-2xl p-5" style={{ background: '#fff', border: `1px solid ${P.border}` }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs" style={{ color: P.muted }}>Order ID</p>
                <p className="text-lg font-bold font-mono" style={{ color: P.text }}>{order.id}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="space-y-2">
              {[
                { label: 'Tanggal Order', value: order.orderDate },
                { label: 'Customer', value: order.customerName },
                { label: 'Metode Bayar', value: 'Transfer Bank' },
                { label: 'Pengiriman', value: 'JNE Regular' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2"
                  style={{ borderBottom: '1px solid #f5f0eb' }}>
                  <span className="text-xs" style={{ color: P.muted }}>{item.label}</span>
                  <span className="text-xs font-semibold" style={{ color: P.text }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info customer */}
          {customer && (
            <div className="rounded-2xl p-5" style={{ background: '#fff', border: `1px solid ${P.border}` }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: P.muted }}>Customer</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
                  style={{ background: '#ede5d8', color: '#6b5040' }}>
                  {customer.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: P.text }}>{customer.name}</p>
                  <p className="text-xs" style={{ color: P.muted }}>{customer.id}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <LoyaltyBadge loyalty={customer.loyalty} />
                <Link
                  to={`/customers/${customer.id}`}
                  className="text-xs font-semibold hover:underline"
                  style={{ color: '#8b7355' }}>
                  Lihat profil →
                </Link>
              </div>
              <p className="text-xs" style={{ color: P.muted }}>{customer.email}</p>
              <p className="text-xs mt-0.5" style={{ color: P.muted }}>{customer.phone}</p>
            </div>
          )}

          {/* Timeline status */}
          <div className="rounded-2xl p-5" style={{ background: '#fff', border: `1px solid ${P.border}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: P.muted }}>Status Timeline</p>
            <div className="space-y-0">
              {timeline.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                      style={{
                        background: step.cancelled ? '#f5eeec' : step.done ? '#3d2e22' : '#f0ebe4',
                        color: step.cancelled ? '#8a4a3a' : step.done ? '#c9a96e' : '#b8a898',
                        border: step.done ? 'none' : '1.5px dashed #d4c4b0',
                      }}>
                      {step.cancelled ? '✕' : step.done ? '✓' : '○'}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 my-1"
                        style={{ background: step.done ? '#3d2e22' : '#e2d9ce', minHeight: '16px' }} />
                    )}
                  </div>
                  <div className="pb-3">
                    <p className="text-xs font-semibold" style={{ color: step.done ? P.text : P.muted }}>{step.label}</p>
                    <p className="text-xs" style={{ color: P.muted }}>{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Kolom kanan: item order ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Daftar item */}
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: `1px solid ${P.border}` }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #f0ebe4', background: '#faf7f4' }}>
              <p className="text-sm font-bold" style={{ color: P.text }}>Item Pesanan</p>
              <p className="text-xs" style={{ color: P.muted }}>{items.length} produk</p>
            </div>
            <div className="divide-y">
              {items.map((item, i) => (
                <div key={i} className="px-5 py-4 flex items-center justify-between"
                  style={{ borderTop: i > 0 ? '1px solid #f5f0eb' : 'none' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: '#f5f0eb' }}>
                      <svg className="w-5 h-5" fill="none" stroke="#8b7355" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: P.text }}>{item.name}</p>
                      <p className="text-xs" style={{ color: P.muted }}>Qty: {item.qty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ color: P.text }}>
                      Rp {(item.price * item.qty).toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs" style={{ color: P.muted }}>
                      @ Rp {item.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ringkasan harga */}
            <div className="px-5 py-4 space-y-2" style={{ borderTop: '1px solid #f0ebe4', background: '#faf7f4' }}>
              {[
                { label: 'Subtotal', value: order.totalPrice - 15000 },
                { label: 'Ongkos Kirim', value: 15000 },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: P.muted }}>{row.label}</span>
                  <span className="text-xs font-semibold" style={{ color: P.text }}>
                    Rp {row.value.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2"
                style={{ borderTop: '1px solid #e2d9ce' }}>
                <span className="text-sm font-bold" style={{ color: P.text }}>Total</span>
                <span className="text-base font-bold" style={{ color: '#4a7c59' }}>
                  Rp {order.totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Alamat pengiriman (dummy) */}
          <div className="rounded-2xl p-5" style={{ background: '#fff', border: `1px solid ${P.border}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: P.muted }}>Alamat Pengiriman</p>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: '#f5f0eb' }}>
                <svg className="w-4 h-4" fill="none" stroke="#8b7355" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: P.text }}>{order.customerName}</p>
                <p className="text-xs mt-0.5" style={{ color: P.muted }}>
                  Jl. Boutique No. {order.id.replace('ORD-', '')}, Kec. Menteng<br />
                  Jakarta Pusat, DKI Jakarta 10310
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
