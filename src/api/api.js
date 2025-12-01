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
export async function fetchAvailabilitySlotsAPI() {
  const res = await fetch("http://localhost:5186/api/availabilityslot/all");
  if (!res.ok) throw new Error("Failed to fetch slots");
  return res.json();
}

export default api;
