import React, { useState, useEffect } from "react";
import { useResultsService } from "../apis/resultsApis";

const ResultTable = () => {
  const { getResults, updateResult, deleteResult } = useResultsService();

  const [selectedSemester, setSelectedSemester] = useState("1");
  const [results, setResults] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch results on initial load
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await getResults();
      setResults(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  // Filter results based on selected semester
  const filteredResults = results.flatMap((semesterResults) =>
    semesterResults.results.filter(
      (row) => row.semester.toString() === selectedSemester
    )
  );

  // Handle semester change
  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  // Handle editing a row
  const handleEdit = (row) => {
    setIsEditing(row._id);
    setEditedRow({ ...row });
  };

  // Save edited row
  const handleSave = async () => {
    setResults((prevResults) => {
      return prevResults.map((semester) => {
        return {
          ...semester,
          results: semester.results.map((row) =>
            row._id === editedRow._id ? { ...row, ...editedRow } : row
          ),
        };
      });
    });
    await updateResult(editedRow._id, {
      ...editedRow,
      semester: Number(editedRow.semester),
    });
    setIsEditing(null);
  };

  // Handle input change in the editable row
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle deleting a row
  const handleDelete = async (id) => {
    setResults((prevResults) => {
      return prevResults.map((semester) => {
        return {
          ...semester,
          results: semester.results.filter((row) => row._id !== id),
        };
      });
    });
    await deleteResult(id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Student Results
          </h2>
          <div>
            <label htmlFor="semester-select" className="sr-only">
              Select Semester
            </label>
            <select
              id="semester-select"
              name="semester"
              value={selectedSemester}
              onChange={handleSemesterChange}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>
        </div>
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
                Loading results...
              </p>
            </div>
          </div>
        ) : filteredResults.length === 0 ? (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No results found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No results available for Semester {selectedSemester}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Enrollment Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Result
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredResults.map((row) => (
                <tr
                  key={row._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isEditing === row._id ? (
                      <input
                        type="text"
                        name="enrolmentNumber"
                        value={editedRow.enrolmentNumber || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {row.enrolmentNumber}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isEditing === row._id ? (
                      <input
                        type="text"
                        name="result"
                        value={editedRow.result || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                      />
                    ) : (
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          parseFloat(row.result) >= 4.0
                            ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                            : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400"
                        }`}
                      >
                        {row.result}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isEditing === row._id ? (
                      <input
                        type="text"
                        name="semester"
                        value={editedRow.semester || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 dark:text-white">
                        {row.semester}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      {isEditing === row._id ? (
                        <button
                          onClick={handleSave}
                          className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          title="Save"
                        >
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(row)}
                          className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                          title="Edit"
                        >
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(row._id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete"
                      >
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
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

export default ResultTable;
