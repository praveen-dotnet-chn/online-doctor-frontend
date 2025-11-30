import { useState } from "react";
import { fetchDoctorsAPI } from "../api/api";

export default function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchDoctors() {
    setLoading(true);
    try {
      const data = await fetchDoctorsAPI();

      // 🔥 Normalize backend data → frontend format
      const normalized = data.map((d, index) => ({
        id: d.userId,
        name: `${d.firstName} ${d.lastName}`,
        specialization: d.specialization,
        experience: d.experience,

        // default values for UI fields
        status: "available",          
        rating: 4.5,                  
        consultations: Math.floor(Math.random() * 1500),  
        nextAvailable: "10:00 AM",
        avatar: null,
      }));

      setDoctors(normalized);

    } finally {
      setLoading(false);
    }
  }

  return { doctors, loading, fetchDoctors };
}
