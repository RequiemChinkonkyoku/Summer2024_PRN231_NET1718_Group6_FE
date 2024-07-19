import React, { useImperativeHandle, useState } from "react";
import axios from "../../axiosConfig";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";
import SidebarMana from "../../components/SidebarMana";

const ManagerTreatDetails = () => {
    const { treatmentId } = useParams();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [treatment, setTreatment] = useState("");
    const [professions, setProfessions] = useState([]);

    React.useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get(`/Treatment/get-treatment-by-id/${treatmentId}`).then((response) => {
                setTreatment(response.data);
                console.log(response.data);
            });
        }
    }, []);

    // React.useEffect(() => {
    //     setProfessions(treatment.professions);
    //     console.log(professions);
    // });

    return (
        <div>
            <DashboardHead />
            <body class="g-sidenav-show  bg-gray-200">
                <SidebarMana />
                <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <NavbarDash />
                    <div class="container-fluid py-4">
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="card h-100">
                                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div class="bg-gradient-success shadow-info border-radius-lg pt-4 pb-3">
                                            <h4 class="text-white text-capitalize ps-3">
                                                Treatment Details
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h4>Treatment Information</h4>
                                                <p className="mb-1">
                                                    <strong>ID:</strong> {treatment.treatmentId}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>Name:</strong> {treatment.name}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>Price:</strong> {treatment.price}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>Status:</strong>{" "}
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
                                                </p>
                                                <p className="mb-1">
                                                    <strong>Description:</strong> {treatment.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="col-md-6">
                                <div class="card h-100">
                                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div class="bg-gradient-success shadow-info border-radius-lg pt-4 pb-3">
                                            <h4 class="text-white text-capitalize ps-3">
                                                Dentists that provides this treatment
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <ul class="navbar-nav">
                                            {professions.length > 0 && (
                                                <li class="nav-item">
                                                    <div>
                                                        {professions.map((profession) => (
                                                            <div key={profession.dentistId}>
                                                                <Link
                                                                    to={`/dentist/${profession.dentist.dentistId}`}
                                                                    style={{ display: 'flex', alignItems: 'center' }}
                                                                >
                                                                    <i class="material-icons opacity-10 text-center me-2 align-items-center">person</i>
                                                                    <span>{profession.dentist.name}</span>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <FooterDash />
                    </div>
                </main>
            </body>
        </div >
    );
};

export default ManagerTreatDetails;
