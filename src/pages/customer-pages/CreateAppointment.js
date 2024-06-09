import React, { useEffect, useState } from "react";
import axios from "axios";

import MainHead from "../../components/MainHead";
import NavbarTransparent from "../../components/NavbarTransparent";
import FooterTransparent from "../../components/FooterTransparent";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "../../assets/css/nucleo-icons.css"; // Local CSS file for icons
import "../../assets/css/nucleo-svg.css"; // Local CSS file for SVGs
import "../../assets/css/material-dashboard.css"; // Local CSS for material dashboard
import "../../assets/css/material-kit.css";
import { Link, useNavigate } from "react-router-dom";

import Scripts from "../../components/Scripts";
import { useAuth } from "../../services/AuthProvider";
import bookAppointment from "../../services/CustomerService";
import Footer from "../../components/Footer";

const CreateAppointment = () => {
  const [patientId, setPatientId] = useState("");
  const [treatmentId, setTreatmentId] = useState("");
  const [dentistId, setDentistId] = useState("");

  const [arrivalDate, setArrivalDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const [bookingPrice, setBookingPrice] = useState(50);
  const [scheduleId, setScheduleId] = useState(1);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await bookAppointment(
        patientId,
        arrivalDate,
        timeSlot,
        bookingPrice,
        scheduleId,
        treatmentId,
        dentistId
      );
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <MainHead />
      <body class="about-us bg-gray-200">
        <NavbarTransparent />
        <header class="bg-gradient-dark">
          <div
            class="page-header min-vh-75"
            style={{
              backgroundImage: 'url("../assets/img/bg9.jpg")',
              transform: "translate3d(0px, 0px, 0px)",
            }}
          >
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-8 text-center mx-auto my-auto">
                  <h1 class="text-white">Book an appointment</h1>
                  <p class="lead mb-4 text-white opacity-8">..</p>
                  <button type="submit" class="btn bg-white text-dark">
                    ..
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
          <section class="py-7">
            <section>
              <div class="container py-4">
                <div class="row">
                  <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
                    <h3 class="text-center">Enter your details</h3>
                    <form
                      role="form"
                      id="contact-form"
                      method="post"
                      autocomplete="off"
                      onSubmit={handleSubmit}
                    >
                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="input-group input-group-dynamic mb-4">
                              {/* <label class="form-label">Patient ID</label> */}
                              <input
                                class="form-control"
                                id="patientId"
                                name="patientId"
                                placeholder="Patient ID"
                                type="text"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div class="col-md-6 ps-2">
                            <div class="input-group input-group-dynamic">
                              {/* <label class="form-label">Last Name</label> */}
                              <input
                                class="form-control"
                                id="treatmentId"
                                name="treatmentId"
                                placeholder="Treatment Id"
                                type="text"
                                value={treatmentId}
                                onChange={(e) => setTreatmentId(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div class="mb-4">
                          <div class="input-group input-group-dynamic">
                            {/* <label class="form-label">Email Address</label> */}
                            <input
                              class="form-control"
                              id="dentistId"
                              name="dentistId"
                              placeholder="Dentist Id"
                              type="text"
                              value={dentistId}
                              onChange={(e) => setDentistId(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="input-group input-group-dynamic mb-4">
                              {/* <label class="form-label">Patient ID</label> */}
                              <input
                                class="form-control"
                                id="arrivalDate"
                                name="arrivalDate"
                                placeholder="Arrival Date"
                                type="date"
                                value={arrivalDate}
                                onChange={(e) => setArrivalDate(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div class="col-md-6 ps-2">
                            <div class="input-group input-group-dynamic">
                              {/* <label class="form-label">Last Name</label> */}
                              <input
                                class="form-control"
                                id="timeSlot"
                                name="timeSlot"
                                placeholder="Time Slot"
                                type="text"
                                value={timeSlot}
                                onChange={(e) => setTimeSlot(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* <div class="input-group mb-4 input-group-static">
                          <label>Your message</label>
                          <textarea
                            name="message"
                            class="form-control"
                            id="message"
                            rows="4"
                          ></textarea>
                        </div> */}
                        <div class="row">
                          {/* <div class="col-md-12">
                            <div class="form-check form-switch mb-4 d-flex align-items-center">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                checked=""
                              />
                              <label
                                class="form-check-label ms-3 mb-0"
                                for="flexSwitchCheckDefault"
                              >
                                I agree to the{" "}
                                <a href="javascript:;" class="text-dark">
                                  <u>Terms and Conditions</u>
                                </a>
                                .
                              </label>
                            </div>
                          </div> */}
                          <div class="col-md-12">
                            <button
                              type="submit"
                              class="btn bg-gradient-dark w-100"
                            >
                              Send Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section class="pb-5 position-relative bg-gradient-dark mx-n3">
            <div class="container">
              <div class="row">
                <div class="col-md-8 text-start mb-5 mt-5">
                  <h3 class="text-white z-index-1 position-relative">
                    The Executive Team
                  </h3>
                  <p class="text-white opacity-8 mb-0">
                    There’s nothing I really wanted to do in life that I wasn’t
                    able to get good at. That’s my skill.
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-12">
                  <div class="card card-profile mt-4">
                    <div class="row">
                      <div class="col-lg-4 col-md-6 col-12 mt-n5">
                        <a href="javascript:;">
                          <div class="p-3 pe-md-0">
                            <img
                              class="w-100 border-radius-md shadow-lg"
                              src="../assets/img/team-5.jpg"
                              alt="image"
                            />
                          </div>
                        </a>
                      </div>
                      <div class="col-lg-8 col-md-6 col-12 my-auto">
                        <div class="card-body ps-lg-0">
                          <h5 class="mb-0">Emma Roberts</h5>
                          <h6 class="text-info">UI Designer</h6>
                          <p class="mb-0">
                            Artist is a term applied to a person who engages in
                            an activity deemed to be an art.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-12">
                  <div class="card card-profile mt-lg-4 mt-5">
                    <div class="row">
                      <div class="col-lg-4 col-md-6 col-12 mt-n5">
                        <a href="javascript:;">
                          <div class="p-3 pe-md-0">
                            <img
                              class="w-100 border-radius-md shadow-lg"
                              src="../assets/img/bruce-mars.jpg"
                              alt="image"
                            />
                          </div>
                        </a>
                      </div>
                      <div class="col-lg-8 col-md-6 col-12 my-auto">
                        <div class="card-body ps-lg-0">
                          <h5 class="mb-0">William Pearce</h5>
                          <h6 class="text-info">Boss</h6>
                          <p class="mb-0">
                            Artist is a term applied to a person who engages in
                            an activity deemed to be an art.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-lg-6 col-12">
                  <div class="card card-profile mt-4 z-index-2">
                    <div class="row">
                      <div class="col-lg-4 col-md-6 col-12 mt-n5">
                        <a href="javascript:;">
                          <div class="p-3 pe-md-0">
                            <img
                              class="w-100 border-radius-md shadow-lg"
                              src="../assets/img/ivana-squares.jpg"
                              alt="image"
                            />
                          </div>
                        </a>
                      </div>
                      <div class="col-lg-8 col-md-6 col-12 my-auto">
                        <div class="card-body ps-lg-0">
                          <h5 class="mb-0">Ivana Flow</h5>
                          <h6 class="text-info">Athlete</h6>
                          <p class="mb-0">
                            Artist is a term applied to a person who engages in
                            an activity deemed to be an art.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-12">
                  <div class="card card-profile mt-lg-4 mt-5 z-index-2">
                    <div class="row">
                      <div class="col-lg-4 col-md-6 col-12 mt-n5">
                        <a href="javascript:;">
                          <div class="p-3 pe-md-0">
                            <img
                              class="w-100 border-radius-md shadow-lg"
                              src="../assets/img/ivana-square.jpg"
                              alt="image"
                            />
                          </div>
                        </a>
                      </div>
                      <div class="col-lg-8 col-md-6 col-12 my-auto">
                        <div class="card-body ps-lg-0">
                          <h5 class="mb-0">Marquez Garcia</h5>
                          <h6 class="text-info">JS Developer</h6>
                          <p class="mb-0">
                            Artist is a term applied to a person who engages in
                            an activity deemed to be an art.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="pt-4 pb-6" id="count-stats">
            <div class="container">
              <div class="row mb-7">
                <div class="col-lg-2 col-md-4 col-6 mb-4">
                  <img
                    class="w-100 opacity-7"
                    src="../assets/img/logos/gray-logos/logo-coinbase.svg"
                    alt="logo"
                  />
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-4">
                  <img
                    class="w-100 opacity-7"
                    src="../assets/img/logos/gray-logos/logo-nasa.svg"
                    alt="logo"
                  />
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-4">
                  <img
                    class="w-100 opacity-7"
                    src="../assets/img/logos/gray-logos/logo-netflix.svg"
                    alt="logo"
                  />
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-4">
                  <img
                    class="w-100 opacity-7"
                    src="../assets/img/logos/gray-logos/logo-pinterest.svg"
                    alt="logo"
                  />
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-4">
                  <img
                    class="w-100 opacity-7"
                    src="../assets/img/logos/gray-logos/logo-spotify.svg"
                    alt="logo"
                  />
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-4">
                  <img
                    class="w-100 opacity-7"
                    src="../assets/img/logos/gray-logos/logo-vodafone.svg"
                    alt="logo"
                  />
                </div>
              </div>
              <div class="row justify-content-center text-center">
                <div class="col-md-3">
                  <h1
                    class="text-gradient text-info"
                    id="state1"
                    countto="5234"
                  >
                    0
                  </h1>
                  <h5>Projects</h5>
                  <p>
                    Of “high-performing” level are led by a certified project
                    manager
                  </p>
                </div>
                <div class="col-md-3">
                  <h1 class="text-gradient text-info">
                    <span id="state2" countto="3400">
                      0
                    </span>
                    +
                  </h1>
                  <h5>Hours</h5>
                  <p>That meets quality standards required by our users</p>
                </div>
                <div class="col-md-3">
                  <h1 class="text-gradient text-info">
                    <span id="state3" countto="24">
                      0
                    </span>
                    /7
                  </h1>
                  <h5>Support</h5>
                  <p>Actively engage team members that finishes on time</p>
                </div>
              </div>
            </div>
          </section>
          <section class="my-5 pt-5">
            <div class="container">
              <div class="row">
                <div class="col-md-6 m-auto">
                  <h4>Be the first to see the news</h4>
                  <p class="mb-4">
                    Your company may not be in the software business, but
                    eventually, a software company will be in your business.
                  </p>
                  <div class="row">
                    <div class="col-8">
                      <div class="input-group input-group-outline">
                        <label class="form-label">Email Here...</label>
                        <input type="text" class="form-control mb-sm-0" />
                      </div>
                    </div>
                    <div class="col-4 ps-0">
                      <button
                        type="button"
                        class="btn bg-gradient-info mb-0 h-100 position-relative z-index-2"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-5 ms-auto">
                  <div class="position-relative">
                    <img
                      class="max-width-50 w-100 position-relative z-index-2"
                      src="../assets/img/macbook.png"
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </body>
    </div>
  );
};

export default CreateAppointment;
