import React, { useState } from "react";
import axios from "../../axiosConfig";

import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import dentistService, { useAppointments } from "../../services/DentistService";
import { Link } from "react-router-dom";

const DentistDashboard = () => {
  const [dentists, setDentists] = React.useState([]);
  const [token, setToken] = React.useState(localStorage.getItem("token"));

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/Dentist/get-all-dentists")
        .then((response) => {
          setDentists(response.data);
        });
    }
  }, []);

  if (dentists.length === 0)
    return (
      <div>
        <span>no dentist xd</span>
      </div>
    );

  // return (
  //   <div>
  //     <span>yes dentist</span>
  //     <h1>{dentist.dentistId}</h1>
  //     <p>{dentist.name}</p>
  //   </div>
  // );

  return (
    <div>
      {/* <h3>Fetch Dentist by ID</h3>
      <input
        type="text"
        value={dentistId}
        onChange={(e) => setDentistID(e.target.value)}
        placeholder="Enter Dentist's ID" />
      <button onClick={fetchDentistByID}>Fetch Dentist</button> */}

      <h3>Dentist List</h3>
      <ul>
        {dentists.map((dentist) => (
          <li>
            <h4>{dentist.dentistId}</h4>
            <h4>{dentist.name}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DentistDashboard;
