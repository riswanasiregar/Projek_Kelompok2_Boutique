import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#f5f0eb' }}>
      <div className="text-center max-w-lg">
        {/* Decorative circles */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-64 h-64 rounded-full opacity-10" style={{ background: '#c9a96e' }} />
          <div className="absolute w-48 h-48 rounded-full opacity-15" style={{ background: '#c9a96e' }} />
          <div className="absolute w-32 h-32 rounded-full opacity-20" style={{ background: '#c9a96e' }} />
          <div className="relative z-10">
            <h1 className="text-9xl font-bold leading-none" style={{ color: '#3d2e22', opacity: 0.15 }}>404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-7xl font-bold" style={{ color: '#6b5040' }}>404</h1>
            </div>
          </div>
        </div>

        <div className="w-32 h-32 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          style={{ background: '#ede5d8', border: '2px solid #d4c4b0' }}>
          <span className="text-5xl">🔍</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
          style={{ background: '#ede5d8', border: '1px solid #d4c4b0' }}>
          <span className="text-xs" style={{ color: '#c9a96e' }}>✦</span>
          <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#8b7355' }}>
            Boutique · Page Not Found
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-2" style={{ color: '#3d2e22' }}>Oops! Page Not Found</h2>
        <p className="text-sm mb-8 max-w-xs mx-auto leading-relaxed" style={{ color: '#9a8878' }}>
          Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: '#3d2e22', color: '#c9a96e' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Dashboard
          </button>
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm"
            style={{ background: '#ede5d8', color: '#6b5040', border: '1.5px solid #d4c4b0' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          {['Dress', 'Top', 'Bottom', 'Outerwear'].map(cat => (
            <span key={cat} className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: '#ede5d8', color: '#9a8878', border: '1px solid #d4c4b0' }}>
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
