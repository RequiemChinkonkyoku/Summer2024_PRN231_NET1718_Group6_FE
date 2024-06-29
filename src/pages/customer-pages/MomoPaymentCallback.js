import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";

import Sidebar from "../../components/Sidebar";
import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import { Link, useLocation, useSearchParams } from "react-router-dom";

const MomoPaymentCallback = () => {

    const location = useLocation();
    const [errorCode, setErrorCode] = React.useState('');
    const [orderInfo, setOrderInfo] = React.useState('');
    const [appId, setAppId] = React.useState('no id');
    const [token, setToken] = useState(localStorage.getItem("token"));

    React.useEffect(() => {
        if (token) {
            const params = new URLSearchParams(location.search);

            setOrderInfo(decodeURIComponent(params.get('orderInfo') || ''));
            setErrorCode(params.get('errorCode') || '1');
            setAppId(orderInfo.split('AppointmentID: ')[1]);

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios
                .post(`/Momo/payment-execute/${appId}`)
                .then((response) => {
                    console.log(response.data);
                });
        }
    }, []);

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
                                                Payment Status
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {errorCode === '0' ? (
                                            <div>
                                                <p>Status: Success</p>
                                                <p>Order Info: {orderInfo}</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>Status: Unsuccessful</p>
                                                <p>Error Code: {errorCode}</p>
                                            </div>
                                        )}
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

export default MomoPaymentCallback;