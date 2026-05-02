import { useState } from 'react';
import customersData from '../../data/customers.json';
import PageHeader from '../../components/PageHeader';

export function LoyaltyBadge({ loyalty }) {
  const styles = {
    Gold: 'bg-yellow-100 text-yellow-700',
    Silver: 'bg-gray-100 text-gray-600',
    Bronze: 'bg-orange-100 text-orange-700',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[loyalty] || 'bg-gray-100 text-gray-600'}`}>
      {loyalty}
    </span>
  );
}

const emptyForm = { name: '', email: '', phone: '', loyalty: 'Bronze' };

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newId = `CUST-${String(customers.length + 1).padStart(3, '0')}`;
    const newCustomer = { id: newId, ...form };
    setCustomers([newCustomer, ...customers]);
    setForm(emptyForm);
    setShowForm(false);
  }

  return (
    <div>
      <PageHeader title="Customers" breadcrumb={['Dashboard', 'Customers']}>
        <button
          onClick={() => setShowForm(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Add Customer
        </button>
      </PageHeader>

      <p className="text-sm text-gray-500 mb-4">Total: <span className="font-semibold text-gray-700">{customers.length}</span> customers</p>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Customer ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Loyalty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-mono text-gray-600">{c.id}</td>
                  <td className="px-6 py-3 text-gray-800 font-medium">{c.name}</td>
                  <td className="px-6 py-3 text-gray-500">{c.email}</td>
                  <td className="px-6 py-3 text-gray-500">{c.phone}</td>
                  <td className="px-6 py-3">
                    <LoyaltyBadge loyalty={c.loyalty} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Customer</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loyalty Tier</label>
                <select
                  name="loyalty"
                  value={form.loyalty}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                >
                  <option>Bronze</option>
                  <option>Silver</option>
                  <option>Gold</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setForm(emptyForm); }}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
