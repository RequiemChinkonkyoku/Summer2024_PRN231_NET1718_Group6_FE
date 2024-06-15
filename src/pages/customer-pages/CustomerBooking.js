import React, { useState } from "react";
import axios from "../../axiosConfig";
import { useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";

import MultiStepForm from "../../components/MultistepForm";

const CustomerBooking = () => {
  const { patientId, setPatientId } = useParams();

  return (
    <div>
      <DashboardHead />
      <body class="g-sidenav-show  bg-gray-200">
        <Sidebar />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <div class="container-fluid py-4">
            <div class="row">
              <div class="col-lg-8 col-md-10 mx-auto">
                <div class="card mt-4">
                  <MultiStepForm data={patientId} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </div>
  );
};

export default CustomerBooking;
