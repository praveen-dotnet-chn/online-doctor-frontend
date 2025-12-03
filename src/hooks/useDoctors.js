import { useState } from "react";
import { fetchDoctorsAPI } from "../api/api";

export default function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchDoctors() {
    setLoading(true);
    try {
      const data = await fetchDoctorsAPI();

      // Normalize to only fields that exist in backend
      const normalized = data.map((d) => ({
        id: d.userId,
        name: `${d.firstName} ${d.lastName}`,
        specialization: d.specialization,
        experience: d.experience,
        photo: d.photo || null,
      }));

      setDoctors(normalized);
    } finally {
      setLoading(false);
    }
  }

  return { doctors, loading, fetchDoctors };
}
