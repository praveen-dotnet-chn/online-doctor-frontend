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
import { MyAppointments } from "./pages/MyAppointments";
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
        path="/my-appointments"
        element={
          <ProtectedRoute roles={["patient"]}>
            <MyAppointments />
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
