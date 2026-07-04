import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedAdmin = () => {
  const { loading, isAuthenticated, user } = useSelector(
  (state) => state.auth
);

if (loading) {
  return <div>Loading...</div>;
}

if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}

if (user?.role !== "admin") {
  return <Navigate to="/" replace />;
}

return <Outlet />;
};

export default ProtectedAdmin;