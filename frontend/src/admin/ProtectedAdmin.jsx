import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedAdmin = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdmin;