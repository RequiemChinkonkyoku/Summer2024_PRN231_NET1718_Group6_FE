import React, { useState } from "react";
import axios from "../../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import { Link, useNavigate } from "react-router-dom";
import SidebarMana from "../../components/SidebarMana";
import {
  validateName,
  validateEmail,
  validateContractType,
} from "../../services/ValidationService";

const ManaNewDent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456");
  const [contractType, setContractType] = useState("");
  const [type, setType] = useState("1");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !validateName(name) ||
      !validateEmail(email) ||
      !validateContractType(contractType)
    ) {
      return;
    }
    try {
      await createNewDentist(name, email, password, contractType, type);
      navigate("/manager-dent-list");
    } catch (error) {
      console.error("Add failed", error);
    }
  };

  const [token, setToken] = useState(localStorage.getItem("token"));

  const createNewDentist = async (
    name,
    email,
    password,
    contractType,
    type
  ) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post("/Dentist/add-dentist", {
        name,
        email,
        password,
        contractType,
        type,
      });
      console.log("Response:", response.data);
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
    setContractType(selectedId);
    console.log("id: " + selectedId);
  };

  return (
    <div>
      <DashboardHead />
      <body className="g-sidenav-show bg-gray-200">
        <SidebarMana />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
          <NavbarDash />
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-success shadow-info border-radius-lg pt-4 pb-3">
                      <h6 className="text-white text-capitalize ps-3">
                        Adding a new dentist
                      </h6>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>
                      Please enter all the details&nbsp;
                      <small className="text-muted">of the new dentist.</small>
                    </h3>
                    <form
                      role="form"
                      className="text-start"
                      onSubmit={handleSubmit}
                    >
                      <div className="input-group input-group-static mb-4">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="input-group input-group-static mb-4">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="input-group input-group-static mb-4">
                        <label>Password (Default, do not change)</label>
                        <input
                          type="text"
                          className="form-control"
                          value={password}
                          readOnly
                        />
                      </div>
                      <div className="input-group input-group-static mb-4">
                        <label
                          htmlFor="exampleFormControlSelect1"
                          className="ms-0"
                        >
                          Contract
                        </label>
                        <select
                          className="form-control"
                          id="genderSelect"
                          onChange={handleChange}
                          value={contractType}
                        >
                          <option value=""></option>
                          <option key="Full-time" value="Full-time">
                            Full-time
                          </option>
                          <option key="Part-time" value="Part-time">
                            Part-time
                          </option>
                        </select>
                      </div>
                      <div className="row">
                        <div className="col-6 d-flex align-items-center">
                          <h6 className="mb-0"></h6>
                        </div>
                        <div className="col-6 text-end">
                          <button
                            type="submit"
                            className="btn bg-gradient-dark mb-0"
                          >
                            <i className="material-icons text-sm">add</i>
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
        <ToastContainer />
      </body>
    </div>
  );
};

export default ManaNewDent;
