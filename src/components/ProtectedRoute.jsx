import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ roles, children }) {
  const { user, loading } = useContext(AuthContext);

  // While checking auth, render nothing (or a spinner)
  if (loading) return null; // or <div>Loading...</div>

  if (!user) return <Navigate to="/" replace />;

  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}
