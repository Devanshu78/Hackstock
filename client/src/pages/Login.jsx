import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserService from "../apis/usersApis";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { loginStudent } = useUserService();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    userEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    if (!loginDetails.userEmail || !loginDetails.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    const response = await loginStudent(loginDetails);
    if (response?.status === 200) {
      toast.success(response.data.message);
      setLoginDetails({ userEmail: "", password: "" });
      navigate("/");
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-600 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating Shapes */}
        <div
          className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-40 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-10 xl:px-16 text-white">
          {/* Logo Text */}
          <div className="mb-12 animate-fadeIn">
            <div className="mb-8 group cursor-default">
              <h1 className="text-6xl xl:text-7xl font-black tracking-tight mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white hover:from-yellow-200 hover:via-white hover:to-yellow-200 transition-all duration-500">
                  HackStock
                </span>
              </h1>
              <p className="text-white/80 text-lg font-light tracking-wider italic">
                Build, Bid, Breakthrough
              </p>
            </div>

            <h2 className="text-3xl xl:text-4xl font-bold mb-6 leading-tight">
              Smart bidding for
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-yellow-300">
                  student success
                </span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/30 -z-0"></span>
              </span>
            </h2>

            <p className="text-md text-white/90 max-w-md leading-relaxed font-light">
              Join the revolution where innovation meets opportunity. Win
              components, build projects, and breakthrough together.
            </p>
          </div>

          {/* Stats - Enhanced */}
          <div className="grid grid-cols-3 gap-6 mt-auto mb-12">
            <div
              className="group animate-fadeIn bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-default"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-yellow-200 group-hover:from-yellow-200 group-hover:to-white transition-all duration-300">
                500+
              </div>
              <div className="text-white/80 text-sm font-medium tracking-wide">
                Active Students
              </div>
              <div className="mt-2 h-1 w-12 bg-gradient-to-r from-yellow-300 to-transparent rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>

            <div
              className="group animate-fadeIn bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-default"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-pink-200 group-hover:from-pink-200 group-hover:to-white transition-all duration-300">
                200+
              </div>
              <div className="text-white/80 text-sm font-medium tracking-wide">
                Components
              </div>
              <div className="mt-2 h-1 w-12 bg-gradient-to-r from-pink-300 to-transparent rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>

            <div
              className="group animate-fadeIn bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-default"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-purple-200 group-hover:from-purple-200 group-hover:to-white transition-all duration-300">
                50+
              </div>
              <div className="text-white/80 text-sm font-medium tracking-wide">
                Projects
              </div>
              <div className="mt-2 h-1 w-12 bg-gradient-to-r from-purple-300 to-transparent rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-linear-to-br from-gray-50 via-purple-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-40">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating Gradient Orbs */}
        <div
          className="absolute top-20 right-10 w-48 h-48 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-indigo-100/40 to-transparent rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        />

        <div className="w-full max-w-md animate-fadeIn relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-block px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100">
              <h1 className="text-4xl font-black mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  HackStock
                </span>
              </h1>
              <p className="text-gray-600 text-sm font-light italic">
                Build, Bid, Breakthrough
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block px-8 py-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600">Sign in to continue to HackStock</p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-200/50">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="userEmail"
                  id="email"
                  value={loginDetails.userEmail}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all duration-200 placeholder:text-gray-400"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={loginDetails.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all duration-200 placeholder:text-gray-400"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleClick}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500 font-medium">
                  New to HackStock?
                </span>
              </div>
            </div>

            {/* Create Account */}
            <button
              onClick={() => navigate("/createaccount")}
              className="w-full py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-300 hover:border-indigo-500 text-gray-700 hover:text-indigo-600 font-semibold rounded-xl hover:bg-white shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Create Account
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6 bg-white/60 backdrop-blur-sm py-3 px-6 rounded-xl">
            By continuing, you agree to our{" "}
            <button className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
              Terms & Conditions
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
