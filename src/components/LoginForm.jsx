import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import api from "@/api/api";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1 Send login request (cookie will be set)
      await api.post("/api/auth/login", { Email: email, Password: password });

      // 2 Call /me to get user info
      const res = await api.get("/api/auth/me", { withCredentials: true });
      const userInfo = res.data;

      // 3 Set user in context
      login(userInfo);

      // 4 Navigate based on role
      if (userInfo.role === "patient") navigate("/patient");
      else if (userInfo.role === "doctor") navigate("/doctor");
      else navigate("/admin");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      if (err.response) {
        alert(
          err.response.data.message ||
            `Login failed (status ${err.response.status})`
        );
      } else {
        alert("Server unreachable");
      }
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="********"
        />
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
      <p className="text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <a href="/register" className="text-indigo-600 hover:text-indigo-500">
          Sign up
        </a>
      </p>
    </form>
  );
}
