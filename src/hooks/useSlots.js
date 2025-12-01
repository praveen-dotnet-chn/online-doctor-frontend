import { useState } from "react";
import { fetchAvailabilitySlotsAPI } from "../api/api";

export default function useSlots() {
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  async function fetchSlots() {
    setLoadingSlots(true);
    try {
      const data = await fetchAvailabilitySlotsAPI();

      // Normalize into frontend format
      const normalized = data.map((s) => ({
        id: s.id,
        doctorId: s.doctorId,
        time: new Date(s.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: s.startTime.split("T")[0],
        start: s.startTime,
        end: s.endTime,
        available: s.isAvailable,
      }));

      setSlots(normalized);
    } finally {
      setLoadingSlots(false);
    }
  }

  return { slots, loadingSlots, fetchSlots };
}
