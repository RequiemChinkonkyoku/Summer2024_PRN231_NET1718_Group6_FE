import React, { useEffect, useState } from "react";
import axios from "axios";

import MainHead from "../components/MainHead";
import NavbarTransparent from "../components/NavbarTransparent";
import FooterTransparent from "../components/FooterTransparent";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "../assets/css/nucleo-icons.css"; // Local CSS file for icons
import "../assets/css/nucleo-svg.css"; // Local CSS file for SVGs
import "../assets/css/material-dashboard.css"; // Local CSS for material dashboard
import "../assets/css/material-kit.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";

import Scripts from "../components/Scripts";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerCust } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerCust(email, password);
      // const token = localStorage.getItem("token");
      // console.log("Retrieved token from localStorage:", token);
      // if (!token) {
      //   throw new Error("Token not found");
      // }
      // const decodedToken = jwtDecode(token);
      // const role = decodedToken.role;
      // console.log("Decoded token role:", role);
      // if (role === "Customer") {
      //   navigate("/customer-account");
      // }
    } catch (error) {
      // notifyApiFailed();
      console.error("Register failed", error);
      // Handle login failure (e.g., show a message to the user)
    }
  };

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
                    <div class="bg-gradient-info shadow-primary border-radius-lg py-3 pe-1">
                      <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                        Register
                      </h4>
                      <div class="row mt-3">
                        <div class="col-2 text-center ms-auto"></div>
                        <div class="col-2 text-center px-1"></div>
                        <div class="col-2 text-center me-auto"></div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <form
                      role="form"
                      class="text-start"
                      onSubmit={handleSubmit}
                    >
                      <div class="input-group input-group-outline my-3">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div class="input-group input-group-outline mb-3">
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
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
                          I agree to the Terms & Conditions
                        </label>
                      </div>
                      <div class="text-center">
                        <button
                          type="submit"
                          class="btn bg-gradient-info w-100 my-4 mb-2"
                        >
                          Register
                        </button>
                      </div>
                      <p class="mt-4 text-sm text-center">
                        Already have an account? <t />
                        <Link
                          to="/login"
                          class="text-info text-gradient font-weight-bold"
                        >
                          Log in
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterTransparent />
        </div>
      </body>
    </div>
  );
};

export default Register;
