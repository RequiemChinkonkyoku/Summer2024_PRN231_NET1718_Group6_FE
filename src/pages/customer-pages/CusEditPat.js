import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CusEditPat = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);

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
        toast.error("Error fetching patient data.");
      }
    };

    getPatientDetails();
  }, [patientId, token]);

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setYearOfBirth(patient.yearOfBirth);
      setAddress(patient.address);
      setGender(patient.gender);
    }
  }, [patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !yearOfBirth || !address || !gender) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await updatePatient(name, yearOfBirth, address, gender);
      navigate("/customer-patients");
    } catch (error) {
      console.error("Submit failed", error);
      toast.error("Update failed. Please try again.");
    }
  };

  const updatePatient = async (name, yearOfBirth, address, gender) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.put(`/Patient/update-patient/${patientId}`, {
        name,
        yearOfBirth,
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
    setGender(selectedId);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deletePatient();
      navigate("/customer-patients");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Delete failed. Please try again.");
    }
  };

  const deletePatient = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.delete(`/Patient/delete-patient/${patientId}`);
    } catch (error) {
      console.error("Error fetching data.");
      throw new Error("Error");
    }
  };

  if (!patient) return <div>Loading...</div>;

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
                        Editing patient's info
                      </h6>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>
                      Please change the needed details&nbsp;
                      <small className="text-muted">of this patient.</small>
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
                          value={yearOfBirth}
                          onChange={(e) => setYearOfBirth(e.target.value)}
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
                    <br />
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0"></h6>
                      </div>
                      <div className="col-6 text-end">
                        <button
                          onClick={handleDelete}
                          type="submit"
                          className="btn bg-gradient-danger mb-0"
                        >
                          <i className="material-icons text-sm">add</i>
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
