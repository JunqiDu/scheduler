import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const updateSpots = function (state, appointments, day) {
    let count = 0;
    const dayOdj = state.days.find(d => d.name === day);
    for (const id of dayOdj.appointments) {
      const appt = appointments[id];
      if (appt.interview === null) {
        count++;
      }
    }
    dayOdj.spots = count;
    return dayOdj;
  };


  const setDay = day => setState({ ...state, day });
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const dayObj = updateSpots(state, appointments, state.day);
        const newDaysArray = [...state.days];
        newDaysArray[dayObj.id - 1] = dayObj;

        setState({ ...state, appointments });
      });
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const dayObj = updateSpots(state, appointments, state.day);
        const newDaysArray = [...state.days];
        newDaysArray[dayObj.id - 1] = dayObj;

        setState({ ...state, appointments });
      });

  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log(all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}