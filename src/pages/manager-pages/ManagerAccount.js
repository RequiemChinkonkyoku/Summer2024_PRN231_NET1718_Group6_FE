import React from "react";
import axios from "axios";

import SidebarMana from "../../components/SidebarMana";
import DashboardHead from "../../components/DashboardHead";

const ManagerAccount = () => {
  return (
    <div>
      <DashboardHead />
      <body class="g-sidenav-show  bg-gray-200">
        <SidebarMana />
      </body>
    </div>
  );
};

export default ManagerAccount;
