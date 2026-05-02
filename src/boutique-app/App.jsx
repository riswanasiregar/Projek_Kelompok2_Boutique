import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

// Lazy load layouts
const AuthLayout    = lazy(() => import('./layouts/AuthLayout'));
const MainLayout    = lazy(() => import('./layouts/MainLayout'));
const ProtectedRoute = lazy(() => import('./layouts/ProtectedRoute'));

// Lazy load auth pages
const Login    = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Forgot   = lazy(() => import('./pages/auth/Forgot'));

// Lazy load main pages
const Dashboard  = lazy(() => import('./pages/main/Dashboard'));
const Products   = lazy(() => import('./pages/main/Products'));
const Orders     = lazy(() => import('./pages/main/Orders'));
const Customers  = lazy(() => import('./pages/main/Customers'));
const Analytics  = lazy(() => import('./pages/main/Analytics'));
const Promotions = lazy(() => import('./pages/main/Promotions'));
const Reports    = lazy(() => import('./pages/main/Reports'));
const Settings   = lazy(() => import('./pages/main/Settings'));
const Error400   = lazy(() => import('./pages/main/Error400'));
const Error401   = lazy(() => import('./pages/main/Error401'));
const Error403   = lazy(() => import('./pages/main/Error403'));
const NotFound   = lazy(() => import('./pages/main/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

        {/* Protected main routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/"            element={<Dashboard />} />
            <Route path="/products"    element={<Products />} />
            <Route path="/orders"      element={<Orders />} />
            <Route path="/customers"   element={<Customers />} />
            <Route path="/analytics"   element={<Analytics />} />
            <Route path="/promotions"  element={<Promotions />} />
            <Route path="/reports"     element={<Reports />} />
            <Route path="/settings"    element={<Settings />} />
            <Route path="/error-400"   element={<Error400 />} />
            <Route path="/error-401"   element={<Error401 />} />
            <Route path="/error-403"   element={<Error403 />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
