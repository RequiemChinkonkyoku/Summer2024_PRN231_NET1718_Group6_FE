import React from "react";
import { Outlet, Link } from "react-router-dom";

import downArrowDark from "../assets/img/down-arrow-dark.svg";
import downArrow from "../assets/img/down-arrow.svg";
import downArrowWhite from "../assets/img/down-arrow-white.svg";

const NavbarTransparent = () => {
  return (
    <nav class="navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3  navbar-transparent ">
      <div class="container">
        <Link
          to="/"
          class="navbar-brand  text-white "
          href="https://demos.creative-tim.com/material-kit/presentation"
          rel="tooltip"
          title="Designed and Coded by Creative Tim"
          data-placement="bottom"
        >
          Arisu Dental Clinic
        </Link>
        <button
          class="navbar-toggler shadow-none ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navigation"
          aria-controls="navigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon mt-2">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </span>
        </button>
        <div
          class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0 ms-lg-12 ps-lg-5"
          id="navigation"
        >
          <ul class="navbar-nav navbar-nav-hover ms-auto"></ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTransparent;
