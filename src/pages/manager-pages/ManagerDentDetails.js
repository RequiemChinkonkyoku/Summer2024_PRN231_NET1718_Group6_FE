import React, { useImperativeHandle, useState } from "react";
import axios from "../../axiosConfig";
import { useParams } from "react-router-dom";

import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";
import SidebarMana from "../../components/SidebarMana";

const ManagerDentDetails = () => {
  const { dentistId } = useParams();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [dentist, setDentist] = useState([]);

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get(`/Dentist/get-dentist-by-id/${dentistId}`).then((response) => {
        setDentist(response.data);
        console.log(response.data);
      });
    }
  }, []);

  return (
    <div>
      <DashboardHead />
      <body class="g-sidenav-show  bg-gray-200">
        <SidebarMana />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <NavbarDash />
          <div class="container-fluid py-4">
            <div class="row mb-4">
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-success shadow-info border-radius-lg pt-4 pb-3">
                      <h4 class="text-white text-capitalize ps-3">
                        Dentist Details
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Dentist Information</h4>
                        <p className="mb-1">
                          <strong>ID:</strong> {dentist.dentistId}
                        </p>
                        <p className="mb-1">
                          <strong>Name:</strong> {dentist.name}
                        </p>
                        <p className="mb-1">
                          <strong>Email:</strong> {dentist.email}
                        </p>
                        <p className="mb-1">
                          <strong>Contract:</strong>{" "}
                          {dentist.contractType === "Full-time" ? (
                            <span class="badge badge-sm bg-gradient-info">
                              {dentist.contractType}
                            </span>
                          ) : dentist.contractType === "Part-time" ? (
                            <span class="badge badge-sm bg-gradient-warning">
                              {dentist.contractType}
                            </span>
                          ) : (
                            "none"
                          )}
                        </p>
                        <p className="mb-1">
                          <strong>Status:</strong>{" "}
                          {dentist.status === 1 ? (
                            <span class="badge badge-sm bg-gradient-success">
                              Active
                            </span>
                          ) : dentist.status === 0 ? (
                            <span class="badge badge-sm bg-gradient-secondary">
                              Inactive
                            </span>
                          ) : (
                            "none"
                          )}
                        </p>
                      </div>
                    </div>
                    <hr color="black" />
                    {/* <h4>Date & Time</h4> */}
                    {/* <div className="flex mb-3">
                      <div class="d-flex px-2 py-1">
                        <div>
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/005/988/959/original/calendar-icon-free-vector.jpg"
                            class="avatar avatar-sm me-3 border-radius-lg"
                            alt="user2"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          {appointment?.arrivalDate.split("T")[0]} - Slot{" "}
                          {appointment?.timeSlot} - 8:00 AM
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                      <h4 class="text-white text-capitalize ps-3">
                        Treatment Information
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <h4>Selected Treatments</h4>
                        {appointment?.appointmentDetails.map((detail) => (
                          <div className="row mb-1">
                            <div className="col-md-6">
                              <p className="mb-1">
                                <strong>{detail.treatment.name}</strong>
                              </p>
                            </div>
                            <div className="col-md-6">
                              <p className="mb-1">
                                <strong>{detail.treatment.price} VND</strong>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <hr color="black" />
                    <div>
                      <div className="row">
                        <div className="col-md-6">
                          <p className="mb-1">
                            <strong>Booking Price</strong>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-1">
                            {appointment?.bookingPrice} VND
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <p className="mb-1">
                            <strong>Service Price</strong>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-1">
                            {appointment?.servicePrice} VND
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <h4 className="mb-1">Total Price</h4>
                        </div>
                        <div className="col-md-6">
                          <h4 className="mb-1">
                            {appointment?.totalPrice} VND
                          </h4>
                        </div>
                      </div>
                      <hr color="black" />
                      <div className="row">
                        <div className="col-md-6">
                          <h4>Appointment Status</h4>
                        </div>
                        <div className="col-md-6">
                          {appointment && (
                            <span
                              className={
                                appointment.status === -1
                                  ? "badge bg-gradient-danger me-2"
                                  : appointment.status === 0
                                  ? "badge bg-gradient-secondary me-2"
                                  : appointment.status === 1
                                  ? "badge bg-gradient-info me-2"
                                  : appointment.status === 2
                                  ? "badge bg-gradient-success me-2"
                                  : "badge bg-gradient-light me-2"
                              }
                            >
                              {appointment.status === -1
                                ? "Unpaid"
                                : appointment.status === 0
                                ? "Cancelled"
                                : appointment.status === 1
                                ? "Scheduled"
                                : appointment.status === 2
                                ? "Finished"
                                : "Unknown"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <FooterDash />
          </div>
        </main>
      </body>
    </div>
  );
};

export default ManagerDentDetails;
