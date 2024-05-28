import React, { useEffect, useState } from "react";
import axios from "axios";

import logo from "./logo.svg";
import Sidebar from "./components/Sidebar";
import DashboardHead from "./components/DashboardHead";
import MainHead from "./components/MainHead";
import Table from "./components/Table";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "./assets/css/nucleo-icons.css"; // Local CSS file for icons
import "./assets/css/nucleo-svg.css"; // Local CSS file for SVGs
import "./assets/css/material-dashboard.css"; // Local CSS for material dashboard
import "./assets/css/material-kit.css";

const App = () => {
  return (
    <div>
      <MainHead />
      <Navbar />
    </div>
  );
};

export default App;
