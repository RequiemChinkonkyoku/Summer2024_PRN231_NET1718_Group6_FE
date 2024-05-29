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

import Scripts from "../components/Scripts";

const Login = () => {
  return (
    <div>
      <MainHead />
      <body class="sign-in-basic">
        <NavbarTransparent />
        <div
          class="page-header align-items-start min-vh-100"
          style={{
            backgroundImage:
              "url(" +
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8X_MzN2bPWnRkrDi-ZYOqvlTq5a4zyPH3rg&s" +
              ")",
          }}
          loading="lazy"
        >
          <span class="mask bg-gradient-dark opacity-6"></span>
          <div class="container my-auto">
            <div class="row">
              <div class="col-lg-4 col-md-8 col-12 mx-auto">
                <div class="card z-index-0 fadeIn3 fadeInBottom">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                        Log in
                      </h4>
                      <div class="row mt-3">
                        <div class="col-2 text-center ms-auto">
                          <a class="btn btn-link px-3" href="javascript:;">
                            <i class="fa fa-facebook text-white text-lg"></i>
                          </a>
                        </div>
                        <div class="col-2 text-center px-1">
                          <a class="btn btn-link px-3" href="javascript:;">
                            <i class="fa fa-github text-white text-lg"></i>
                          </a>
                        </div>
                        <div class="col-2 text-center me-auto">
                          <a class="btn btn-link px-3" href="javascript:;">
                            <i class="fa fa-google text-white text-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <form role="form" class="text-start">
                      <div class="input-group input-group-outline my-3">
                        {/* <label class="form-label">Email</label> */}
                        <input type="email" class="form-control" placeholder="Email" />
                      </div>
                      <div class="input-group input-group-outline mb-3">
                        {/* <label class="form-label">Password</label> */}
                        <input type="password" class="form-control" placeholder="Password" />
                      </div>
                      <div class="form-check form-check-info text-start ps-0">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          value=""
                          checked=""
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Remember me
                        </label>
                      </div>
                      <div class="text-center">
                        <button
                          type="button"
                          class="btn bg-gradient-primary w-100 my-4 mb-2"
                        >
                          Log in
                        </button>
                      </div>
                      <p class="mt-4 text-sm text-center">
                        Don't have an account? <t />
                        <Link
                          to="/register"
                          class="text-primary text-gradient font-weight-bold"
                        >
                          Register
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="footer position-absolute bottom-2 py-2 w-100">
            <div class="container">
              <div class="row align-items-center justify-content-lg-between">
                <div class="col-12 col-md-6 my-auto">
                  <div class="copyright text-center text-sm text-white text-lg-start">
                    © <script>document.write(new Date().getFullYear())</script>,
                    made with <i class="fa fa-heart" aria-hidden="true"></i> by
                    <a
                      href="https://www.creative-tim.com"
                      class="font-weight-bold text-white"
                      target="_blank"
                    >
                      Creative Tim
                    </a>
                    for a better web.
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                    <li class="nav-item">
                      <a
                        href="https://www.creative-tim.com"
                        class="nav-link text-white"
                        target="_blank"
                      >
                        Creative Tim
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        href="https://www.creative-tim.com/presentation"
                        class="nav-link text-white"
                        target="_blank"
                      >
                        About Us
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        href="https://www.creative-tim.com/blog"
                        class="nav-link text-white"
                        target="_blank"
                      >
                        Blog
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        href="https://www.creative-tim.com/license"
                        class="nav-link pe-0 text-white"
                        target="_blank"
                      >
                        License
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </div>
  );
};

export default Login;
