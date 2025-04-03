import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { UnauthorizedMessage } from './pages/Auth/unauthPage';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  if (!isAdmin && (window.location.pathname === "/users-manager" || window.location.pathname === "/category-manager" || window.location.pathname === "/content-manager")) {
    return <UnauthorizedMessage />;
  }

  return <Outlet />;
};
