import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: '#FAFAF8' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-16 h-16 rounded-full border top-8 left-12"   style={{ borderColor: '#EDE8E3' }} />
        <div className="absolute w-8  h-8  rounded-full border top-24 left-48"  style={{ borderColor: '#EDE8E3' }} />
        <div className="absolute w-12 h-12 rounded-full border bottom-16 left-24" style={{ borderColor: '#EDE8E3' }} />
        <div className="absolute w-6  h-6  rounded-full bottom-32 left-64"      style={{ background: '#EDE8E3', opacity: 0.6 }} />
        <div className="absolute w-10 h-10 rounded-full border top-16 right-16" style={{ borderColor: '#EDE8E3' }} />
        <div className="absolute w-6  h-6  rounded-full top-40 right-40"        style={{ background: '#EDE8E3', opacity: 0.5 }} />
        <div className="absolute w-14 h-14 rounded-full border bottom-20 right-20" style={{ borderColor: '#EDE8E3' }} />
        <div className="absolute w-5  h-5  rounded-full bottom-48 right-56"     style={{ background: '#EDE8E3', opacity: 0.4 }} />
        <div className="absolute w-9  h-9  rounded-full border top-1/2 left-8"  style={{ borderColor: '#EDE8E3', opacity: 0.5 }} />
      </div>

      {/* Card */}
      <div
        className="relative z-10 flex w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl"
        style={{ minHeight: '540px' }}
      >
        {/* Left — Form panel */}
        <div
          className="w-full lg:w-[45%] flex flex-col justify-center px-10 py-12"
          style={{ background: '#FFFFFF' }}
        >
          {/* Brand */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/img/logo.png"
                alt="Boutique Logo"
                className="w-10 h-10 rounded-xl object-contain flex-shrink-0"
                style={{ background: '#C8A96A', padding: '5px' }}
              />
              <div>
                <h1 className="text-sm font-bold tracking-widest uppercase leading-none"
                  style={{ color: '#1A1614', letterSpacing: '0.12em' }}>
                  Boutique
                </h1>
                <p className="text-xs mt-0.5" style={{ color: '#A89888', fontSize: '10px' }}>
                  Fashion Admin
                </p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#1A1614' }}>
              Welcome Back
            </h2>
            <p className="text-sm" style={{ color: '#8C7B6B' }}>
              Sign in to your fashion dashboard
            </p>
          </div>

          <Outlet />
        </div>

        {/* Right — Decorative panel */}
        <div
          className="hidden lg:flex lg:w-[55%] relative items-center justify-center overflow-hidden"
          style={{ background: '#1A1614' }}
        >
          {/* Gold circle large */}
          <div className="absolute rounded-full" style={{
            width: '420px', height: '420px',
            background: '#C8A96A', opacity: 0.12,
            right: '-80px', top: '50%', transform: 'translateY(-50%)',
          }} />
          {/* Gold circle medium */}
          <div className="absolute rounded-full" style={{
            width: '280px', height: '280px',
            background: '#C8A96A', opacity: 0.08,
            right: '-40px', top: '50%', transform: 'translateY(-50%)',
          }} />
          {/* Subtle border circles */}
          <div className="absolute w-10 h-10 rounded-full border top-8 left-12"   style={{ borderColor: '#C8A96A', opacity: 0.2 }} />
          <div className="absolute w-6  h-6  rounded-full top-20 left-32"         style={{ background: '#C8A96A', opacity: 0.1 }} />
          <div className="absolute w-8  h-8  rounded-full border bottom-12 left-16" style={{ borderColor: '#C8A96A', opacity: 0.15 }} />
          <div className="absolute w-5  h-5  rounded-full bottom-28 left-40"      style={{ background: '#C8A96A', opacity: 0.1 }} />
          <div className="absolute w-7  h-7  rounded-full border top-12 right-24" style={{ borderColor: '#C8A96A', opacity: 0.2 }} />
          <div className="absolute w-4  h-4  rounded-full bottom-16 right-32"     style={{ background: '#C8A96A', opacity: 0.1 }} />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
            {/* Logo besar */}
            <img
              src="/img/logo.png"
              alt="Boutique"
              className="w-24 h-24 object-contain rounded-2xl"
              style={{ background: '#C8A96A', padding: '12px', opacity: 0.95 }}
            />

            {/* Brand name */}
            <div>
              <h2 className="text-2xl font-bold tracking-widest uppercase mb-1"
                style={{ color: '#F5F0EB', letterSpacing: '0.2em' }}>
                BOUTIQUE
              </h2>
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="h-px w-8" style={{ background: '#C8A96A', opacity: 0.5 }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: '#C8A96A', fontSize: '9px' }}>
                  Fashion Admin Portal
                </span>
                <div className="h-px w-8" style={{ background: '#C8A96A', opacity: 0.5 }} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#6B5C52' }}>
                Manage your boutique collections,<br />orders, and customers with elegance.
              </p>
            </div>

            {/* Decorative dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="rounded-full"
                  style={{
                    width: i === 1 ? '20px' : '8px',
                    height: '8px',
                    background: '#C8A96A',
                    opacity: i === 1 ? 0.8 : 0.3,
                  }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
