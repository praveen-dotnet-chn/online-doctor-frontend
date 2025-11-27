import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ roles, children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" replace />;

  if (roles && !roles.includes(user.role))
    return <Navigate to="/" replace />;

  return children;
}
