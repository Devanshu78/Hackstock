import React from "react";
import ResultTable from "../components/ResultTable";
import AddResult from "../components/AddResult";

const Results = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Results Management
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Upload and manage student semester results
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AddResult />
        <ResultTable />
      </div>
    </div>
  );
};

export default Results;
