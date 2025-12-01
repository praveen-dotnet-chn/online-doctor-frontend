import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import GuestRoute from "@/components/routes/GuestRoute";
import FullPageLoader from "@/components/ui/full-page-loader";
import { useContext } from "react";

function AppContent() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <FullPageLoader />; // <-- Full screen loading BEFORE routing renders
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />

      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/patient"
        element={
          <ProtectedRoute roles={["patient"]}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor"
        element={
          <ProtectedRoute roles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
// src/App.jsx

// import React, { useState } from "react";
// import PatientDashboard from "./pages/PatientDashboard";
// import DoctorDashboard from "./pages/DoctorDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import { USER_ROLES } from "./utils/constants";

// function App() {
//   const [currentRole, setCurrentRole] = useState(USER_ROLES.PATIENT);

//   const renderDashboard = () => {
//     switch (currentRole) {
//       case USER_ROLES.PATIENT:
//         return (
//           <PatientDashboard
//             currentRole={currentRole}
//             onRoleChange={setCurrentRole}
//           />
//         );
//       case USER_ROLES.DOCTOR:
//         return (
//           <DoctorDashboard
//             currentRole={currentRole}
//             onRoleChange={setCurrentRole}
//           />
//         );
//       case USER_ROLES.ADMIN:
//         return (
//           <AdminDashboard
//             currentRole={currentRole}
//             onRoleChange={setCurrentRole}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return <div className="App">{renderDashboard()}</div>;
// }

// export default App;
