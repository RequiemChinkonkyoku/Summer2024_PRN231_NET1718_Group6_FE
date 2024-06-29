import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ roles }) => {
  const { token, user } = useAuth();

  const noAuthen = () => {
    toast.error("You have to login first.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const noAuthor = () => {
    toast.error("You don't have such permission to access.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  if (!token) {
    noAuthen();
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0 && user && !roles.includes(user.role)) {
    noAuthor();
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
