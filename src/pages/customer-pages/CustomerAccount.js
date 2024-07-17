import React, { useState } from "react";
import axios from "../../axiosConfig";

import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import { Link } from "react-router-dom";

const CustomerAccount = () => {
  const [customer, setCustomer] = React.useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get("/Customer/get-current-customer").then((response) => {
        setCustomer(response.data);
      });
    }
  }, []);

  return (
    <div>
      <DashboardHead />
      <body class="g-sidenav-show  bg-gray-200">
        <Sidebar />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <NavbarDash />
          <div class="container-fluid py-4">
            <div class="row mb-4">
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                      <h4 class="text-white text-capitalize ps-3">
                        Account Information
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mb-1">
                          <strong>Email:</strong> {customer.email}
                        </p>
                        <p className="mb-1">
                          <strong>Password:</strong> {customer.password}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FooterDash />
          </div>
        </main>
      </body>
    </div>
  );
};

export default CustomerAccount;
