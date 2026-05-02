import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-rose-500 mb-4">404</h1>
        <div className="w-32 h-32 bg-rose-50 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-5xl">🔍</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">
          Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium transition-colors text-sm"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
