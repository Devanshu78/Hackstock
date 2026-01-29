import React, { useState, useEffect } from "react";
import useBiddingApis from "../apis/biddingApis.jsx";

const WinnerTable = () => {
  const { getWinner, winners, updateWinnerStatus } = useBiddingApis();
  const [statusMap, setStatusMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWinners = async () => {
      setIsLoading(true);
      await getWinner();
      setIsLoading(false);
    };
    fetchWinners();
  }, []);

  useEffect(() => {
    if (winners && winners.length > 0) {
      const map = winners.reduce((acc, row) => {
        acc[row._id] = row.status;
        return acc;
      }, {});
      setStatusMap(map);
    }
  }, [winners]);

  const handleStatusChange = (e, rowId) => {
    const newStatus = e.target.value;
    setStatusMap((prev) => ({
      ...prev,
      [rowId]: newStatus,
    }));
    updateWinnerStatus(rowId, { status: newStatus });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Bidding Winners
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Manage winner status and approvals
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg
                className="animate-spin h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Loading winners...
              </p>
            </div>
          </div>
        ) : winners?.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No winners yet
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Evaluate bidding results to see winners
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Enrollment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Component
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {winners?.map((row) => (
                <tr
                  key={row._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {row.personId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {row.componentName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {row.semester}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ₹{row.biddingAmount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      name="status"
                      value={statusMap[row._id]}
                      onChange={(e) => handleStatusChange(e, row._id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors ${
                        statusMap[row._id] === "Pending"
                          ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700"
                          : "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-300 dark:border-green-700"
                      }`}
                      style={{
                        colorScheme:
                          document.documentElement.classList.contains("dark")
                            ? "dark"
                            : "light",
                      }}
                    >
                      <option
                        value="Pending"
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        Pending
                      </option>
                      <option
                        value="Approved"
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        Approved
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WinnerTable;
