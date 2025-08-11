import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export function AuthProvider({ children }) {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  // If there's no token and we're not on the login page, redirect to login
  if (!token && location.pathname !== '/auth/login') {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If there's a token and we're on the login page, redirect to dashboard
  if (token && location.pathname === '/auth/login') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// Protected Route component
export function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
} 