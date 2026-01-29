import React, { useEffect, useState } from "react";
import useUserService from "../apis/usersApis";

function Profile() {
  const { getStudentDetails, getUser } = useUserService();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await getUser();
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 h-96 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
            <div className="lg:col-span-2 space-y-6">
              <div className="h-40 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
              <div className="grid grid-cols-2 gap-6">
                <div className="h-32 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
                <div className="h-32 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userName = getStudentDetails?.userName || "User";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const totalProjects =
    (getStudentDetails?.verifiedProjects || 0) +
    (getStudentDetails?.nonVerifiedProjects || 0);
  const completionRate =
    totalProjects > 0
      ? Math.round(
          ((getStudentDetails?.verifiedProjects || 0) / totalProjects) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div
            className="lg:col-span-1 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 sticky top-8">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center text-5xl font-bold text-white shadow-2xl shadow-emerald-200 rotate-3 hover:rotate-0 transition-transform duration-500">
                    {initials}
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
                  {userName}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-4 break-all">
                  {getStudentDetails?.userEmail}
                </p>

                {/* Quick Info */}
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Enrollment</span>
                    <span className="text-gray-900 dark:text-gray-100 font-bold font-mono text-sm">
                      {getStudentDetails?.enrolmentNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Course</span>
                    <span className="text-gray-900 dark:text-gray-100 font-bold text-sm">
                      {getStudentDetails?.course}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Branch</span>
                    <span className="text-gray-900 dark:text-gray-100 font-bold text-sm">
                      {getStudentDetails?.branch}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Semester</span>
                    <span className="text-gray-900 dark:text-gray-100 font-bold text-sm">
            {getStudentDetails?.semester}
          </span>
                  </div>
                </div>
              </div>

              {/* Result Status */}
              <div className="pt-6 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Status</span>
                  <span className="px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-bold">
                    {getStudentDetails?.result || "Active"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Points Dashboard */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              {/* Total Points Card */}
              <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white overflow-hidden shadow-lg shadow-blue-500/20 dark:shadow-blue-500/40">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 text-white/80"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white/80 font-medium">
                      Total Points
                    </span>
                  </div>
                  <p className="text-6xl font-bold mb-2 font-mono">
                    {getStudentDetails?.points || 0}
                  </p>
                  <p className="text-white/70 text-sm">
                    Earned from bidding and projects
                  </p>
                </div>
              </div>

              {/* Fire Points Card */}
              <div className="relative bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 text-white overflow-hidden shadow-lg shadow-orange-500/20 dark:shadow-orange-500/40">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 text-white/80 animate-pulse"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white/80 font-medium">
                      Fire Points
          </span>
                  </div>
                  <p className="text-6xl font-bold mb-2 font-mono">
                    {getStudentDetails?.firePoints || 0}
                  </p>
                  <p className="text-white/70 text-sm">
                    Bonus points for quick bids
                  </p>
                </div>
              </div>
            </div>

            {/* Project Stats */}
            <div
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 animate-fadeIn"
              style={{ animationDelay: "0.3s" }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-emerald-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
                    clipRule="evenodd"
                  />
                  <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                </svg>
                Project Statistics
              </h2>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Completion Rate
          </span>
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {completionRate}%
          </span>
                </div>
                <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {getStudentDetails?.verifiedProjects || 0} verified out of{" "}
                  {totalProjects} total projects
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-100 dark:border-blue-800">
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 font-mono">
                    {totalProjects}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border-2 border-emerald-100 dark:border-emerald-800">
                  <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 font-mono">
                    {getStudentDetails?.verifiedProjects || 0}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Verified</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-amber-100 dark:border-amber-800">
                  <p className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2 font-mono">
                    {getStudentDetails?.nonVerifiedProjects || 0}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Pending</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              className="grid grid-cols-2 gap-4 animate-fadeIn"
              style={{ animationDelay: "0.4s" }}
            >
              <button
                onClick={() => (window.location.href = "/projectupload")}
                className="group relative bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-2xl p-6 shadow-lg border-2 border-gray-100 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-500 dark:bg-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7 text-white"
                    >
                      <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 dark:text-gray-100 mb-0.5">
                      Upload Project
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Submit new work</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => (window.location.href = "/biddingdetails")}
                className="group relative bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl p-6 shadow-lg border-2 border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-500 dark:bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7 text-white"
                    >
                      <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 dark:text-gray-100 mb-0.5">View Bids</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Check results</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
