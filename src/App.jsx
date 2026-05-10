import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

// Layouts
const AuthLayout     = lazy(() => import('./layouts/AuthLayout'));
const MainLayout     = lazy(() => import('./layouts/MainLayout'));
const ProtectedRoute = lazy(() => import('./layouts/ProtectedRoute'));

// Auth pages
const Login    = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Forgot   = lazy(() => import('./pages/auth/Forgot'));

// Main pages
const Dashboard      = lazy(() => import('./pages/main/Dashboard'));
const Orders         = lazy(() => import('./pages/main/Orders'));
const OrderDetail    = lazy(() => import('./pages/main/OrderDetail'));
const Customers      = lazy(() => import('./pages/main/Customers'));
const CustomerDetail = lazy(() => import('./pages/main/CustomerDetail'));

// Error pages
const Error400 = lazy(() => import('./pages/main/Error400'));
const Error401 = lazy(() => import('./pages/main/Error401'));
const Error403 = lazy(() => import('./pages/main/Error403'));
const NotFound = lazy(() => import('./pages/main/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/"                element={<Dashboard />} />
            <Route path="/orders"          element={<Orders />} />
            <Route path="/orders/:id"      element={<OrderDetail />} />
            <Route path="/customers"       element={<Customers />} />
            <Route path="/customers/:id"   element={<CustomerDetail />} />
            <Route path="/error-400"       element={<Error400 />} />
            <Route path="/error-401"       element={<Error401 />} />
            <Route path="/error-403"       element={<Error403 />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
