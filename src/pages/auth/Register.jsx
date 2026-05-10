import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash, BsPerson, BsEnvelope, BsLock } from 'react-icons/bs';

/* palette — sama persis dengan Login */
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

export default function Register() {
  const [dataForm, setDataForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
  });
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors]           = useState({});

  function handleChange(e) {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  }

  function validate() {
    const e = {};
    if (!dataForm.fullName.trim())  e.fullName = 'Nama lengkap wajib diisi.';
    if (!dataForm.email.trim())     e.email    = 'Email wajib diisi.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataForm.email))
                                    e.email    = 'Format email tidak valid.';
    if (!dataForm.password)         e.password = 'Password wajib diisi.';
    else if (dataForm.password.length < 6)
                                    e.password = 'Password minimal 6 karakter.';
    if (!dataForm.confirmPassword)  e.confirmPassword = 'Konfirmasi password wajib diisi.';
    else if (dataForm.password !== dataForm.confirmPassword)
                                    e.confirmPassword = 'Password tidak cocok.';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    alert('Register berhasil!');
  }

  /* reusable field error */
  const FieldError = ({ name }) => errors[name]
    ? <p className="text-xs mt-1" style={{ color: '#8A3A2A' }}>⚠ {errors[name]}</p>
    : null;

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
          style={{ background: '#F5F0EB', border: `1px solid ${C.border}` }}>
          <span style={{ color: C.accent, fontSize: '9px' }}>✦</span>
          <span className="text-xs font-medium" style={{ color: C.muted }}>New Account</span>
        </div>
        <h2 className="text-xl font-bold mb-0.5" style={{ color: C.text }}>Create Account</h2>
        <p className="text-xs" style={{ color: C.muted }}>Join the Boutique admin panel</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: C.label }}>
            Full Name
          </label>
          <div className="relative">
            <BsPerson size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: errors.fullName ? '#8A3A2A' : C.muted }} />
            <input
              type="text" name="fullName" value={dataForm.fullName}
              onChange={handleChange} placeholder="Nama lengkap" required
              style={{
                ...inputBase,
                paddingLeft: '36px',
                borderColor: errors.fullName ? '#F5C4BC' : C.border,
              }}
              onFocus={e => { e.target.style.borderColor = C.accent; e.target.style.background = '#fff'; }}
              onBlur={e => {
                e.target.style.borderColor = errors.fullName ? '#F5C4BC' : C.border;
                e.target.style.background = C.input;
              }}
            />
          </div>
          <FieldError name="fullName" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: C.label }}>
            Email
          </label>
          <div className="relative">
            <BsEnvelope size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: errors.email ? '#8A3A2A' : C.muted }} />
            <input
              type="text" name="email" value={dataForm.email}
              onChange={handleChange} placeholder="your@email.com" required
              style={{
                ...inputBase,
                paddingLeft: '36px',
                borderColor: errors.email ? '#F5C4BC' : C.border,
              }}
              onFocus={e => { e.target.style.borderColor = C.accent; e.target.style.background = '#fff'; }}
              onBlur={e => {
                e.target.style.borderColor = errors.email ? '#F5C4BC' : C.border;
                e.target.style.background = C.input;
              }}
            />
          </div>
          <FieldError name="email" />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: C.label }}>
            Password
          </label>
          <div className="relative">
            <BsLock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: errors.password ? '#8A3A2A' : C.muted }} />
            <input
              type={showPass ? 'text' : 'password'}
              name="password" value={dataForm.password}
              onChange={handleChange} placeholder="Min. 6 karakter" required
              style={{
                ...inputBase,
                paddingLeft: '36px',
                paddingRight: '44px',
                borderColor: errors.password ? '#F5C4BC' : C.border,
              }}
              onFocus={e => { e.target.style.borderColor = C.accent; e.target.style.background = '#fff'; }}
              onBlur={e => {
                e.target.style.borderColor = errors.password ? '#F5C4BC' : C.border;
                e.target.style.background = C.input;
              }}
            />
            <button
              type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: C.muted }}
              onMouseEnter={e => e.currentTarget.style.color = C.accent}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}
            >
              {showPass ? <BsEyeSlash size={16} /> : <BsEye size={16} />}
            </button>
          </div>
          <FieldError name="password" />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: C.label }}>
            Confirm Password
          </label>
          <div className="relative">
            <BsLock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: errors.confirmPassword ? '#8A3A2A' : C.muted }} />
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword" value={dataForm.confirmPassword}
              onChange={handleChange} placeholder="Ulangi password" required
              style={{
                ...inputBase,
                paddingLeft: '36px',
                paddingRight: '44px',
                borderColor: errors.confirmPassword ? '#F5C4BC' : C.border,
              }}
              onFocus={e => { e.target.style.borderColor = C.accent; e.target.style.background = '#fff'; }}
              onBlur={e => {
                e.target.style.borderColor = errors.confirmPassword ? '#F5C4BC' : C.border;
                e.target.style.background = C.input;
              }}
            />
            <button
              type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: C.muted }}
              onMouseEnter={e => e.currentTarget.style.color = C.accent}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}
            >
              {showConfirm ? <BsEyeSlash size={16} /> : <BsEye size={16} />}
            </button>
          </div>
          <FieldError name="confirmPassword" />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-opacity hover:opacity-90 mt-1"
          style={{ background: C.primary, color: C.accent, letterSpacing: '0.1em' }}
        >
          Buat Akun
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px" style={{ background: C.border }} />
        <span className="text-xs" style={{ color: C.muted }}>atau</span>
        <div className="flex-1 h-px" style={{ background: C.border }} />
      </div>

      {/* Login link */}
      <p className="text-center text-xs" style={{ color: C.muted }}>
        Sudah punya akun?{' '}
        <Link to="/login" className="font-bold hover:underline" style={{ color: C.accent }}>
          Masuk
        </Link>
      </p>
    </div>
  );
}
