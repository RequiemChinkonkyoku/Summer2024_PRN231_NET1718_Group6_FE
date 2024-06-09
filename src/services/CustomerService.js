import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../axiosConfig"; // Adjust the path accordingly

const CustomerServiceContext = createContext();

const bookAppointment = async (
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

export default bookAppointment;
