import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({
  children,
  adminRoute,
  redirectLogin = "/login",
  redirectHome = "/",
}) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (!loading && !isAuthenticated) {
    return <Navigate to={redirectLogin} />;
  }

  if (adminRoute && !user.role === "admin") {
    return <Navigate to={redirectHome} />;
  }

  return <div>{children ? children : <Outlet />}</div>;
};

export default ProtectedRoute;
