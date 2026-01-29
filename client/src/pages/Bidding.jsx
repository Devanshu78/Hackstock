import React, { useEffect, useState } from "react";
import WinnerTable from "../Component/WinnerTable";
import { useBiddingStore } from "../apis/biddingApis";
import useUserService from "../apis/usersApis";

function Bidding() {
  const { winners, getWinner } = useBiddingStore();
  const { getStudentDetails, getUser } = useUserService();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([getWinner(), getUser()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const currentUserEnrollment = getStudentDetails?.enrolmentNumber;

  // Filter winners based on selected tab
  const filteredWinners = winners?.filter((winner) => {
    if (filter === "all") return true;
    if (filter === "yours") return winner.personId === currentUserEnrollment;
    return winner.status?.toLowerCase() === filter;
  });

  // Calculate stats for current user's wins only
  const myWins =
    winners?.filter((w) => w.personId === currentUserEnrollment) || [];
  const myStats = {
    total: myWins.length,
    pending: myWins.filter((w) => w.status === "Pending").length,
    collected: myWins.filter((w) => w.status === "Collected").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Bidding Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your winning bids and collection status
          </p>
        </div>

        {/* Your Stats Cards */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 md:flex gap-5 items-center rounded-2xl p-5 md:p-6 shadow-sm border-2 border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow animate-fadeIn">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 font-mono mb-1">
                {myStats.total}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Total Wins
              </p>
            </div>
          </div>

          <div
            className="bg-white dark:bg-slate-800 md:flex gap-5 items-center rounded-2xl p-5 md:p-6 shadow-sm border-2 border-amber-200 dark:border-amber-800 hover:shadow-md transition-shadow animate-fadeIn"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-3 rounded-xl p-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400 font-mono mb-1">
                {myStats.pending}
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                Pending
              </p>
            </div>
          </div>

          <div
            className="bg-white dark:bg-slate-800 md:flex gap-5 items-center rounded-2xl p-5 md:p-6 shadow-sm border-2 border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-shadow animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mb-1">
                {myStats.collected}
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                Collected
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap gap-2 mb-6 animate-fadeIn"
          style={{ animationDelay: "0.3s" }}
        >
          {[
            { value: "all", label: "All Winners", icon: "👥" },
            { value: "yours", label: "Your Wins", icon: "🎯" },
            { value: "pending", label: "Pending", icon: "⏳" },
            { value: "collected", label: "Collected", icon: "✅" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                filter === option.value
                  ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-500/30 scale-105"
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border-2 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600"
              }`}
            >
              <span>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>

        {/* Results Summary */}
        {!isLoading && filteredWinners?.length > 0 && (
          <div
            className="mb-4 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl flex items-center gap-3 animate-fadeIn"
            style={{ animationDelay: "0.35s" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-blue-900 dark:text-blue-200 font-medium">
              Showing{" "}
              <span className="font-bold">{filteredWinners.length}</span>{" "}
              {filter === "yours" ? "of your wins" : "winner(s)"}
            </p>
          </div>
        )}

        {/* Table */}
        <div className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
          <WinnerTable
            winners={filteredWinners}
            isLoading={isLoading}
            currentUserEnrollment={currentUserEnrollment}
          />
        </div>
      </div>
    </div>
  );
}

export default Bidding;
