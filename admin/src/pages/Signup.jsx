import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserService from "../apis/usersApis";

function Signup() {
  const Navigate = useNavigate();
  const { registerUser } = useUserService();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [signupDetails, setSignupDetails] = useState({
    userEmail: "",
    userName: "",
    phoneNumber: "",
    course: "",
    branch: "",
    role: "Teacher",
    password: "",
  });

  const handleChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    setIsLoading(true);
    const response = await registerUser(signupDetails);
    if (response) {
      setSignupDetails({
        userEmail: "",
        userName: "",
        phoneNumber: "",
        course: "",
        branch: "",
        role: "Teacher",
        password: "",
      });
      Navigate("/login");
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="./logo.png"
            className="h-16 mx-auto object-contain"
            alt="Logo"
          />
        </div>

        {/* Signup Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Create account
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Join us and start managing your hackathons
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="emailbox"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="userEmail"
                value={signupDetails.userEmail}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                id="emailbox"
                placeholder="admin@hackstock.com"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            {/* Name Input */}
            <div>
              <label
                htmlFor="namebox"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                name="userName"
                value={signupDetails.userName}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                id="namebox"
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label
                htmlFor="phonebox"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={signupDetails.phoneNumber}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                id="phonebox"
                placeholder="9876543210"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            {/* Two Column Grid for Course & Branch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Course Input */}
              <div>
                <label
                  htmlFor="coursebox"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  value={signupDetails.course}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  id="coursebox"
                  placeholder="B.Tech"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
              </div>

              {/* Branch Input */}
              <div>
                <label
                  htmlFor="classbox"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  value={signupDetails.branch}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  id="classbox"
                  placeholder="CSE"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Role Select */}
            <div>
              <label
                htmlFor="rolebox"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Role
              </label>
              <select
                name="role"
                value={signupDetails.role}
                onChange={handleChange}
                id="rolebox"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="passwordbox"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signupDetails.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  id="passwordbox"
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 pr-11 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Create Account Button */}
            <button
              onClick={handleClick}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Already have an account?{" "}
              <button
                onClick={() => Navigate("/login")}
                className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          By creating an account, you agree to our{" "}
          <a
            href="#"
            className="underline hover:text-gray-700 dark:hover:text-gray-300"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline hover:text-gray-700 dark:hover:text-gray-300"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
