import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import api from "@/api";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";


export function RegisterForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (key, value) =>
    setForm({ ...form, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/register", form);
      const { token, role } = res.data;

      login(token, role);

      if (role === "patient") navigate("/patient");
      else if (role === "doctor") navigate("/doctor");
      else navigate("/admin");
    } catch (err) {
  console.error("REGISTER ERROR:", err);

  if (err.response) {
    const backend = err.response.data;

    // Backend message (preferred)
    if (backend?.message) {
      alert(backend.message);
      return;
    }

    // fallback error cases
    if (err.response.status === 400) alert("Invalid data. Please check all fields.");
    else if (err.response.status === 409) alert("Email already exists.");
    else if (err.response.status === 500) alert("Server error. Please try again later.");
    else alert("Registration failed. Please try again.");
  } else {
    alert("Cannot connect to server. Check if backend is running.");
  }
}

  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Email */}
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldContent>
          <Input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </FieldContent>
      </Field>

      {/* Password */}
      <Field>
        <FieldLabel>Password</FieldLabel>
        <FieldContent>
          <Input
            type="password"
            placeholder="********"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </FieldContent>
      </Field>

      {/* First Name */}
      <Field>
        <FieldLabel>First Name</FieldLabel>
        <FieldContent>
          <Input
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </FieldContent>
      </Field>

      {/* Last Name */}
      <Field>
        <FieldLabel>Last Name</FieldLabel>
        <FieldContent>
          <Input
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </FieldContent>
      </Field>

      {/* Phone */}
      <Field>
        <FieldLabel>Phone</FieldLabel>
        <FieldContent>
          <Input
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </FieldContent>
      </Field>

      {/* DOB */}
      <Field>
        <FieldLabel>Date of Birth</FieldLabel>
        <FieldContent>
          <Input
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          />
        </FieldContent>
      </Field>

      <Button type="submit" className="w-full">
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/" className="text-indigo-600 hover:text-indigo-500">
          Sign In
        </a>
      </p>
    </form>
  );
}
