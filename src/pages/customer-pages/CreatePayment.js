import React, { useState } from "react";
import axios from "../../axiosConfig";

import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import { Link, Navigate, useParams } from "react-router-dom";

const CreatePayment = () => {
    const { appId } = useParams();
    const [appointment, setAppointment] = React.useState(null);
    const [payUrl, setPayUrl] = React.useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));

    React.useEffect(() => {
        if (token && appId) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios
                .get(`/Appointment/get-app-by-id/${appId}`)
                .then((response) => {
                    console.log(response.data);
                    setAppointment(response.data);
                });
        }
    }, []);

    const handleCreatePayment = (e) => {
        e.preventDefault();

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios
            .post(`/Momo/create-payment`, {
                "fullName": appointment?.patient?.name,
                "appointmentId": appId,
                "orderId": "",
                "orderInfo": "",
                "amount": appointment?.totalPrice
            })
            .then((response) => {
                console.log(response.data);

                window.location.href = response.data.momoPaymentResponse.payUrl;
            })
            .catch((error) => {
                console.error("Error creating payment: ", error);
            });
    };

    return (
        <div>
            <DashboardHead />
            <body class="g-sidenav-show  bg-gray-200">
                <Sidebar />
                <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <NavbarDash />
                    <div class="container-fluid py-4">
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="card h-100">
                                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div class="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                                            <h4 class="text-white text-capitalize ps-3">
                                                Payment Details
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div>
                                                <p className="mb-1"><strong>AppointmentID:</strong> {appId}</p>
                                                <p className="mb-1"><strong>Name:</strong> {appointment?.patient?.name}</p>
                                                <p className="mb-1"><strong>Total Price:</strong> {appointment?.totalPrice} VND</p>
                                            </div>
                                            <div>
                                                <input type="submit" className="btn bg-gradient-info" value="Pay" onClick={handleCreatePayment} />
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

export default CreatePayment;