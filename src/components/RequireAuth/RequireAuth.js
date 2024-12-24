import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const RequireAuth = ({ isAuthenticated }) => {
  const auth = isAuthenticated;
  const location = useLocation();

  return (
    auth ? <Outlet />
         : <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

export default RequireAuth;
