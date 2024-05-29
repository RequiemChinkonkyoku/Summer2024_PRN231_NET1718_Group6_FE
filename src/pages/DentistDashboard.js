import axios from "axios";
import React from "react";

const baseURL = "https://localhost:44329/Dentist";

const DentistDashboard = () => {
  const [dentists, setDentists] = React.useState([]);
  const [selectedDentist, setSelectedDentist] = React.useState(null);
  const [dentistID, setDentistID] = React.useState("");

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDentists(response.data);
    });
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
