import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [dataForm, setDataForm] = useState({ email: '', password: '', confirmPassword: '' });

  function handleChange(e) {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // UI only — no submit logic
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Create account</h2>
      <p className="text-sm text-gray-500 mb-6">Join Boutique admin panel</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={dataForm.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="text-rose-500 hover:text-rose-600 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
