import React from "react";
import axios from "axios";

import SidebarDent from "../../components/SidebarDent";
import DashboardHead from "../../components/DashboardHead";

const DentistAccount = () => {
  return (
    <div>
      <DashboardHead />
      <body class="g-sidenav-show  bg-gray-200">
        <SidebarDent />
      </body>
    </div>
  );
};

export default DentistAccount;
