import React from "react";
import axios from "axios";

import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";

const CustomerAccount = () => {
  return (
    <div>
      <DashboardHead />
      <body class="g-sidenav-show  bg-gray-200">
        <Sidebar />
      </body>
    </div>
  );
};

export default CustomerAccount;
