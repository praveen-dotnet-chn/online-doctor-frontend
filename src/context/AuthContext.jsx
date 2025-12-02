import { createContext, useState, useEffect, useContext } from "react";
import api from "@/api/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On page load :: check if cookie contains a valid JWT
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await api.get("/api/auth/me"); // you will create this endpoint
        setUser(res.data); // { email, role, firstName, id, ... }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  // Login only needs role now (cookie is auto-sent)
  const login = (userInfo) => {
    setUser(userInfo); // userInfo = { email, role }
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
