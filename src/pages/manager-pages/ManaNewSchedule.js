import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-toastify/dist/ReactToastify.css";

import DashboardHead from "../../components/DashboardHead";
import NavbarDash from "../../components/NavbarDash";
import FooterDash from "../../components/FooterDash";

import { Link, useNavigate } from "react-router-dom";
import SidebarMana from "../../components/SidebarMana";
import { format, startOfWeek, addDays } from "date-fns";

const ManaNewSchedule = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [dentists, setDentists] = React.useState([]);
    const [dentist, setDentist] = useState("");

    useEffect(() => {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios
                .get("/Dentist/get-all-dentists")
                .then((response) => {
                    console.log(response.data);

                    setDentists(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching dentists:", error);
                });
        } catch (e) {
            console.error("Axios error: ", e);
        }
    }, []);

    const handleDentistChange = (e) => {
        const selectedId = e.target.value;
        const selectedName = e.target.options[e.target.selectedIndex].text;
        setDentist(selectedId);
    };

    const weekDates = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

    const [selectedCells, setSelectedCells] = useState([]);

    const handleCellClick = (date, timeslot) => {
        const cellKey = `${date}-${timeslot}`;
        setSelectedCells(prevState => {
            if (prevState.includes(cellKey)) {
                return prevState.filter(cell => cell !== cellKey);
            } else {
                return [...prevState, cellKey];
            }
        });
    };

    const isSelected = (date, timeslot) => {
        const cellKey = `${date}-${timeslot}`;
        return selectedCells.includes(cellKey);
    };

    const [weeks, setWeeks] = useState(1);

    const handleWeeksChange = (event) => {
        setWeeks(event.target.value);
    };

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/manager-dent-list");
    };

    const handleSubmit = () => {
        const dayOfWeekTimeSlots = selectedCells.map(cell => {
            const [dayOfWeek, timeSlot] = cell.split("-");
            return {
                dayOfWeek: weekDates.indexOf(dayOfWeek),
                timeSlot: parseInt(timeSlot),
            };
        });

        const data = {
            dentistId: dentist,
            dayOfWeekTimeSlots,
            startDate: new Date().toISOString(),
            repeatForWeeks: weeks,
        };

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.post("/Schedule/create-schedule", data)
            .then(response => {
                toast.success("Schedule created successfully!");
                navigate("/manager-dent-list");
            })
            .catch(error => {
                toast.error("Error creating schedule");
                console.error("Error creating schedule:", error);
            });
    };

    return (
        <div>
            <DashboardHead />
            <body className="g-sidenav-show bg-gray-200">
                <SidebarMana />
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
                    <NavbarDash />
                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-8">
                                <div className="card my-4">
                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div className="bg-gradient-success shadow-info border-radius-lg pt-4 pb-3">
                                            <h6 className="text-white text-capitalize ps-3">
                                                Creating a new schedule
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="card-body col-6">
                                            <h3>
                                                Please select the dentist&nbsp;
                                            </h3>
                                            <div class="input-group input-group-static mb-4">
                                                <label for="exampleFormControlSelect1" class="ms-0">
                                                    Dentist
                                                </label>
                                                <select
                                                    class="form-control"
                                                    id="treatmentSelect"
                                                    onChange={handleDentistChange}
                                                    value={dentist}
                                                >
                                                    <option value=""></option>
                                                    {dentists.map((dentist) => (
                                                        <option
                                                            key={dentist.dentistId}
                                                            value={dentist.dentistId}
                                                        >
                                                            {dentist.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="card-body col-6">
                                            <h3>
                                                Enter how long they will work&nbsp;
                                            </h3>
                                            <div class="input-group input-group-static mb-4">
                                                <label for="exampleFormControlSelect1" class="ms-0">
                                                    Number of weeks
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="weeksInput"
                                                    onChange={handleWeeksChange}
                                                    value={weeks}
                                                    min="1"
                                                />
                                            </div>
                                        </div>
                                    </div>
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
                                                            {date}
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
                                                            return (
                                                                <td
                                                                    key={colIndex}
                                                                    className={`align-middle text-center text-sm ${isSelected(date, timeslot) ? 'selected' : ''}`}
                                                                    onClick={() => handleCellClick(date, timeslot)}
                                                                >
                                                                    {isSelected(date, timeslot) && (
                                                                        <span className="badge badge-sm bg-gradient-success">
                                                                            Selected
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
                                    <div className="d-flex justify-content-end p-3">
                                        <button className="btn btn-secondary me-2" onClick={handleCancel}>
                                            Cancel
                                        </button>
                                        <button className="btn btn-success" onClick={handleSubmit}>
                                            Submit
                                        </button>
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

export default ManaNewSchedule;