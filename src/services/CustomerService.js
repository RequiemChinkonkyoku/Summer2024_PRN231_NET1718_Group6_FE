import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../axiosConfig"; // Adjust the path accordingly

const CustomerServiceContext = createContext();

export const bookAppointment = async (
  patientId,
  arrivalDate,
  timeSlot,
  bookingPrice,
  scheduleId,
  treatmentId,
  dentistId
) => {
  try {
    const response = await axios.post("/Appointment/create-appointment", {
      patientId,
      arrivalDate,
      timeSlot,
      bookingPrice,
      scheduleId,
      treatmentId,
      dentistId,
    });
    console.log("Book response:", response.data); // Debug log
  } catch (error) {
    console.error("Booking failed", error);
    throw new Error("Booking failed");
  }
};

export const usePatients = () => {
  const [patients, setPatients] = React.useState([]);
  const [selectedPatient, setSelectedPatient] = React.useState(null);
  const [patientID, setPatientID] = React.useState("");

  React.useEffect(() => {
    axios.get("/Patient/get-all-patients").then((response) => {
      setPatients(response.data);
    });
  }, []);
};

const customerService = {
  bookAppointment,
  usePatients,
};

export default customerService;
