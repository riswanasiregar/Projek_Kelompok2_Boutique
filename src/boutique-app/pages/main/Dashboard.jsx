import { Link } from 'react-router-dom';
import ordersData from '../../data/orders.json';
import customersData from '../../data/customers.json';
import PageHeader from '../../components/PageHeader';

function StatusBadge({ status }) {
  const styles = {
    Completed: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Cancelled: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

export function computeStats(orders, customers) {
  const totalOrders = orders.length;
  const totalDelivered = orders.filter((o) => o.status === 'Completed').length;
  const totalCancelled = orders.filter((o) => o.status === 'Cancelled').length;
  const totalRevenue = orders
    .filter((o) => o.status === 'Completed')
    .reduce((sum, o) => sum + o.totalPrice, 0);
  const totalCustomers = customers.length;
  return { totalOrders, totalDelivered, totalCancelled, totalRevenue, totalCustomers };
}

export function getRecentOrders(orders) {
  return [...orders].reverse().slice(0, 5);
}

export default function Dashboard() {
  const stats = computeStats(ordersData, customersData);
  const recentOrders = getRecentOrders(ordersData);

  const statCards = [
    { label: 'Total Orders', value: stats.totalOrders, icon: '📦', color: 'bg-blue-50 text-blue-600' },
    { label: 'Delivered', value: stats.totalDelivered, icon: '✅', color: 'bg-green-50 text-green-600' },
    { label: 'Cancelled', value: stats.totalCancelled, icon: '❌', color: 'bg-red-50 text-red-600' },
    {
      label: 'Revenue',
      value: `Rp ${stats.totalRevenue.toLocaleString('id-ID')}`,
      icon: '💰',
      color: 'bg-rose-50 text-rose-600',
    },
    { label: 'Customers', value: stats.totalCustomers, icon: '👥', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" breadcrumb={['Dashboard', 'Overview']} />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3 ${card.color}`}>
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Recent Orders</h2>
          <Link to="/orders" className="text-sm text-rose-500 hover:text-rose-600 font-medium">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-mono text-gray-600">{order.id}</td>
                  <td className="px-6 py-3 text-gray-800">{order.customerName}</td>
                  <td className="px-6 py-3 text-gray-500">{order.orderDate}</td>
                  <td className="px-6 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-gray-800">
                    Rp {order.totalPrice.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
