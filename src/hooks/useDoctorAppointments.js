import { useState } from "react";
import api from "../api/api";

export default function useDoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAppointments(doctorId) {
    if (!doctorId) return;

    setLoading(true);
    try {
      const res = await api.get(`/api/patient/appointments/doctor/${doctorId}`);

      const appointments = res.data;

      // 1. Extract unique patientIds
      const patientIds = [...new Set(appointments.map((a) => a.patientId))];

      // 2. Fetch all patient details in parallel
      const patientRequests = patientIds.map((id) =>
        api.get(`/api/patients/${id}`)
      );

      const patientResponses = await Promise.all(patientRequests);

      // 3. Create a lookup map: { patientId :: patientName }
      const patientMap = {};
      patientResponses.forEach((res) => {
        const p = res.data;
        patientMap[p.userId] = `${p.firstName} ${p.lastName}`;
      });
      console.log(patientMap);
      // 4. Normalize data and replace patientId with name
      const normalized = appointments.map((a) => {
        const start = new Date(a.startTime);
        const end = new Date(a.endTime);
        return {
          id: a.appointmentId,
          patientId: a.patientId,
          patient: patientMap[a.patientId] || "Unknown",
          date: a.startTime.split("T")[0],
          // time: a.startTime.split("T")[1].split(".")[0],
          startTime: start.toTimeString().split(" ")[0], // HH:mm:ss
          endTime: end.toTimeString().split(" ")[0], //
          //if you want to show time range, then use this field
          timeRange: `${start.toTimeString().split(" ")[0]} - ${
            end.toTimeString().split(" ")[0]
          }`,
          status: a.status,
        };
      });

      setAppointments(normalized);
    } catch (err) {
      console.error("Failed to fetch doctor appointments", err);
    } finally {
      setLoading(false);
    }
  }

  return { appointments, loading, fetchAppointments };
}
