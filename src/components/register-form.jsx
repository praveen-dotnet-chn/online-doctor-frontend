// components/register-form.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <form className="space-y-5">
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
