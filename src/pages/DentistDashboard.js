import axios from "axios";
import React from "react";

const baseURL = "https://localhost:44329/Dentist/1";

const DentistDashboard = () => {
  const [dentist, setDentist] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDentist(response.data);
    });
  }, []);
  if (!dentist)
    return (
      <div>
        <span>no dentist xd</span>
      </div>
    );

  return (
    <div>
      <span>yes dentist</span>
      <h1>{dentist.dentistId}</h1>
      <p>{dentist.name}</p>
    </div>
  );
};

export default DentistDashboard;
