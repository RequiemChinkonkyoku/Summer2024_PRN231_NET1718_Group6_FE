import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MainHead from "./components/MainHead";

import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DentistDashboard from "./pages/DentistDashboard";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHead />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="dentistDashboard" element={<DentistDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
