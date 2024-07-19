import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";

import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import customerService, { usePatients } from "../../services/CustomerService";
import { Link } from "react-router-dom";

const CustomerAppointment = () => {
  const [appointments, setAppointments] = React.useState([]);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const response = await axios.post(
            "/Appointment/get-current-appointment-list"
          );
          if (response.data && response.data.length > 0) {
            setAppointments(response.data);
          } else {
            setAppointments([]); // Ensure appointments is an empty array if no data
          }
        } catch (error) {
          setError("Error");
        }
      }
    };

    fetchAppointments();
  }, [token]);

  return (
    <div>
      <DashboardHead />
      <body class="g-sidenav-show  bg-gray-200">
        <Sidebar />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <NavbarDash />
          <div class="container-fluid py-4">
            <div class="row">
              <div class="col-12">
                <div class="card my-4">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                      <h6 class="text-white text-capitalize ps-3">
                        Your Appointments
                      </h6>
                    </div>
                  </div>
                  <div class="card-body px-0 pb-2">
                    <div class="row">
                      <br />
                    </div>
                    {error && <h5>There are no appointments!</h5>}
                    {!error && (
                      <div>
                        <div class="table-responsive p-0">
                          <table class="table align-items-center mb-0">
                            <thead>
                              <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                  ID
                                </th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                  Patient Name
                                </th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                  Arrival Date
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Time Slot
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Status
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Total Price
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Details
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {appointments.map((app) => (
                                <tr>
                                  <td>
                                    <p class="text-xs font-weight-bold mb-0">
                                      APP_{app.appointmentId}
                                    </p>
                                  </td>
                                  <td>
                                    <p class="text-xs font-weight-bold mb-0">
                                      {app.patient.name}
                                    </p>
                                  </td>
                                  <td>
                                    <p class="text-xs font-weight-bold mb-0">
                                      {app.arrivalDate.split("T")[0]}
                                    </p>
                                  </td>
                                  <td class="align-middle text-center">
                                    <p class="text-xs font-weight-bold mb-0">
                                      {app.timeSlot}
                                    </p>
                                  </td>
                                  <td class="align-middle text-center text-sm">
                                    {app.status === -1 ? (
                                      <span class="badge badge-sm bg-gradient-danger">
                                        Unpaid
                                      </span>
                                    ) : app.status === 0 ? (
                                      <span class="badge badge-sm bg-gradient-secondary">
                                        Cancelled
                                      </span>
                                    ) : app.status === 1 ? (
                                      <span class="badge badge-sm bg-gradient-info">
                                        Scheduled
                                      </span>
                                    ) : app.status === 2 ? (
                                      <span class="badge badge-sm bg-gradient-success">
                                        Finished
                                      </span>
                                    ) : (
                                      "none"
                                    )}
                                  </td>
                                  <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">
                                      {app.totalPrice}
                                    </span>
                                  </td>
                                  <td class="align-middle text-center">
                                    <input
                                      type="hidden"
                                      value={app.appointmentIdId}
                                    />
                                    <Link
                                      key={app.appointmentIdId}
                                      to={`/cus-app-details/${app.appointmentId}`}
                                      class="text-secondary font-weight-bold text-xs"
                                      data-toggle="tooltip"
                                      data-original-title="Appointment details"
                                    >
                                      <span class="btn bg-gradient-info mb-0">
                                        Details
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
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

export default CustomerAppointment;
