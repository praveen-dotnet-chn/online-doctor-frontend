// export async function fetchDoctorsAPI() {
//   // Replace with real fetch / axios call
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         {
//           id: "d1",
//           name: "Dr. Sarah Chen",
//           specialization: "Cardiologist",
//           experience: 12,
//           rating: 4.8,
//         },
//         {
//           id: "d2",
//           name: "Dr. Michael Lee",
//           specialization: "Dermatologist",
//           experience: 8,
//           rating: 4.6,
//         },
//         {
//           id: "d3",
//           name: "Dr. Emily White",
//           specialization: "General Physician",
//           experience: 6,
//           rating: 4.7,
//         },
//         {
//           id: "d4",
//           name: "Dr. Rahul Sharma",
//           specialization: "Pediatrics",
//           experience: 10,
//           rating: 4.9,
//         },
//         {
//           id: "d5",
//           name: "Dr. Priya Singh",
//           specialization: "Neurologist",
//           experience: 15,
//           rating: 4.5,
//         },
//         // more...
//       ]);
//     }, 400);
//   });
// }
// export const getDoctors = fetchDoctorsAPI;

// services/AuthService.js
// src/api/AuthService.js
// src/api/AuthService.js
import api from "./api";

export const AuthService = {
  register: async (userData) => {
    const res = await api.post("/api/auth/register", userData);
    return res.data; // { email, role }
  },

  login: async (credentials) => {
    const res = await api.post("/api/auth/login", credentials);
    return res.data; // { email, role }
  },

  logout: async () => {
    await api.post("/api/auth/logout");
  },

  me: async () => {
    const res = await api.get("/api/auth/me");
    return res.data; // { email, role }
  },
};
