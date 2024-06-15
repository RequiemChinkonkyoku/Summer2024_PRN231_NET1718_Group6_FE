import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../axiosConfig"; // Adjust the path accordingly

const DentistServiceContext = createContext();

export const useAppointments = () => {
    const [appointments, setAppointments] = React.useState([]);
    const [token, setToken] = React.useState(localStorage.getItem("token"));

    React.useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios
                .get("/Appointment/get-account-appointment")
                .then((response) => {
                    setAppointments(response.data);
                });
        }
    }, []);

};

const dentistService = {
    useAppointments,
};

export default dentistService;
