// api.js
// src/api/api.js
import axios from "axios";
//create a .env file in the root directory and add VITE_API_URL=http://your-api-url
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5288";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // required for cookies
});

export async function fetchDoctorsAPI() {
  const res = await api.get("/api/Doctors");
  return res.data;
}

export default api;
