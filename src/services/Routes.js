import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DentistDashboard from "../pages/DentistDashboard";

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/" element={<ProtectedRoute roles={["customer"]} />}>
          <Route path="customer-dashboard" element={<CustomerDashboard />} />
        </Route> */}

        <Route path="/" element={<ProtectedRoute roles={["dentist"]} />}>
          <Route path="dentist-dashboard" element={<DentistDashboard />} />
        </Route>

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
