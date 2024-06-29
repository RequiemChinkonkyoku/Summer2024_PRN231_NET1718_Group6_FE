import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";

import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import { Link, useNavigate, useParams } from "react-router-dom";

const CusEditPat = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null); // Start with null

  const navigate = useNavigate();

  useEffect(() => {
    const getPatientDetails = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(
          `/Patient/get-patient-by-id/${patientId}`
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching data.");
      }
    };

    getPatientDetails();
  }, [patientId, token]);

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setAge(patient.age);
      setAddress(patient.address);
      setGender(patient.gender);
    }
  }, [patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePatient(name, age, address, gender);
      navigate("/customer-patients");
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  const updatePatient = async (name, age, address, gender) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.put(`/Patient/update-patient/${patientId}`, {
        name,
        age,
        address,
        gender,
      });
    } catch (error) {
      console.error("Error", error);
      throw new Error("Error");
    }
  };

  const handleChange = (e) => {
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    setGender(selectedId);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deletePatient();
      navigate("/customer-patients");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const deletePatient = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.delete(`/Patient/delete-patient/${patientId}`);
    } catch (error) {
      console.error("Error fetching data.");
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <DashboardHead />
      <body class="g-sidenav-show bg-gray-200">
        <Sidebar />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
          <NavbarDash />
          <div class="container-fluid py-4">
            <div class="row">
              <div class="col-12">
                <div class="card my-4">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                      <h6 class="text-white text-capitalize ps-3">
                        Editing patient's info
                      </h6>
                    </div>
                  </div>
                  <div class="card-body">
                    <h3>
                      Please change the needed details&nbsp;
                      <small class="text-muted">of this patient.</small>
                    </h3>
                    <form
                      role="form"
                      class="text-start"
                      onSubmit={handleSubmit}
                    >
                      <div class="input-group input-group-static mb-4">
                        <label>Name</label>
                        <input
                          type="text"
                          class="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div class="input-group input-group-static mb-4">
                        <label>Age</label>
                        <input
                          type="number"
                          class="form-control"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                      <div class="input-group input-group-static mb-4">
                        <label>Address</label>
                        <input
                          type="text"
                          class="form-control"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div class="input-group input-group-static mb-4">
                        <label for="exampleFormControlSelect1" class="ms-0">
                          Gender
                        </label>
                        <select
                          class="form-control"
                          id="genderSelect"
                          onChange={handleChange}
                          value={gender}
                        >
                          <option value=""></option>
                          <option key="1" value="1">
                            Male
                          </option>
                          <option key="2" value="2">
                            Female
                          </option>
                        </select>
                      </div>
                      <div class="row">
                        <div class="col-6 d-flex align-items-center">
                          <h6 class="mb-0"></h6>
                        </div>
                        <div class="col-6 text-end">
                          <button
                            type="submit"
                            class="btn bg-gradient-dark mb-0"
                          >
                            <i class="material-icons text-sm">add</i>
                            &nbsp;&nbsp;Confirm
                          </button>
                        </div>
                      </div>
                    </form>
                    <br />
                    <div class="row">
                      <div class="col-6 d-flex align-items-center">
                        <h6 class="mb-0"></h6>
                      </div>
                      <div class="col-6 text-end">
                        <button
                          onClick={handleDelete}
                          type="submit"
                          class="btn bg-gradient-danger mb-0"
                        >
                          <i class="material-icons text-sm">add</i>
                          &nbsp;&nbsp;Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FooterDash />
          </div>
        </main>
      </body>
    </div>
  );
};

export default CusEditPat;
