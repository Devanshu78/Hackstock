import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useUserService from "../apis/usersApis";

function Signup() {
  const navigate = useNavigate();
  const { registerStudent } = useUserService();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [signupDetails, setSignupDetails] = useState({
    userEmail: "",
    userName: "",
    enrolmentNumber: "",
    course: "",
    branch: "",
    semester: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!signupDetails.userName || !signupDetails.userEmail) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (!signupDetails.userEmail.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (
      !signupDetails.enrolmentNumber ||
      !signupDetails.course ||
      !signupDetails.branch ||
      !signupDetails.semester
    ) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleClick = async (e) => {
    if (!signupDetails.password || signupDetails.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    const response = await registerStudent(signupDetails);
    if (response?.status === 201) {
      toast.success(response.data.message);
      setSignupDetails({
        userEmail: "",
        userName: "",
        enrolmentNumber: "",
        course: "",
        branch: "",
        semester: "",
        password: "",
      });
      navigate("/login");
    }
    setIsLoading(false);
  };

  const steps = [
    { number: 1, title: "Personal", subtitle: "Basic information" },
    { number: 2, title: "Academic", subtitle: "Education details" },
    { number: 3, title: "Security", subtitle: "Set password" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-600 dark:via-teal-600 dark:to-cyan-600 overflow-hidden">
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
          className="absolute top-32 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div
          className="absolute bottom-32 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-56 h-56 bg-white/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          {/* Logo Text */}
          <div className="mb-12 animate-fadeIn">
            <div className="mb-8 group cursor-default">
              <h1 className="text-6xl xl:text-7xl font-black tracking-tight mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-white hover:from-teal-100 hover:via-white hover:to-teal-100 transition-all duration-500">
                  HackStock
                </span>
              </h1>
              <p className="text-white/80 text-lg font-light tracking-wider italic">
                Build, Bid, Breakthrough
              </p>
            </div>

            <h2 className="text-3xl xl:text-4xl font-bold mb-6 leading-tight">
              Join the
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-yellow-300">
                  Innovation
                </span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/30 -z-0"></span>
              </span>
              <br />
              Revolution.
            </h2>

            <p className="text-md text-white/90 max-w-md leading-relaxed font-light">
              Create your account and start bidding on components for your next
              breakthrough project.
            </p>
          </div>

          {/* Features - Enhanced */}
          <div className="space-y-3">
            {[
              {
                icon: "⚡",
                text: "Access 200+ electronic components",
                color: "from-yellow-400 to-orange-400",
              },
              {
                icon: "🎯",
                text: "Real-time competitive bidding",
                color: "from-pink-400 to-red-400",
              },
              {
                icon: "📊",
                text: "Track your project progress",
                color: "from-blue-400 to-cyan-400",
              },
              {
                icon: "🤝",
                text: "Connect with peers & mentors",
                color: "from-purple-400 to-pink-400",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 animate-fadeIn bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`size-8 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-xl shadow-lg`}
                >
                  {feature.icon}
                </div>
                <span className="text-white/90 font-medium group-hover:text-white transition-colors">
                  {feature.text}
                </span>
                <svg
                  className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/50 relative overflow-y-auto">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-40">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.03) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating Gradient Orbs */}
        <div
          className="absolute top-20 right-10 w-48 h-48 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-emerald-100/40 to-transparent rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        />

        <div className="w-full max-w-lg animate-fadeIn py-8 relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-block px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100">
              <h1 className="text-4xl font-black mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
                  HackStock
                </span>
              </h1>
              <p className="text-gray-600 text-sm font-light italic">
                Build, Bid, Breakthrough
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-10 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50">
            <div className="flex justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                  style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* Steps */}
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <div
                      className={`text-xs font-bold ${
                        currentStep >= step.number
                          ? "text-emerald-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-[10px] text-gray-400 hidden sm:block">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-200/50">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {currentStep === 1 && "Let's get started"}
                {currentStep === 2 && "Academic details"}
                {currentStep === 3 && "Secure your account"}
              </h2>
              <p className="text-gray-600">
                {currentStep === 1 && "Tell us about yourself"}
                {currentStep === 2 && "Your education information"}
                {currentStep === 3 && "Create a strong password"}
              </p>
            </div>

            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={signupDetails.userName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all duration-200 placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="userEmail"
                    value={signupDetails.userEmail}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all duration-200 placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Academic Info */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enrollment Number
                  </label>
                  <input
                    type="text"
                    name="enrolmentNumber"
                    value={signupDetails.enrolmentNumber}
                    onChange={handleChange}
                    placeholder="202400001"
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all duration-200 placeholder:text-gray-400 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={signupDetails.course}
                      onChange={handleChange}
                      placeholder="B.Tech"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Semester
                    </label>
                    <input
                      type="number"
                      name="semester"
                      value={signupDetails.semester}
                      onChange={handleChange}
                      placeholder="4"
                      min="1"
                      max="8"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={signupDetails.branch}
                    onChange={handleChange}
                    placeholder="Computer Science"
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all duration-200 placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Password */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Create Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signupDetails.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 characters"
                      className="w-full px-4 py-3.5 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all duration-200 placeholder:text-gray-400"
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

                {/* Password Strength Indicator */}
                {signupDetails.password && (
                  <div className="space-y-2 animate-fadeIn">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            signupDetails.password.length >= i * 2
                              ? signupDetails.password.length >= 8
                                ? "bg-emerald-500"
                                : signupDetails.password.length >= 6
                                ? "bg-yellow-500"
                                : "bg-red-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      {signupDetails.password.length < 6 &&
                        "Password is too short"}
                      {signupDetails.password.length >= 6 &&
                        signupDetails.password.length < 8 &&
                        "Password is good"}
                      {signupDetails.password.length >= 8 && "Strong password!"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-xl hover:bg-white shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleClick}
                  disabled={isLoading}
                  className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
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
                      Creating...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6 bg-white/60 backdrop-blur-sm py-3 px-6 rounded-xl">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
