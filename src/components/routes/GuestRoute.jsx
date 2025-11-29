import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // wait until auth check completes

  if (user) {
    // Redirect based on role
    if (user.role === "patient") return <Navigate to="/patient" replace />;
    if (user.role === "doctor") return <Navigate to="/doctor" replace />;
    if (user.role === "admin") return <Navigate to="/admin" replace />;
  }

  return children; // user is not logged in → show login/register
}
