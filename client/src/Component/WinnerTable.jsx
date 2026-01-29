import React from "react";

const WinnerTable = ({ winners, isLoading, currentUserEnrollment }) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-14 bg-gray-100 dark:bg-slate-700" />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-20 border-t-2 border-gray-100 dark:border-slate-700 flex items-center px-6 gap-4"
            >
              <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-4 flex-1 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-8 w-24 bg-gray-200 dark:bg-slate-700 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!winners || winners.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 border-gray-200 dark:border-slate-700 p-16 text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-gray-400 dark:text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          No results found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          No winning bids match your current filter
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 border-gray-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 border-b-2 border-gray-200 dark:border-slate-600">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Enrollment
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Component
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                Semester
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {winners.map((row, index) => {
              const isCurrentUser = row.personId === currentUserEnrollment;
              return (
                <tr
                  key={row._id}
                  className={`
                    border-b border-gray-200 dark:border-slate-700 transition-all duration-200
                    animate-fadeIn
                    ${
                      isCurrentUser
                        ? "bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border-l-4 border-l-emerald-500 dark:border-l-emerald-400"
                        : "hover:bg-gray-50 dark:hover:bg-slate-700"
                    }
                  `}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      {isCurrentUser && (
                        <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      )}
                      <span
                        className={`font-mono text-sm ${
                          isCurrentUser
                            ? "font-bold text-emerald-900 dark:text-emerald-300"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {row.personId}
                      </span>
                      {isCurrentUser && (
                        <span className="ml-2 px-2 py-0.5 bg-emerald-200 dark:bg-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold rounded">
                          YOU
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`font-semibold ${
                        isCurrentUser
                          ? "text-emerald-900 dark:text-emerald-300"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {row.componentName}
                    </span>
                  </td>
                  <td className="px-6 py-5 hidden sm:table-cell">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Sem {row.semester}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className={`font-mono text-base ${
                          isCurrentUser
                            ? "font-bold text-emerald-900 dark:text-emerald-300"
                            : "font-semibold text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {row.biddingAmount}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                        row.status === "Pending"
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-2 border-amber-300 dark:border-amber-700"
                          : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-300 dark:border-emerald-700"
                      }`}
                    >
                      {row.status === "Pending" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {row.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinnerTable;
