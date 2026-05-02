import { useNavigate } from 'react-router-dom';

export default function ErrorPage({
  code,
  title,
  description,
  image,
  bgColor = '#fce7f3',
  codeColor = '#f43f5e',
  btnColor = '#f43f5e',
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        {/* Error code */}
        <h1 className="text-8xl font-bold mb-4" style={{ color: codeColor }}>
          {code}
        </h1>

        {/* Image */}
        {image && (
          <div
            className="w-48 h-48 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: bgColor }}
          >
            <img src={image} alt={`Error ${code}`} className="w-36 h-36 object-contain" />
          </div>
        )}

        {/* Title & description */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        {description && <p className="text-gray-500 text-sm mb-6">{description}</p>}

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 text-white rounded-lg font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: btnColor }}
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
