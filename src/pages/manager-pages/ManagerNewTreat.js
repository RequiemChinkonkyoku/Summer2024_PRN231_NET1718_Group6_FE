import React, { useState } from "react";
import axios from "../../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import { Link, useNavigate } from "react-router-dom";
import SidebarMana from "../../components/SidebarMana";

const ManagerNewTreat = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === "") {
            toast.error("Name is required.");
            return;
        }

        if (price <= 0) {
            toast.error("Price must be greater than 0.");
            return;
        }

        if (description.trim() === "") {
            toast.error("Description is required.");
            return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await axios
            .post("Treatment/add-treatment", {
                name,
                price,
                description
            }).then(response => {
                toast.success("Schedule created successfully!");
                navigate("/manager-treat-list");
            }).
            catch(error => {
                toast.error("Error when adding treatment");
                console.log("Error: ", error);
            });
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
                                                Adding a new treatment
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h3>
                                            Please enter all the details&nbsp;
                                            <small className="text-muted">of the new treatment.</small>
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
                                                <label>Price</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                            <div className="input-group input-group-static mb-4">
                                                <label>Description</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
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
};

export default ManagerNewTreat
