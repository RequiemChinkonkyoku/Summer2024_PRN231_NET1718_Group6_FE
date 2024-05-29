import React, { useEffect, useState } from "react";
import axios from "axios";

import MainHead from "../components/MainHead";
import NavbarTransparent from "../components/NavbarTransparent";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "../assets/css/nucleo-icons.css"; // Local CSS file for icons
import "../assets/css/nucleo-svg.css"; // Local CSS file for SVGs
import "../assets/css/material-dashboard.css"; // Local CSS for material dashboard
import "../assets/css/material-kit.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <body class="">
        <main class="main-content  mt-0">
          <section>
            <div class="page-header min-vh-100">
              <div class="container">
                <div class="row">
                  <div class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                    <div
                      class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                      style={{
                        backgroundImage:
                          "url(" +
                          "https://www.shutterstock.com/image-photo/blurred-dental-clinic-background-defocused-600nw-2326575003.jpg" +
                          ")",
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </div>
                  <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                    <div class="card card-plain">
                      <div class="card-header">
                        <h4 class="font-weight-bolder">Register</h4>
                        <p class="mb-0">
                          Enter your email and password
                          <br />
                          to create a new account
                        </p>
                      </div>
                      <div class="card-body">
                        <form role="form">
                          <div class="input-group input-group-outline mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" />
                          </div>
                          <div class="input-group input-group-outline mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" />
                          </div>
                          <div class="form-check form-check-info text-start ps-0">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                              checked
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              I agree the{" "}
                              <a
                                href="javascript:;"
                                class="text-dark font-weight-bolder"
                              >
                                Terms and Conditions
                              </a>
                            </label>
                          </div>
                          <div class="text-center">
                            <button
                              type="button"
                              class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                            >
                              Register
                            </button>
                          </div>
                        </form>
                      </div>
                      <div class="card-footer text-center pt-0 px-lg-2 px-1">
                        <p class="mb-2 text-sm mx-auto">
                          Already have an account? <t />
                          <Link
                            to="/login"
                            class="text-primary text-gradient font-weight-bold"
                          >
                            Log in
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </body>
    </div>
  );
};

export default Register;
