import useAuthStore from "@/store/useAuthStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface RoutesHandlerProps {
  requiredRole: "auth" | "user";
}

const RoutesHandler = ({ requiredRole }: RoutesHandlerProps) => {
  const location = useLocation();
  
  const accessToken = useAuthStore((state) => state.user.accessToken);
  const isAuthenticated = Boolean(accessToken);

  if (requiredRole === "auth" && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requiredRole === "user" && !isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RoutesHandler;