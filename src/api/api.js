// api.js
// src/api/api.js
import axios from "axios";
//create a .env file in the root directory and add VITE_API_URL=http://your-api-url
const BASE = "http://localhost:5013";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // required for cookies
});

export async function fetchDoctorsAPI() {
  const res = await api.get("/api/Doctors");
  return res.data;
}
//This function Fetches all availability slots for doctors
export async function fetchAvailabilitySlotsAPI() {
  const res = await api.get("/api/AvailabilitySlot/all");
  return res.data;
}

// Send prescription for an appointment
export async function sendPrescriptionAPI(appointmentId, prescriptionText) {
  const res = await api.post("/api/prescriptions", {
    appointmentId,
    prescription: prescriptionText,
  });
  return res.data;
}

export default api;
