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

      const normalized = res.data.map((a) => ({
        id: a.appointmentId,
        patient: a.patientId, // until patient API exists
        date: a.startTime.split("T")[0],
        time: a.startTime.split("T")[1].split(".")[0], // "10:45:16"
        status: a.status,
      }));

      setAppointments(normalized);
    } finally {
      setLoading(false);
    }
  }

  return { appointments, loading, fetchAppointments };
}
