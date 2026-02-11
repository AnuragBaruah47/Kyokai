import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../Store/UserStore";

const ProtectedRoute = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
