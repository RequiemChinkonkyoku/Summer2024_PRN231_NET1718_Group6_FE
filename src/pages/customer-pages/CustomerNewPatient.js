import React, { useState } from "react";
import axios from "../../axiosConfig";

import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import customerService, { usePatients } from "../../services/CustomerService";
import { Link, useNavigate } from "react-router-dom";

const CustomerNewPatient = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewPatient(name, age, address, gender);
      navigate("/customer-patients");
    } catch (error) {
      console.error("Login failed", error);
      // Handle login failure (e.g., show a message to the user)
    }
  };

  const [token, setToken] = useState(localStorage.getItem("token"));

  const createNewPatient = async (name, age, address, gender) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post("/Patient/add-patient", {
        name,
        age,
        address,
        gender,
      });
      console.log("Response:", response.data); // Debug log
    } catch (error) {
      console.error("Error", error);
      throw new Error("Error");
    }
  };

  const [selection, setSelection] = useState({
    id: "",
    name: "",
  });
  const handleChange = (e) => {
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    setSelection({ id: selectedId, name: selectedName });
    setGender(selectedId);
    console.log("id: " + selectedId);
  };

  return (
    <div>
      <DashboardHead />
      <body class="g-sidenav-show  bg-gray-200">
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
                        Creating a new patient
                      </h6>
                    </div>
                  </div>
                  <div class="card-body">
                    <h3>
                      Please enter all the details&nbsp;
                      <small class="text-muted">of the new patient.</small>
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

export default CustomerNewPatient;
