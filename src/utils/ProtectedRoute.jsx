import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({
  children,
  adminRoute,
  redirectLogin = "/login",
  redirectHome = "/",
}) => {
  const { isAuthenticated, userLoading, user } = useSelector(
    (state) => state.auth
  );

  if (userLoading === undefined) {
  } else {
    if (!userLoading && !isAuthenticated) {
      return <Navigate to={`${redirectLogin}`} />;
    }
    if (!userLoading && adminRoute && user.role !== "adnmin") {
      return <Navigate to={`${redirectHome}`} replace />;
    }
  }

  return <div>{children ? children : <Outlet />}</div>;
};

export default ProtectedRoute;
