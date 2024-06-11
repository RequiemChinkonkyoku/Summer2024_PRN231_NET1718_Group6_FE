import React, { useState } from "react";
import axios from "../../axiosConfig";

import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";

import customerService, { usePatients } from "../../services/CustomerService";
import { Link } from "react-router-dom";

const CustomerPatients = () => {
  const [patients, setPatients] = React.useState([]);
  const [selectedPatient, setSelectedPatient] = React.useState(null);
  const [patientID, setPatientID] = React.useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get("/Patient/get-patient-list-by-customer").then((response) => {
        setPatients(response.data);
      });
    }
  }, []);

  return (
    <div>
      <DashboardHead />
      <body class="g-sidenav-show  bg-gray-200">
        <Sidebar />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <div class="container-fluid py-4">
            <div class="row">
              <div class="col-12">
                <div class="card my-4">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                      <h6 class="text-white text-capitalize ps-3">
                        Your Patients
                      </h6>
                    </div>
                  </div>
                  <div class="card-body px-0 pb-2">
                    <div class="table-responsive p-0">
                      <table class="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Patient Name
                            </th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Age
                            </th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Gender
                            </th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Status
                            </th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Details
                            </th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Booking
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div class="d-flex px-2 py-1">
                                <div>
                                  <img
                                    src="../assets/img/team-2.jpg"
                                    class="avatar avatar-sm me-3 border-radius-lg"
                                    alt="user1"
                                  />
                                </div>
                                <div class="d-flex flex-column justify-content-center">
                                  <h6 class="mb-0 text-sm">John Michael</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p class="text-xs font-weight-bold mb-0">10</p>
                            </td>
                            <td>
                              <p class="text-xs font-weight-bold mb-0">Male</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                              <span class="badge badge-sm bg-gradient-success">
                                Active
                              </span>
                            </td>
                            <td class="align-middle text-center">
                              <span class="text-secondary text-xs font-weight-bold">
                                Edit
                              </span>
                            </td>
                            <td class="align-middle text-center">
                              <span class="text-secondary text-xs font-weight-bold">
                                Book
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="d-flex px-2 py-1">
                                <div>
                                  <img
                                    src="../assets/img/team-3.jpg"
                                    class="avatar avatar-sm me-3 border-radius-lg"
                                    alt="user2"
                                  />
                                </div>
                                <div class="d-flex flex-column justify-content-center">
                                  <h6 class="mb-0 text-sm">Alexa Liras</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p class="text-xs font-weight-bold mb-0">69</p>
                            </td>
                            <td>
                              <p class="text-xs font-weight-bold mb-0">
                                Female
                              </p>
                            </td>
                            <td class="align-middle text-center text-sm">
                              <span class="badge badge-sm bg-gradient-secondary">
                                Inactive
                              </span>
                            </td>
                            <td class="align-middle text-center">
                              <span class="text-secondary text-xs font-weight-bold">
                                Edit
                              </span>
                            </td>
                            <td class="align-middle text-center">
                              <span class="text-secondary text-xs font-weight-bold">
                                Book
                              </span>
                            </td>
                          </tr>
                          {patients.map((patient) => (
                            <tr>
                              <td>
                                <div class="d-flex px-2 py-1">
                                  <div>
                                    <img
                                      src="https://preview.redd.it/v7by39tw8owb1.jpg?auto=webp&s=5f2c19aa7ed4036eaf421c28858500edcd734e8d"
                                      class="avatar avatar-sm me-3 border-radius-lg"
                                      alt="user2"
                                    />
                                  </div>
                                  <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">{patient.name}</h6>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="text-xs font-weight-bold mb-0">
                                  {patient.age}
                                </p>
                              </td>
                              <td>
                                <p class="text-xs font-weight-bold mb-0">
                                  {patient.gender === 1
                                    ? "Male"
                                    : patient.gender === 2
                                    ? "Female"
                                    : "LGBT"}
                                </p>
                              </td>
                              <td class="align-middle text-center text-sm">
                                {patient.status === 1 ? (
                                  <span class="badge badge-sm bg-gradient-success">
                                    Active
                                  </span>
                                ) : patient.status === 0 ? (
                                  <span class="badge badge-sm bg-gradient-secondary">
                                    Inactive
                                  </span>
                                ) : (
                                  "none"
                                )}
                              </td>
                              <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">
                                  Edit
                                </span>
                              </td>
                              <td class="align-middle text-center">
                                <input
                                  type="hidden"
                                  value={patient.patientId}
                                />
                                <Link
                                  key={patient.patientId}
                                  to={`/customer-booking/${patient.patientId}`}
                                  class="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Book for patient"
                                >
                                  Book
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </div>
  );
};

export default CustomerPatients;
