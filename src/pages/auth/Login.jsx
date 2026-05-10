import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../../utils/auth';
import { BsEye, BsEyeSlash, BsExclamationTriangle } from 'react-icons/bs';

/* palette */
const C = {
  text:    '#1A1614',
  muted:   '#8C7B6B',
  label:   '#5C4F45',
  accent:  '#C8A96A',
  border:  '#EDE8E3',
  input:   '#FAFAF8',
  primary: '#1A1614',
};

const inputBase = {
  background: C.input,
  border: `1.5px solid ${C.border}`,
  color: C.text,
  borderRadius: '12px',
  padding: '11px 16px',
  fontSize: '14px',
  width: '100%',
  outline: 'none',
  transition: 'all 0.15s',
};

export default function Login() {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  function handleChange(e) {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    if (error) setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!dataForm.username || !dataForm.password) {
      setError('Username dan password wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', {
        username: dataForm.username,
        password: dataForm.password,
        expiresInMins: 60,
      });
      setToken(res.data.accessToken);
      navigate('/');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Username atau password salah.');
      } else if (err.response?.status === 400) {
        setError('Username dan password wajib diisi.');
      } else {
        setError('Login gagal. Periksa koneksi dan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2.5 text-xs rounded-xl px-4 py-3 mb-5"
          style={{ background: '#FDF0EE', color: '#8A3A2A', border: '1px solid #F5C4BC' }}>
          <BsExclamationTriangle size={13} className="flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Loading banner */}
      {loading && (
        <div className="flex items-center gap-2.5 text-xs rounded-xl px-4 py-3 mb-5"
          style={{ background: '#F5F0EB', color: '#8C7B6B', border: `1px solid ${C.border}` }}>
          <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
          Mohon Tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: C.label }}>
            Username atau Email
          </label>
          <input
            type="text"
            name="username"
            value={dataForm.username}
            onChange={handleChange}
            placeholder="Masukkan username"
            required
            style={inputBase}
            onFocus={e => { e.target.style.borderColor = C.accent; e.target.style.background = '#fff'; }}
            onBlur={e => { e.target.style.borderColor = C.border; e.target.style.background = C.input; }}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: C.label }}>
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              required
              style={{ ...inputBase, paddingRight: '44px' }}
              onFocus={e => { e.target.style.borderColor = C.accent; e.target.style.background = '#fff'; }}
              onBlur={e => { e.target.style.borderColor = C.border; e.target.style.background = C.input; }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: C.muted }}
              onMouseEnter={e => e.currentTarget.style.color = C.accent}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}
            >
              {showPass ? <BsEyeSlash size={16} /> : <BsEye size={16} />}
            </button>
          </div>
          <div className="flex justify-end mt-1.5">
            <Link to="/forgot" className="text-xs font-medium hover:underline"
              style={{ color: C.accent }}>
              Lupa password?
            </Link>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mt-1"
          style={{ background: C.primary, color: C.accent, letterSpacing: '0.1em' }}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Mohon Tunggu...
            </>
          ) : 'Masuk'}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px" style={{ background: C.border }} />
        <span className="text-xs" style={{ color: C.muted }}>atau masuk dengan</span>
        <div className="flex-1 h-px" style={{ background: C.border }} />
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          type="button"
          onClick={() => setDataForm({ username: 'emilys', password: 'emilyspass' })}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all hover:shadow-sm"
          style={{ background: C.input, border: `1.5px solid ${C.border}`, color: C.label }}
          title="Autofill demo credentials"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#4267B2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all hover:shadow-sm"
          style={{ background: C.input, border: `1.5px solid ${C.border}`, color: C.label }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
      </div>

      {/* Register link */}
      <p className="text-center text-xs" style={{ color: C.muted }}>
        Belum punya akun?{' '}
        <Link to="/register" className="font-bold hover:underline" style={{ color: C.accent }}>
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}
