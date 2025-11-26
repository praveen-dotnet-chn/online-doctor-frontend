// App.jsx
import { LoginForm } from "./components/login-form";

function App() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - image */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('public/images/login-poster.webp')",
        }}
      >
        {/* You can overlay text or logo if needed */}
      </div>

      {/* Right side - login form */}
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

export default App;
