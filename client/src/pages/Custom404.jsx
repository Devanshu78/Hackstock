import React from "react";
import { useNavigate } from "react-router-dom";

const Custom404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center animate-fadeInUp">
        {/* Illustration */}
        <div className="relative mb-8">
          {/* 404 Text */}
          <div className="text-[150px] md:text-[200px] font-black text-gray-100 dark:text-slate-800 leading-none select-none">
            404
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Main Icon */}
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-slate-700 flex items-center justify-center animate-float">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 text-emerald-600 dark:text-emerald-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>

              {/* Decorative Dots */}
              <div className="absolute -top-4 -right-4 w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
              <div
                className="absolute -bottom-2 -left-6 w-3 h-3 bg-amber-500 rounded-full animate-pulse"
                style={{ animationDelay: "300ms" }}
              />
              <div
                className="absolute top-8 -right-8 w-2 h-2 bg-teal-500 rounded-full animate-pulse"
                style={{ animationDelay: "600ms" }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have wandered off. Let's get you
          back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-100 font-semibold rounded-xl transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            Go Back
          </button>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </button>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Components", path: "/" },
              { label: "Upload Project", path: "/projectupload" },
              { label: "Bidding", path: "/biddingdetails" },
              { label: "Profile", path: "/profile" },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
