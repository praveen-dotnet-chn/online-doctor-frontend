import { useState } from "react";
import { fetchDoctorsAPI } from "../services/api";

export default function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchDoctors() {
    setLoading(true);
    try {
      const data = await fetchDoctorsAPI();
      setDoctors(data);
    } finally {
      setLoading(false);
    }
  }

  return { doctors, loading, fetchDoctors };
}
