import React from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./services/Routes"; // Import your routes
import { AuthProvider } from "./services/AuthProvider"; // Adjust the path accordingly

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
