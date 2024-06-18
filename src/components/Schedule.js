import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "../axiosConfig";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfWeek, addDays } from "date-fns";

import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "../assets/css/nucleo-icons.css"; // Local CSS file for icons
import "../assets/css/nucleo-svg.css"; // Local CSS file for SVGs
import "../assets/css/material-dashboard.css"; // Local CSS for material dashboard
import "../assets/css/material-kit.css";

const ScheduleTable = ({ treatment }) => {
  const [weekDates, setWeekDates] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [selectedSlot, setSelectedSlot] = useState({
    date: "",
    timeslot: "",
    status: "",
  });

  const [treatmentId, setTreatmentId] = React.useState([]);
  useEffect(() => {
    console.log("treatTransfer: " + treatment);
    setTreatmentId(treatment);
  }, [treatmentId, token, weekDates, treatment]);

  useEffect(() => {
    if (token && treatmentId) {
      // Ensure selectedDate is truthy before making the API call
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(`/Schedule/get-schedules-for-app?treatmentId=${treatmentId}`)
        .then((response) => {
          setSchedules(response.data);
        })
        .catch((error) => {
          console.error("Error fetching schedules:", error);
          console.log(treatmentId);
        });
    }
  }, [treatmentId, token, weekDates, treatment]);

  const handleDateChange = (date) => {
    const startOfSelectedWeek = startOfWeek(date, { weekStartsOn: 0 }); // Start week on Sunday
    const week = Array.from({ length: 7 }, (_, i) =>
      addDays(startOfSelectedWeek, i)
    );
    setWeekDates(week);
  };

  const timeslotMap = {
    1: "09:00 - 10:00",
    2: "10:00 - 11:00",
    3: "11:00 - 12:00",
    4: "12:00 - 13:00",
    5: "13:00 - 14:00",
    6: "14:00 - 15:00",
    7: "15:00 - 16:00",
    8: "16:00 - 17:00",
  };

  const timeslots = Object.keys(timeslotMap);

  const getStatusForCell = (date, timeslot) => {
    const schedule = schedules.find(
      (sch) =>
        format(new Date(sch.workDate), "yyyy-MM-dd") ===
          format(date, "yyyy-MM-dd") &&
        sch.timeSlot === timeslot &&
        sch.status === 1
    );
    return schedule ? "available" : "unavailable";
  };

  const handleCellClick = (date, timeslot) => {
    const status = getStatusForCell(date, parseInt(timeslot));
    if (status === "available") {
      setSelectedSlot({ date: format(date, "yyyy-MM-dd"), timeslot, status });
    }
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      className="custom-datepicker"
      value={value}
      onClick={onClick}
      readOnly
      ref={ref}
    />
  ));

  return (
    <div>
      <h5>Select a Date</h5>
      <DatePicker
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        placeholderText="Choose a date"
        customInput={<CustomInput />}
      />

      <h5>Select a slot</h5>
      {weekDates.length > 0 && (
        <div>
          <div class="card">
            <div class="table-responsive">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Time
                    </th>
                    {weekDates.map((date, index) => (
                      <th
                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                        key={index}
                      >
                        {format(date, "yyyy-MM-dd")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeslots.map((timeslot, rowIndex) => (
                    <tr key={rowIndex}>
                      <td class="text-secondary text-xs font-weight-normal">
                        {timeslotMap[timeslot]}
                      </td>
                      {weekDates.map((date, colIndex) => {
                        const status = getStatusForCell(
                          date,
                          parseInt(timeslot)
                        );
                        const cellStyle =
                          status === "available"
                            ? { class: "badge badge-sm badge-success" }
                            : {};
                        return (
                          <td
                            key={colIndex}
                            class="align-middle text-center text-sm"
                            onClick={() => handleCellClick(date, timeslot)}
                          >
                            {status === "available" && (
                              <span class="badge badge-sm bg-gradient-success">
                                Available
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <br />
            <h5>Selected time</h5>
            <input
              type="text"
              value={
                selectedSlot.date && selectedSlot.timeslot
                  ? `Date: ${selectedSlot.date}, Timeslot: ${
                      timeslotMap[selectedSlot.timeslot]
                    }, Status: ${selectedSlot.status}`
                  : ""
              }
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTable;
