import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import "../assets/custom/multistepForm.css"; // Ensure you have the styles
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfWeek, addDays } from "date-fns";

import Schedule from "./Schedule";
import ScheduleTable from "./Schedule";
import { useNavigate } from "react-router-dom";

const MultiStepForm = ({ id }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fieldsets = Array.from(document.querySelectorAll("fieldset"));
    setSteps(fieldsets);
    setProgressBar(currentStep, fieldsets.length);
  }, [currentStep]);

  const setProgressBar = (curStep, totalSteps) => {
    const percent = (100 / totalSteps) * curStep;
    document.querySelector(
      ".progress-bar"
    ).style.width = `${percent.toFixed()}%`;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const current_fs = e.target.closest("fieldset");
    const next_fs = current_fs.nextElementSibling;

    if (next_fs) {
      // Add Class Active
      document
        .querySelectorAll("#progressbar li")
        [Array.from(steps).indexOf(next_fs)].classList.add("active");

      // Show the next fieldset
      next_fs.style.display = "block";

      // Hide the current fieldset with style
      current_fs.style.opacity = 0;
      next_fs.style.opacity = 0;
      let opacity = 0;

      const animate = () => {
        opacity += 0.1;
        current_fs.style.opacity = 1 - opacity;
        next_fs.style.opacity = opacity;
        if (opacity < 1) {
          requestAnimationFrame(animate);
        } else {
          current_fs.style.display = "none";
        }
      };
      animate();

      setCurrentStep((current) => current + 1);
      setProgressBar(currentStep + 1, steps.length);
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    const current_fs = e.target.closest("fieldset");
    const previous_fs = current_fs.previousElementSibling;

    if (previous_fs && currentStep === 2) {
      // Reset selectedSlot, date, timeSlot, and related state variables
      setSelectedSlot({ date: "", timeslot: "", status: "" });
      setDate("");
      setTimeSlot("");
      setIsNextDisabled2(true);
      setWeekDates(Array.from({ length: 0 }));

      // Remove class active
      document
        .querySelectorAll("#progressbar li")
        [Array.from(steps).indexOf(current_fs)].classList.remove("active");

      // Show the previous fieldset
      previous_fs.style.display = "block";

      // Hide the current fieldset with style
      current_fs.style.opacity = 0;
      previous_fs.style.opacity = 0;
      let opacity = 0;

      const animate = () => {
        opacity += 0.1;
        current_fs.style.opacity = 1 - opacity;
        previous_fs.style.opacity = opacity;
        if (opacity < 1) {
          requestAnimationFrame(animate);
        } else {
          current_fs.style.display = "none";
        }
      };
      animate();

      setCurrentStep((current) => current - 1);
      setProgressBar(currentStep - 1, steps.length);
    } else if (previous_fs && currentStep === 3) {
      setDentist("");
      // Remove class active
      document
        .querySelectorAll("#progressbar li")
        [Array.from(steps).indexOf(current_fs)].classList.remove("active");

      // Show the previous fieldset
      previous_fs.style.display = "block";

      // Hide the current fieldset with style
      current_fs.style.opacity = 0;
      previous_fs.style.opacity = 0;
      let opacity = 0;

      const animate = () => {
        opacity += 0.1;
        current_fs.style.opacity = 1 - opacity;
        previous_fs.style.opacity = opacity;
        if (opacity < 1) {
          requestAnimationFrame(animate);
        } else {
          current_fs.style.display = "none";
        }
      };
      animate();

      setCurrentStep((current) => current - 1);
      setProgressBar(currentStep - 1, steps.length);
    } else if (previous_fs) {
      // For other fieldsets, perform standard navigation
      // Remove class active
      document
        .querySelectorAll("#progressbar li")
        [Array.from(steps).indexOf(current_fs)].classList.remove("active");

      // Show the previous fieldset
      previous_fs.style.display = "block";

      // Hide the current fieldset with style
      current_fs.style.opacity = 0;
      previous_fs.style.opacity = 0;
      let opacity = 0;

      const animate = () => {
        opacity += 0.1;
        current_fs.style.opacity = 1 - opacity;
        previous_fs.style.opacity = opacity;
        if (opacity < 1) {
          requestAnimationFrame(animate);
        } else {
          current_fs.style.display = "none";
        }
      };
      animate();

      setCurrentStep((current) => current - 1);
      setProgressBar(currentStep - 1, steps.length);
    }
  };

  const [patientId, setPatientID] = React.useState([]);
  useEffect(() => {
    setPatientID(id);
    console.log("effect: " + id);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`/Patient/get-patient-by-id/${id}`)
      .then((response) => {
        setPatientName(response.data.name);
      })
      .catch((error) => {});
  }, []);

  const [treatments, setTreatments] = React.useState([]);
  React.useEffect(() => {
    axios.get("/Treatment/get-all-treatment").then((response) => {
      setTreatments(response.data.value);
    });
  }, []);

  const [selectedTreatment, setSelectedTreatment] = useState({
    id: "",
    name: "",
  });
  const [treatment, setTreatment] = useState("");
  const [isNextDisabled1, setIsNextDisabled1] = useState(true);
  const [isNextDisabled2, setIsNextDisabled2] = useState(true);
  const [isNextDisabled3, setIsNextDisabled3] = useState(true);

  const handleTreatmentChange = (e) => {
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    // setSelection({ id: selectedId, name: selectedName });
    setSelectedTreatment({ id: selectedId, name: selectedName });
    setTreatment(selectedId);
    if (!selectedId) {
      setIsNextDisabled1(true);
    } else {
      setIsNextDisabled1(false);
    }
    console.log("id: " + selectedId);
    console.log("patId: " + patientId);
  };

  const [dentists, setDentists] = React.useState([]);
  const getDentists = () => {
    try {
      axios
        .post("/Dentist/get-dentist-for-app", {
          treatmentId: treatment,
          date: scheduleDate,
          timeSlot: timeSlot,
        })
        .then((response) => {
          setDentists(response.data);
        })
        .catch((error) => {
          console.error("Error fetching dentists:", error);
        });
    } catch (e) {}
  };

  const [dentist, setDentist] = useState("");

  const handleDentistChange = (e) => {
    const selectedId = e.target.value;
    const selectedScheduleId =
      e.target.options[e.target.selectedIndex].getAttribute("data-schedule-id");
    const selectedName = e.target.options[e.target.selectedIndex].text;
    // setSelection({ id: selectedId, name: selectedName });
    setDentist(selectedId);
    setSId(selectedScheduleId);
    if (!selectedId) {
      setIsNextDisabled3(true);
    } else {
      setIsNextDisabled3(false);
    }
  };

  const [scheduleDate, setScheduleDate] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);

  const getScheduleData = () => {
    setScheduleDate(document.getElementById("hiddenDate").value);
    setTimeSlot(document.getElementById("hiddenTimeSlot").value);
    console.log("d: " + scheduleDate + "; ts: " + timeSlot);
  };

  useEffect(() => {
    if (scheduleDate && timeSlot) {
      getDentists();
    }
  }, [scheduleDate, timeSlot]);

  const [sId, setSId] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/Appointment/create-appointment`, {
        patientId: patientId,
        scheduleId: sId,
        treatmentId: treatment,
        dentistId: dentist,
      });
      navigate("/customer-appointment");
    } catch (error) {
      console.error(error);
      // Handle login failure (e.g., show a message to the user)
    }
  };

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
      try {
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
      } catch (e) {}
    }
  }, [treatmentId, token, weekDates, treatment]);

  const [date, setDate] = useState(null);
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

  const handleCellClick = (date, timeslot) => {
    const status = getStatusForCell(date, parseInt(timeslot));
    if (status === "available") {
      setSelectedSlot({ date: format(date, "yyyy-MM-dd"), timeslot, status });
    }
    if (!selectedSlot) {
      setIsNextDisabled2(true);
    } else {
      setIsNextDisabled2(false);
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

  const [patientName, setPatientName] = useState(null);
  const [treatmentName, setTreatmentName] = useState(null);
  const [dentistName, setDentistName] = useState(null);

  const getFinalDetails = (e) => {
    e.preventDefault();
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(`/Patient/get-patient-by-id/${patientId}`)
        .then((response) => {
          setPatientName(response.data.name);
        })
        .catch((error) => {});
      axios
        .get(`/Treatment/get-treatment-by-id/${treatment}`)
        .then((response) => {
          setTreatmentName(response.data.name);
        })
        .catch((error) => {});
      axios
        .get(`/Dentist/get-dentist-by-id/${dentist}`)
        .then((response) => {
          setDentistName(response.data.name);
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <div class="card mt-4">
      <div class="card-header p-3">
        <h5 class="mb-0 fs-title" id="heading">
          Booking an appointment
          <small class="text-muted">&nbsp; for {patientName}</small>
        </h5>
        <p>Fill all form field to go to next step</p>
      </div>
      <div class="card-body p-3 pb-0">
        <form id="msform" role="form" onSubmit={handleSubmit}>
          <ul id="progressbar" style={{ paddingLeft: 10, paddingRight: 10 }}>
            <li class="active" id="account">
              <strong>Treatment</strong>
            </li>
            <li id="personal">
              <strong>Schedule</strong>
            </li>
            <li id="payment">
              <strong>Dentist</strong>
            </li>
            <li id="confirm">
              <strong>Details</strong>
            </li>
          </ul>
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <br />
          <fieldset>
            <div className="form-card">
              <div className="row">
                <div className="col-7">
                  <h2 className="fs-title">Choose a treatment:</h2>
                </div>
                <div className="col-5">
                  <h2 className="steps">Step 1/4</h2>
                </div>
              </div>
              <div className="input-group input-group-static mb-4">
                <label htmlFor="treatmentSelect" className="ms-0">
                  Treatment
                </label>
                <select
                  className="form-control"
                  id="treatmentSelect"
                  onChange={handleTreatmentChange}
                  value={treatment}
                >
                  <option value=""></option>
                  {treatments.map((treatment) => (
                    <option
                      key={treatment.treatmentId}
                      value={treatment.treatmentId}
                    >
                      {treatment.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <input
              id="next1"
              type="button"
              name="next"
              className="next btn bg-gradient-info"
              value="Next"
              onClick={handleNext}
              disabled={isNextDisabled1}
            />
          </fieldset>
          <fieldset>
            <div class="form-card">
              <div class="row">
                <div class="col-7">
                  <h2 class="fs-title">Choose a date and time slot:</h2>
                </div>
                <div class="col-5">
                  <h2 class="steps">Step 2/4</h2>
                </div>
              </div>
              {/* <ScheduleTable treatment={treatment} /> */}
              <div>
                <h5>Select a Date</h5>
                <DatePicker
                  onChange={handleDateChange}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Choose a date"
                  customInput={<CustomInput />}
                  selected={date}
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
                                      ? {
                                          class: "badge badge-sm badge-success",
                                        }
                                      : {};
                                  return (
                                    <td
                                      key={colIndex}
                                      class="align-middle text-center text-sm"
                                      onClick={() => {
                                        handleCellClick(date, timeslot);
                                      }}
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
                <input
                  type="hidden"
                  value={selectedSlot.date}
                  id="hiddenDate"
                />
                <input
                  type="hidden"
                  value={selectedSlot.timeslot}
                  id="hiddenTimeSlot"
                />
              </div>
            </div>
            <input
              type="button"
              name="next"
              class="next btn bg-gradient-info"
              value="Next"
              onClick={function (e) {
                getScheduleData();
                // getDentists();
                handleNext(e);
              }}
              disabled={isNextDisabled2}
            />
            <input
              type="button"
              name="previous"
              class="previous btn bg-gradient-secondary"
              value="Previous"
              onClick={handlePrevious}
            />
          </fieldset>
          <fieldset>
            <div class="form-card">
              <div class="row">
                <div class="col-7">
                  <h2 class="fs-title">Choose a dentist for you:</h2>
                </div>
                <div class="col-5">
                  <h2 class="steps">Step 3/4</h2>
                </div>
              </div>
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
                      data-schedule-id={dentist.scheduleId}
                    >
                      {dentist.dentistName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <input
              type="button"
              name="next"
              class="next btn bg-gradient-info"
              value="Next"
              onClick={function (e) {
                getFinalDetails(e);
                handleNext(e);
              }}
              disabled={isNextDisabled3}
            />
            <input
              type="button"
              name="previous"
              class="previous btn bg-gradient-secondary"
              value="Previous"
              onClick={handlePrevious}
            />
          </fieldset>
          <fieldset>
            <div>
              <h5>Details</h5>
              <div class="input-group input-group-static mb-4">
                <label>Patient</label>
                <input
                  type="text"
                  class="form-control"
                  readOnly
                  value={patientName}
                />
                <label>Treatment</label>
                <input
                  type="text"
                  class="form-control"
                  readOnly
                  value={treatmentName}
                />
                <label>Time</label>
                <input
                  type="text"
                  class="form-control"
                  readOnly
                  value={
                    selectedSlot.date && selectedSlot.timeslot
                      ? `Date: ${selectedSlot.date}, Timeslot: ${
                          timeslotMap[selectedSlot.timeslot]
                        }, Status: ${selectedSlot.status}`
                      : ""
                  }
                />
                <label>Dentist</label>
                <input
                  type="text"
                  class="form-control"
                  readOnly
                  value={dentistName}
                />
              </div>
            </div>
            <input
              type="submit"
              name="next"
              class="next btn bg-gradient-info"
              value="CONFIRM"
            />
            <input
              type="button"
              name="previous"
              class="previous btn bg-gradient-secondary"
              value="Previous"
              onClick={handlePrevious}
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
