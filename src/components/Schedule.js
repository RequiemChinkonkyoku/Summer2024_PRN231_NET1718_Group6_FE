import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  WeekView,
  DateNavigator,
  Toolbar,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import axios from "../axiosConfig";

const CustomTimeTableCell = ({ onCellClick, hasAppointment, ...restProps }) => {
  const cellStyle = hasAppointment
    ? { backgroundColor: "#d3d3d3", pointerEvents: "none" }
    : {};
  return (
    <WeekView.TimeTableCell
      {...restProps}
      style={cellStyle}
      onClick={() => !hasAppointment && onCellClick(restProps.startDate)}
    />
  );
};

const Demo = () => {
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [selectedDateTime, setSelectedDateTime] = useState("");

  const fetchAppointments = useCallback(() => {
    axios.get("/Treatment/get-all-treatment").then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleCellClick = useCallback((dateTime) => {
    const formattedDateTime = new Date(dateTime).toLocaleString();
    setSelectedDateTime(formattedDateTime);
  }, []);

  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let data = [...prevData];
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return data;
    });
  };

  const isTimeSlotOccupied = (dateTime) => {
    return data.some((appointment) => {
      const appointmentStart = new Date(appointment.startDate).getTime();
      const appointmentEnd = new Date(appointment.endDate).getTime();
      const slotTime = new Date(dateTime).getTime();
      return slotTime >= appointmentStart && slotTime < appointmentEnd;
    });
  };

  return (
    <div>
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={setCurrentDate}
          />
          <Toolbar />
          <DateNavigator />
          <EditingState onCommitChanges={commitChanges} />
          <IntegratedEditing />
          <WeekView
            startDayHour={8}
            endDayHour={17}
            cellDuration={60}
            timeTableCellComponent={(props) => (
              <CustomTimeTableCell
                {...props}
                onCellClick={handleCellClick}
                hasAppointment={isTimeSlotOccupied(props.startDate)}
              />
            )}
          />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
          <TodayButton />
        </Scheduler>
      </Paper>
      <input
        type="text"
        placeholder="year-month-day; timeslot"
        value={selectedDateTime}
        readOnly
      />
    </div>
  );
};

export default Demo;
