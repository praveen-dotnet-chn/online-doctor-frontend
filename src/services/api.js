export async function fetchDoctorsAPI() {
  // Replace with real fetch / axios call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "d1",
          name: "Dr. Sarah Chen",
          specialization: "Cardiologist",
          experience: 12,
          rating: 4.8,
        },
        {
          id: "d2",
          name: "Dr. Michael Lee",
          specialization: "Dermatologist",
          experience: 8,
          rating: 4.6,
        },
        {
          id: "d3",
          name: "Dr. Emily White",
          specialization: "General Physician",
          experience: 6,
          rating: 4.7,
        },
        {
          id: "d4",
          name: "Dr. Rahul Sharma",
          specialization: "Pediatrics",
          experience: 10,
          rating: 4.9,
        },
        {
          id: "d5",
          name: "Dr. Priya Singh",
          specialization: "Neurologist",
          experience: 15,
          rating: 4.5,
        },
        // more...
      ]);
    }, 400);
  });
}
export const getDoctors = fetchDoctorsAPI;
