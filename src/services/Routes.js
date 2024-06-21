import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DentistDashboard from "../pages/dentist-pages/DentistDashboard";
import DentistAppointment from "../pages/dentist-pages/DentistAppointment";
import CreateAppointment from "../pages/customer-pages/CreateAppointment";
import CustomerAccount from "../pages/customer-pages/CustomerAccount";
import CustomerPatients from "../pages/customer-pages/CustomerPatients";
import CustomerBooking from "../pages/customer-pages/CustomerBooking";
import CustomerNewPatient from "../pages/customer-pages/CustomerNewPatient";
import CustomerAppointment from "../pages/customer-pages/CustomerAppointment";
import CusAppDetails from "../pages/customer-pages/CusAppDetails";
import DentistAppDetails from "../pages/dentist-pages/DentistAppDetails";
import LoginDentist from "../pages/LoginDentist";
import DentistAccount from "../pages/dentist-pages/DentistAccount";
import CusEditPat from "../pages/customer-pages/CusEditPat";

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login-dentist" element={<LoginDentist />} />

        {/* <Route path="/" element={<ProtectedRoute roles={["customer"]} />}>
          <Route path="customer-dashboard" element={<CustomerDashboard />} />
        </Route> */}

        <Route path="/" element={<ProtectedRoute roles={["dentist"]} />}>
          <Route path="dentist-account" element={<DentistAccount />} />
          <Route path="dentist-appointment" element={<DentistAppointment />} />
          <Route
            path="dentist-app-details/:appId"
            element={<DentistAppDetails />}
          />
        </Route>

        <Route path="/" element={<ProtectedRoute roles={["Customer"]} />}>
          <Route path="create-appointment" element={<CreateAppointment />} />
        </Route>

        <Route path="/customer-account" element={<CustomerAccount />} />
        <Route path="/customer-patients" element={<CustomerPatients />} />
        <Route
          path="/customer-booking/:patientId"
          element={<CustomerBooking />}
        />
        <Route path="/cus-edit-pat/:patientId" element={<CusEditPat />} />
        <Route path="/customer-new-patient" element={<CustomerNewPatient />} />
        <Route path="/customer-appointment" element={<CustomerAppointment />} />
        <Route path="/cus-app-details/:appId" element={<CusAppDetails />} />

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
