import React, { useState } from "react";
import axios from "../axiosConfig";
import { jwtDecode } from "jwt-decode"; // Correct the import statement
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

const LoginDentist = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginEmpl } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginEmpl(email, password);
      const token = localStorage.getItem("token");
      console.log("Retrieved token from localStorage:", token);
      if (!token) {
        throw new Error("Token not found");
      }
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      console.log("Decoded token role:", role);
      if (role === "Admin") {
        navigate("/admin-account");
      } else if (role === "Manager") {
        navigate("/manager-account");
      } else if (role === "Dentist") {
        navigate("/dentist-account");
      }
    } catch (error) {
      console.error("Login failed", error);
      // Handle login failure (e.g., show a message to the user)
    }
  };

  return (
    <div>
      <MainHead />
      <body className="sign-in-basic">
        <NavbarTransparent />
        <div
          className="page-header align-items-start min-vh-100"
          style={{
            backgroundImage:
              "url(" +
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8X_MzN2bPWnRkrDi-ZYOqvlTq5a4zyPH3rg&s" +
              ")",
          }}
          loading="lazy"
        >
          <span className="mask bg-gradient-dark opacity-6"></span>
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-warning shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                        Log in <br />
                        <small>for Dentists</small>
                      </h4>
                      <div className="row mt-3">
                        <div className="col-2 text-center ms-auto"></div>
                        <div className="col-2 text-center px-1"></div>
                        <div className="col-2 text-center me-auto"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form
                      role="form"
                      className="text-start"
                      onSubmit={handleSubmit}
                    >
                      <div className="input-group input-group-outline my-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-check form-check-info text-start ps-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn bg-gradient-warning w-100 my-4 mb-2"
                        >
                          Log in
                        </button>
                      </div>
                      <p className="mt-4 text-sm text-center">
                        Are you lost, dear customer? <t />
                        <Link
                          to="/login"
                          className="text-info text-gradient font-weight-bold"
                        >
                          Login here
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

export default LoginDentist;
