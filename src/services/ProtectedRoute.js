import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ roles }) => {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // if (roles && roles.length > 0 && !roles.includes(user.role)) {
  //   return <Navigate to="/" />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
