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
          <ul class="navbar-nav navbar-nav-hover ms-auto">
            <li class="nav-item ms-lg-auto">
              <a
                class="nav-link nav-link-icon me-2"
                href="https://github.com/RequiemChinkonkyoku/Summer2024_PRN231_NET1718_Group6_FE.git"
                target="_blank"
              >
                <i class="fa fa-github me-1" aria-hidden="true"></i>
                <p
                  class="d-inline text-sm z-index-1 font-weight-bold"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-original-title="Star us on Github"
                >
                  FE
                </p>
              </a>
            </li>
            <li class="nav-item ms-lg-auto">
              <a
                class="nav-link nav-link-icon me-2"
                href="https://github.com/RequiemChinkonkyoku/Summer2024_PRN231_NET1718_Group6_BE.git"
                target="_blank"
              >
                <i class="fa fa-github me-1" aria-hidden="true"></i>
                <p
                  class="d-inline text-sm z-index-1 font-weight-bold"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-original-title="Star us on Github"
                >
                  BE
                </p>
              </a>
            </li>
            {/* <li class="nav-item my-auto ms-3 ms-lg-0">
              <a
                href="https://www.creative-tim.com/product/material-kit-pro"
                class="btn btn-sm  bg-gradient-primary  mb-0 me-1 mt-2 mt-md-0"
              >
                Upgrade to Pro
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTransparent;
