import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainHead from "../components/MainHead";
import NavbarTransparent from "../components/NavbarTransparent";
import FooterTransparent from "../components/FooterTransparent";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/nucleo-icons.css";
import "../assets/css/nucleo-svg.css";
import "../assets/css/material-dashboard.css";
import "../assets/css/material-kit.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { registerCust } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await registerCust(email, password);
      setMessage("A verification email has been sent to your inbox.");
      toast.success(
        "Registration successful! Check your email for verification."
      );
    } catch (error) {
      console.error("Register failed", error);
      setMessage("Registration failed. Please try again.");
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <MainHead />
      <ToastContainer />
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
                    <div className="bg-gradient-info shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                        Register
                      </h4>
                      <div className="row mt-3">
                        <div className="col-2 text-center ms-auto"></div>
                        <div className="col-2 text-center px-1"></div>
                        <div className="col-2 text-center me-auto"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {message && (
                      <div className="alert alert-info" role="alert">
                        {message}
                      </div>
                    )}
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
                          value=""
                          checked=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          I agree to the Terms & Conditions
                        </label>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn bg-gradient-info w-100 my-4 mb-2"
                        >
                          Register
                        </button>
                      </div>
                      <p className="mt-4 text-sm text-center">
                        Already have an account? <t />
                        <Link
                          to="/login"
                          className="text-info text-gradient font-weight-bold"
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
