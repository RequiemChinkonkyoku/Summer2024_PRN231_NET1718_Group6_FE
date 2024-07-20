import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DentistAppointment from "../pages/dentist-pages/DentistAppointment";
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
import ManagerAccount from "../pages/manager-pages/ManagerAccount";
import ManagerDentList from "../pages/manager-pages/ManagerDentList";
import { Navigate } from "react-router-dom";
import ManagerDentDetails from "../pages/manager-pages/ManagerDentDetails";
import ManaNewDent from "../pages/manager-pages/ManaNewDent";
import CreatePayment from "../pages/customer-pages/CreatePayment";
import MomoPaymentCallback from "../pages/customer-pages/MomoPaymentCallback";
import AccountVerification from "../pages/AccountVerification";
import ManaNewSchedule from "../pages/manager-pages/ManaNewSchedule";
import ManagerTreatList from "../pages/manager-pages/ManageTreatList";
import ManagerTreatDetails from "../pages/manager-pages/ManagerTreatDetails";
import ManagerNewTreat from "../pages/manager-pages/ManagerNewTreat";
import ManagerNewProf from "../pages/manager-pages/ManagerNewProf";

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" replace />}
        />
        <Route
          path="/login-dentist"
          element={!token ? <LoginDentist /> : <Navigate to="/" replace />}
        />
        <Route path="/account-verification" element={<AccountVerification />} />

        <Route element={<ProtectedRoute roles={["Dentist"]} />}>
          <Route path="dentist-account" element={<DentistAccount />} />
          <Route path="dentist-appointment" element={<DentistAppointment />} />
          <Route
            path="dentist-app-details/:appId"
            element={<DentistAppDetails />}
          />
        </Route>

        <Route element={<ProtectedRoute roles={["Manager"]} />}>
          <Route path="manager-account" element={<ManagerAccount />} />
          <Route path="manager-dent-list" element={<ManagerDentList />} />
          <Route
            path="manager-dent-details/:dentistId"
            element={<ManagerDentDetails />}
          />
          <Route path="mana-new-dent" element={<ManaNewDent />} />
          <Route path="mana-new-schedule" element={<ManaNewSchedule />} />
          <Route path="mana-treat-list" element={<ManagerTreatList />} />
          <Route
            path="mana-treat-details/:treatmentId"
            element={<ManagerTreatDetails />}
          />
          <Route
            path="mana-new-treat"
            element={<ManagerNewTreat />}
          />
          <Route
            path="mana-new-prof"
            element={<ManagerNewProf />}
          />
        </Route>

        <Route element={<ProtectedRoute roles={["Customer"]} />}>
          <Route path="customer-account" element={<CustomerAccount />} />
          <Route path="customer-patients" element={<CustomerPatients />} />
          <Route
            path="customer-booking/:patientId"
            element={<CustomerBooking />}
          />
          <Route path="cus-edit-pat/:patientId" element={<CusEditPat />} />
          <Route path="customer-new-patient" element={<CustomerNewPatient />} />
          <Route
            path="customer-appointment"
            element={<CustomerAppointment />}
          />
          <Route path="cus-app-details/:appId" element={<CusAppDetails />} />
          <Route path="/create-payment/:appId" element={<CreatePayment />} />
          <Route
            path="/momo-payment-callback"
            element={<MomoPaymentCallback />}
          />
        </Route>

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
