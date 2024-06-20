import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import "../assets/custom/multistepForm.css"; // Ensure you have the styles

import Schedule from "./Schedule";
import ScheduleTable from "./Schedule";

const MultiStepForm = ({ id }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState([]);

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

    if (previous_fs) {
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
  }, []);

  const [treatments, setTreatments] = React.useState([]);
  React.useEffect(() => {
    axios.get("/Treatment/get-all-treatment").then((response) => {
      setTreatments(response.data);
    });
  }, []);

  const [selectedTreatment, setSelectedTreatment] = useState({
    id: "",
    name: "",
  });
  const [treatment, setTreatment] = useState("");

  const handleTreatmentChange = (e) => {
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    // setSelection({ id: selectedId, name: selectedName });
    setSelectedTreatment({ id: selectedId, name: selectedName });
    setTreatment(selectedId);
    console.log("id: " + selectedId);
    console.log("patId: " + patientId);
  };

  const [dentists, setDentists] = React.useState([]);
  const getDentists = () => {
    try {
      axios
        .post("/Dentist/get-dentist-for-app", {
          treatmentId: treatment,
          date: date,
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

  const [selectedDentist, setSelectedDentist] = useState({
    id: "",
    name: "",
  });
  const [dentist, setDentist] = useState("");

  const handleDentistChange = (e) => {
    const selectedId = e.target.value;
    const selectedScheduleId =
      e.target.options[e.target.selectedIndex].getAttribute("data-schedule-id");
    const selectedName = e.target.options[e.target.selectedIndex].text;
    // setSelection({ id: selectedId, name: selectedName });
    setSelectedDentist({ id: selectedId, name: selectedName });
    setDentist(selectedId);
    setSId(selectedScheduleId);
    console.log("sid: " + sId);
  };

  const [date, setDate] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);

  const getScheduleData = () => {
    setDate(document.getElementById("hiddenDate").value);
    setTimeSlot(document.getElementById("hiddenTimeSlot").value);
    console.log("d: " + date + "; ts: " + timeSlot);
  };

  useEffect(() => {
    if (date && timeSlot) {
      getDentists();
    }
  }, [date, timeSlot]);

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
      // navigate("/customer-appointment");
    } catch (error) {
      console.error(error);
      // Handle login failure (e.g., show a message to the user)
    }
  };

  return (
    <div class="card mt-4">
      <div class="card-header p-3">
        <h5 class="mb-0 fs-title" id="heading">
          Booking an appointment
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
            <div class="form-card">
              <div class="row">
                <div class="col-7">
                  <h2 class="fs-title">Choose a treatment:</h2>
                </div>
                <div class="col-5">
                  <h2 class="steps">Step 1/4</h2>
                </div>
              </div>
              <div class="input-group input-group-static mb-4">
                <label for="exampleFormControlSelect1" class="ms-0">
                  Treatment
                </label>
                <select
                  class="form-control"
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
              type="button"
              name="next"
              class="next btn bg-gradient-info"
              value="Next"
              onClick={handleNext}
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
              <ScheduleTable treatment={treatment} />
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
              onClick={handleNext}
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
