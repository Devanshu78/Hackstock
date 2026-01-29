import React from "react";
import ScheduleBox from "../components/ScheduleBox";
import EventLists from "../components/EventLists";
import WinnerTable from "../components/WinnerTable";
import BiddingResultButton from "../components/BiddingResultButton";

function Bidding() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Bidding Management
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Schedule events and manage component bidding winners
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Schedule & Events Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScheduleBox />
          <EventLists />
        </div>

        {/* Evaluate Button */}
        <BiddingResultButton />

        {/* Winners Table */}
        <WinnerTable />
      </div>
    </div>
  );
}

export default Bidding;
