import React from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/img/logo-ct.png";

import { useAuth } from "../services/AuthProvider";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      // Handle login failure (e.g., show a message to the user)
    }
  };

  return (
    <aside
      class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
      id="sidenav-main"
    >
      <div class="sidenav-header">
        <i
          class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <a
          class="navbar-brand m-0"
          href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
          target="_blank"
        >
          <img src={logo} class="navbar-brand-img h-100" alt="main_logo" />

          <span class="ms-1 font-weight-bold text-white">
            Arisu Dental Clinic
          </span>
        </a>
      </div>
      <hr class="horizontal light mt-0 mb-2" />
      <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link class="nav-link text-white " to="/dentist-account">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">person</i>
              </div>
              <span class="nav-link-text ms-1">Account</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link text-white " to="/dentist-appointment">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">calendar_month</i>
              </div>
              <span class="nav-link-text ms-1">Appointments</span>
            </Link>
          </li>
        </ul>
      </div>
      <div class="sidenav-footer position-absolute w-100 bottom-0 ">
        <div class="mx-3">
          <form role="form" onSubmit={handleSubmit}>
            <button class="btn bg-gradient-danger w-100" type="submit">
              Log out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
