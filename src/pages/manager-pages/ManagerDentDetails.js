import React, { useImperativeHandle, useState } from "react";
import axios from "../../axiosConfig";
import { useParams } from "react-router-dom";

import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";
import SidebarMana from "../../components/SidebarMana";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfWeek, addDays } from "date-fns";

const ManagerDentDetails = () => {
  const { dentistId } = useParams();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [dentist, setDentist] = useState([]);
  const [schedules, setSchedules] = useState([]);

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get(`/Dentist/get-dentist-by-id/${dentistId}`).then((response) => {
        setDentist(response.data);
        console.log(response.data);
      });
    }
  }, []);

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get(`/Dentist/view-dentist-schedule/${dentistId}`).then((response) => {
        setSchedules(response.data);
        console.log(response.data);
      });
    }
  }, []);

  const [date, setDate] = useState(null);
  const [weekDates, setWeekDates] = useState([]);

  const handleDateChange = (date) => {
    const startOfSelectedWeek = startOfWeek(date, { weekStartsOn: 0 }); // Start week on Sunday
    const week = Array.from({ length: 7 }, (_, i) =>
      addDays(startOfSelectedWeek, i)
    );
    setWeekDates(week);
    setDate(date);
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
      <DashboardHead />
      <body class="g-sidenav-show  bg-gray-200">
        <SidebarMana />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <NavbarDash />
          <div class="container-fluid py-4">
            <div class="row mb-4">
              <div class="col-md-4">
                <div class="card h-100">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-success shadow-info border-radius-lg pt-4 pb-3">
                      <h4 class="text-white text-capitalize ps-3">
                        Dentist Details
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Dentist Information</h4>
                        <p className="mb-1">
                          <strong>ID:</strong> {dentist.dentistId}
                        </p>
                        <p className="mb-1">
                          <strong>Name:</strong> {dentist.name}
                        </p>
                        <p className="mb-1">
                          <strong>Email:</strong> {dentist.email}
                        </p>
                        <p className="mb-1">
                          <strong>Contract:</strong>{" "}
                          {dentist.contractType === "Full-time" ? (
                            <span class="badge badge-sm bg-gradient-info">
                              {dentist.contractType}
                            </span>
                          ) : dentist.contractType === "Part-time" ? (
                            <span class="badge badge-sm bg-gradient-warning">
                              {dentist.contractType}
                            </span>
                          ) : (
                            "none"
                          )}
                        </p>
                        <p className="mb-1">
                          <strong>Status:</strong>{" "}
                          {dentist.status === 1 ? (
                            <span class="badge badge-sm bg-gradient-success">
                              Active
                            </span>
                          ) : dentist.status === 0 ? (
                            <span class="badge badge-sm bg-gradient-secondary">
                              Inactive
                            </span>
                          ) : (
                            "none"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card h-100">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-success shadow-info border-radius-lg pt-4 pb-3">
                      <h4 class="text-white text-capitalize ps-3">
                        Dentist Schedule
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <h5>Select a Date</h5>
                      <DatePicker
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Choose a date"
                        customInput={<CustomInput />}
                        selected={date}
                      />
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
                                            ? {
                                              class: "badge badge-sm badge-success",
                                            }
                                            : {};
                                        return (
                                          <td
                                            key={colIndex}
                                            class="align-middle text-center text-sm"
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
                        </div>
                      )}
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

export default ManagerDentDetails;
