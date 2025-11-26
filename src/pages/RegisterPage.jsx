// pages/RegisterPage.jsx
import { RegisterForm } from "@/components/register-form";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center bg-gray-50"
        style={{ backgroundImage: "url('public/images/login-poster.webp')" }}
      ></div>

      <Separator orientation="vertical" />

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Create Patient Account
          </h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
