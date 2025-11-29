// pages/LoginPage.jsx
import { LoginForm } from "@/components/LoginForm";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center bg-gray-50"
        style={{ backgroundImage: "url('public/images/login-poster.webp')" }}
      ></div>

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Sign in to your account
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
