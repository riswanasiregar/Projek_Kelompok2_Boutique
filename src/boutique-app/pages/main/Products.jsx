import { useState } from 'react';
import PageHeader from '../../components/PageHeader';

const initialProducts = [
  { id: 'PRD-001', name: 'Floral Summer Dress', category: 'Dress', price: 350000, stock: 15 },
  { id: 'PRD-002', name: 'Classic White Blouse', category: 'Top', price: 180000, stock: 30 },
  { id: 'PRD-003', name: 'High-Waist Trousers', category: 'Bottom', price: 275000, stock: 20 },
  { id: 'PRD-004', name: 'Knit Cardigan', category: 'Outerwear', price: 420000, stock: 12 },
  { id: 'PRD-005', name: 'Silk Midi Skirt', category: 'Bottom', price: 310000, stock: 18 },
  { id: 'PRD-006', name: 'Linen Blazer', category: 'Outerwear', price: 580000, stock: 8 },
  { id: 'PRD-007', name: 'Wrap Maxi Dress', category: 'Dress', price: 450000, stock: 10 },
  { id: 'PRD-008', name: 'Crop Cami Top', category: 'Top', price: 120000, stock: 25 },
  { id: 'PRD-009', name: 'Wide Leg Jeans', category: 'Bottom', price: 390000, stock: 14 },
  { id: 'PRD-010', name: 'Trench Coat', category: 'Outerwear', price: 850000, stock: 5 },
];

const emptyForm = { name: '', category: 'Dress', price: '', stock: '' };

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newId = `PRD-${String(products.length + 1).padStart(3, '0')}`;
    const newProduct = {
      id: newId,
      name: form.name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
    };
    setProducts([newProduct, ...products]);
    setForm(emptyForm);
    setShowForm(false);
  }

  return (
    <div>
      <PageHeader title="Products" breadcrumb={['Dashboard', 'Products']}>
        <button
          onClick={() => setShowForm(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Add Product
        </button>
      </PageHeader>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Product ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-right">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-mono text-gray-600">{p.id}</td>
                  <td className="px-6 py-3 text-gray-800 font-medium">{p.name}</td>
                  <td className="px-6 py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-600">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right text-gray-800">
                    Rp {p.price.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span className={`font-medium ${p.stock <= 5 ? 'text-red-600' : 'text-gray-700'}`}>
                      {p.stock}
                    </span>
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
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                >
                  <option>Dress</option>
                  <option>Top</option>
                  <option>Bottom</option>
                  <option>Outerwear</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rp)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                />
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
