import React, { useState } from "react";
import axios from "../../axiosConfig";
import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerNewPatient = () => {
  const [name, setName] = useState("");
  const [yoB, setYoB] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !yoB || !address || !gender) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await createNewPatient(name, yoB, address, gender);
      navigate("/customer-patients");
    } catch (error) {
      console.error("Submission failed", error);
      toast.error("Submission failed. Please try again.");
    }
  };

  const [token, setToken] = useState(localStorage.getItem("token"));

  const createNewPatient = async (name, yoB, address, gender) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post("/Patient/add-patient", {
        name,
        yearOfBirth: yoB,
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
      <ToastContainer />
      <body className="g-sidenav-show bg-gray-200">
        <Sidebar />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
          <NavbarDash />
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                      <h6 className="text-white text-capitalize ps-3">
                        Creating a new member
                      </h6>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>
                      Please enter all the details&nbsp;
                      <small className="text-muted">of the new member.</small>
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
                        <label>Year of Birth</label>
                        <input
                          type="number"
                          className="form-control"
                          value={yoB}
                          onChange={(e) => setYoB(e.target.value)}
                        />
                      </div>
                      <div className="input-group input-group-static mb-4">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="input-group input-group-static mb-4">
                        <label
                          htmlFor="exampleFormControlSelect1"
                          className="ms-0"
                        >
                          Gender
                        </label>
                        <select
                          className="form-control"
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
      </body>
    </div>
  );
};

export default CustomerNewPatient;
