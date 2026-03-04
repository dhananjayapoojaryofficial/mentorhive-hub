import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * Wraps a route so only authenticated users (optionally of specific roles) can access it.
 * Unauthenticated users are redirected to /login.
 * Authenticated users with wrong role are redirected to their own dashboard.
 */
const ProtectedRoute = ({ children, allowedRoles, redirectTo = "/login" }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const dashboardMap: Record<UserRole, string> = {
      learner: "/learner/dashboard",
      teacher: "/teacher/dashboard",
      admin: "/admin",
    };
    return <Navigate to={dashboardMap[user.role]} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
