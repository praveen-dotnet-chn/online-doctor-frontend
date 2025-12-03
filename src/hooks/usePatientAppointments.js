import { useState } from "react";
import api from "@/api/api";

export default function usePatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAppointments(patientId) {
    if (!patientId) return;

    setLoading(true);
    try {
      const res = await api.get(
        `/api/patient/appointments/patient/${patientId}`
      );
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch patient appointments", err);
    } finally {
      setLoading(false);
    }
  }

  return { appointments, loading, fetchAppointments };
}
