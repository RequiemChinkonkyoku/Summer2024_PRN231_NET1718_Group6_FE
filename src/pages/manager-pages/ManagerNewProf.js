import React, { useState } from "react";
import axios from "../../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import { Link, useNavigate, useParams } from "react-router-dom";
import SidebarMana from "../../components/SidebarMana";
import Select from "react-select";

const ManagerNewProf = () => {
    const { treatmentId } = useParams();
    const [dentists, setDentists] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [selectedDentists, setSelectedDentists] = useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios
                .get("Dentist/get-all-dentists")
                .then(response => {
                    const dentistOptions = response.data.map(dentist => ({
                        value: dentist.id,
                        label: dentist.name
                    }));

                    setDentists(dentistOptions);
                    console.log(dentistOptions);
                })
                .catch(error => {
                    toast.error("Error has occured while getting dentist");
                    console.error("Error: ", error);
                });
        } catch (error) {
            console.error("Axios error", error);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedDentists.length <= 0) {
            toast.error("At least one dentist must be selected");
            return;
        }

        try {
            const dentistIds = selectedDentists.map(dentist => dentist.value);
            const data = {
                TreatmentId: treatmentId,
                dentistIds: dentistIds
            };

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await axios
                .post("Profession/add-new-prof", data)
                .then(response => {
                    navigate("/mana-treat-list");
                })
                .catch(error => {
                    toast.error("There has been an error adding profession");
                    console.error("Error: ", error);
                });
        }
        catch (error) {
            toast.error("There has been an error mapping dentistIds");
            console.error("Error: ", error);
        }
    }

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
                                                Adding a new profession
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h3>
                                            Please select the dentist to add&nbsp;
                                        </h3>
                                        <form
                                            role="form"
                                            className="text-start"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="input-group input-group-static mb-4">
                                                <Select
                                                    isMulti
                                                    options={dentists}
                                                    onChange={setSelectedDentists}
                                                />
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
}

export default ManagerNewProf;