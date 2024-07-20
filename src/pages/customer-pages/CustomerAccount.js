import React, { useState } from "react";
import axios from "../../axiosConfig";

import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import { Link, useNavigate } from "react-router-dom";

const CustomerAccount = () => {
  const [currentPassword, setCurrentPassword] = React.useState([]);
  const [newPassword, setNewPassword] = React.useState([]);

  const [customer, setCustomer] = React.useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get("/Customer/get-current-customer").then((response) => {
        setCustomer(response.data);
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset the error state before the request

    try {
      const response = await axios.put("/Account/customer-change-password", {
        currentPassword,
        newPassword,
      });

      // If the request is successful, response.status will be 200
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      // Set the error message based on the error response
      if (error.response) {
        // Server responded with a status other than 200 range
        setError(error.response.data.message || "An error occurred");
      } else {
        // Network error or other issues
        setError("An error occurred");
      }
    }
  };

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
                          <strong>Password:</strong> *****
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="row mb-4">
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-danger shadow-danger border-radius-lg pt-4 pb-3">
                      <h4 class="text-white text-capitalize ps-3">
                        Change password
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <form
                      role="form"
                      class="text-start"
                      onSubmit={handleSubmit}
                    >
                      <div class="input-group input-group-static mb-4">
                        <label>Current password</label>
                        <input
                          type="text"
                          class="form-control"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div class="input-group input-group-static mb-4">
                        <label>New password</label>
                        <input
                          type="text"
                          class="form-control"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <button type="submit" class="btn btn-info">
                        CONFIRM
                      </button>
                    </form>
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
