import React, { useState } from "react";
import axios from "../../axiosConfig";

import SidebarMana from "../../components/SidebarMana";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import customerService, { usePatients } from "../../services/CustomerService";
import { Link } from "react-router-dom";

const ManagerTreatList = () => {
    const [treatments, setTreatments] = React.useState([]);

    const [token, setToken] = useState(localStorage.getItem("token"));

    React.useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get("/Treatment/get-all-treatment").then((response) => {
                setTreatments(response.data.value);
            });
        }
    }, []);

    return (
        <div>
            <DashboardHead />
            <body class="g-sidenav-show  bg-gray-200">
                <SidebarMana />
                <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <NavbarDash />
                    <div class="container-fluid py-4">
                        <div class="row">
                            <div class="col-12">
                                <div class="card my-4">
                                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div class="bg-gradient-success shadow-info border-radius-lg pt-4 pb-3">
                                            <h6 class="text-white text-capitalize ps-3">
                                                Treatment List
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="card-body px-0 pb-2">
                                        <div class="card-header pb-0 p-3">
                                            <div class="row">
                                                <div class="col-6 d-flex align-items-center">
                                                    <h6 class="mb-0"></h6>
                                                </div>
                                                <div class="col-6 text-end">
                                                    <Link
                                                        to="/mana-new-dent"
                                                        class="btn bg-gradient-dark mb-0"
                                                    >
                                                        <i class="material-icons text-sm">add</i>
                                                        &nbsp;&nbsp;Add New Treatment
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <br />
                                        </div>
                                        <div class="table-responsive p-0">
                                            <table class="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                            ID
                                                        </th>
                                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                            Name
                                                        </th>
                                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                            Pice
                                                        </th>
                                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                            Status
                                                        </th>
                                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                            Details
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {treatments.map((treatment) => (
                                                        <tr>
                                                            <td>
                                                                <p class="text-xs font-weight-bold mb-0">
                                                                    {treatment.treatmentId}
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <div class="d-flex flex-column justify-content-center">
                                                                    <h6 class="mb-0 text-sm">{treatment.name}</h6>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p class="text-xs font-weight-bold mb-0">
                                                                    {treatment.price}
                                                                </p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                {treatment.status === 1 ? (
                                                                    <span class="badge badge-sm bg-gradient-success">
                                                                        Active
                                                                    </span>
                                                                ) : treatment.status === 0 ? (
                                                                    <span class="badge badge-sm bg-gradient-secondary">
                                                                        Inactive
                                                                    </span>
                                                                ) : (
                                                                    "none"
                                                                )}
                                                            </td>
                                                            <td class="align-middle text-center">
                                                                <input
                                                                    type="hidden"
                                                                    value={treatment.treatmentId}
                                                                />
                                                                <Link
                                                                    key={treatment.treatmentId}
                                                                    to={`/mana-treat-details/${treatment.treatmentId}`}
                                                                    class="text-secondary font-weight-bold text-xs"
                                                                    data-toggle="tooltip"
                                                                    data-original-title="Book for patient"
                                                                >
                                                                    <span class="btn bg-gradient-secondary mb-0">
                                                                        Details
                                                                    </span>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
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

export default ManagerTreatList;