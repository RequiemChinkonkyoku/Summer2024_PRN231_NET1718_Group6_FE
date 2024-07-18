import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

import SidebarDent from "../../components/SidebarDent";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

const DentistAppDetails = () => {
  const { appId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [diagnosis, setDiagnosis] = useState(null);
  const [note, setNote] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(`/Appointment/get-app-by-id/${appId}`)
        .then((response) => {
          setAppointment(response.data);
          fetchMedicalRecord(response.data.status);
        })
        .catch((error) => {
          console.error("Error fetching appointment:", error);
        });
    }
  }, [token, appId]);

  useEffect(() => {
    if (medicalRecord) {
      setDiagnosis(medicalRecord.diagnosis);
      setNote(medicalRecord.note);
    }
  }, [medicalRecord]);

  const fetchMedicalRecord = (status) => {
    if (status !== 0 && status !== -1) {
      axios
        .get(`/MedicalRecord/get-medical-record-by-app-id/${appId}`)
        .then((response) => {
          setMedicalRecord(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setError("No data");
            console.log(error);
          } else {
            console.error("Error fetching medical record:", error);
          }
        });
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      axios.post(
        `/MedicalRecord/create-medical-record?appointmentID=${appId}`,
        {
          diagnosis,
          note,
          status: "0",
          appId,
        }
      );
      navigate(0);
    } catch (error) {}
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      axios.put(
        `/MedicalRecord/update-medical-record/${medicalRecord.recordId}`,
        {
          diagnosis,
          status: "0",
          note,
        }
      );
      navigate(0);
    } catch (error) {}
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    try {
      axios.put(`/Appointment/finish-appointment/?appId=${appId}`);
      navigate(0);
    } catch (error) {}
  };

  return (
    <div>
      <DashboardHead />
      <body className="g-sidenav-show bg-gray-200">
        <SidebarDent />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <NavbarDash />
          <div className="container-fluid py-4">
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                      <h4 className="text-white text-capitalize ps-3">
                        Appointment Details
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Patient Information</h4>
                        <p className="mb-1">
                          <strong>Name:</strong> {appointment?.patient?.name}
                        </p>
                        <p className="mb-1">
                          <strong>Age:</strong> {appointment?.patient?.age}
                        </p>
                        <p className="mb-1">
                          <strong>Gender:</strong>{" "}
                          {appointment?.patient?.gender === 1
                            ? "Male"
                            : "Female"}
                        </p>
                        <p className="mb-1">
                          <strong>Address:</strong>{" "}
                          {appointment?.patient?.address}
                        </p>
                      </div>
                    </div>
                    <hr color="black" />
                    <h4>Date & Time</h4>
                    <div className="flex mb-3">
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/005/988/959/original/calendar-icon-free-vector.jpg"
                            className="avatar avatar-sm me-3 border-radius-lg"
                            alt="user2"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          {appointment?.arrivalDate.split("T")[0]} - Slot{" "}
                          {appointment?.timeSlot} - 8:00 AM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                      <h4 className="text-white text-capitalize ps-3">
                        Treatment Information
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <h4>Selected Treatments</h4>
                        {appointment?.appointmentDetails.map((detail) => (
                          <div className="row mb-1" key={detail.id}>
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
              </div>
            </div>
            <br />
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                      <h4 className="text-white text-capitalize ps-3">
                        Medical Record
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    {!medicalRecord &&
                      appointment &&
                      (appointment.status === 0 ||
                        appointment.status === -1) && (
                        <h5>
                          The appointment is either unpaid or cancelled. Medical
                          record cannot be created.
                        </h5>
                      )}
                    {!medicalRecord &&
                      appointment &&
                      appointment.status === 1 && (
                        <div>
                          <h5>
                            Medical record is not created.
                            <br />
                            You can create via the form below.
                          </h5>
                          <form
                            role="form"
                            class="text-start"
                            onSubmit={handleCreate}
                          >
                            <div class="input-group input-group-static mb-4">
                              <label>Diagnosis</label>
                              <input
                                type="text"
                                class="form-control"
                                value={diagnosis}
                                onChange={(e) => setDiagnosis(e.target.value)}
                              />
                            </div>
                            <div class="input-group input-group-static mb-4">
                              <label>Note</label>
                              <input
                                type="text"
                                class="form-control"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                              />
                            </div>
                            <button type="submit" class="btn btn-info">
                              CREATE
                            </button>
                          </form>
                        </div>
                      )}
                    {medicalRecord &&
                      appointment &&
                      appointment.status === 1 && (
                        <div>
                          <form
                            role="form"
                            class="text-start"
                            onSubmit={handleUpdate}
                          >
                            <div class="input-group input-group-static mb-4">
                              <label>Diagnosis</label>
                              <input
                                type="text"
                                class="form-control"
                                value={diagnosis}
                                onChange={(e) => setDiagnosis(e.target.value)}
                              />
                            </div>
                            <div class="input-group input-group-static mb-4">
                              <label>Note</label>
                              <input
                                type="text"
                                class="form-control"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                              />
                            </div>
                            <button type="submit" class="btn btn-info">
                              UPDATE
                            </button>
                          </form>
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={handleFinish}
                          >
                            FINISH
                          </button>
                        </div>
                      )}
                    {medicalRecord &&
                      appointment &&
                      appointment.status === 2 && (
                        <div>
                          <p className="mb-1">
                            <strong>Diagnosis:</strong>{" "}
                            {medicalRecord.diagnosis}
                          </p>
                          <p className="mb-1">
                            <strong>Note:</strong> {medicalRecord.note}
                          </p>
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

export default DentistAppDetails;
