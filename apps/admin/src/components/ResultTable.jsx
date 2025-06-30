import React, { useState, useEffect } from "react";
import { useResultsService } from "../apis/resultsApis";

const ResultTable = () => {
  const { getResults, updateResult, deleteResult } = useResultsService();

  const [selectedSemester, setSelectedSemester] = useState("1");
  const [results, setResults] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  // Fetch results on initial load
  useEffect(() => {
    const getData = async () => {
      const data = await getResults();
      setResults(data);
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
    <div>
      <div className="max-w-7xl mx-auto">
        <select
          name="semester"
          value={selectedSemester}
          onChange={handleSemesterChange}
          className="outline-1 md:outline-2 outline-sky-400 m-4 max-w-48 w-full rounded-md px-2 md:py-1 text-[var(--gradient)] font-medium "
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              Sem {sem}
            </option>
          ))}
        </select>

        <div className="max-h-96 overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-1 border-[var(--gradient)] text-base md:text-lg">
                <th className="p-2 border-r-1 border-[var(--gradient)]">
                  Enrolment
                </th>
                <th className="p-2 border-r-1 border-[var(--gradient)]">
                  Result
                </th>
                <th className="p-2 border-r-1 border-[var(--gradient)]">
                  Semester
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No results found
                  </td>
                </tr>
              ) : (
                filteredResults.map((row, index) => (
                  <tr
                    key={row._id}
                    className="text-center border-b-1 border-[var(--gradient)]"
                  >
                    <td className="border-r-1 border-[var(--gradient)] py-2 text-sm sm:text-base">
                      {isEditing === row._id ? (
                        <input
                          type="text"
                          name="enrolmentNumber"
                          value={editedRow.enrolmentNumber || ""}
                          onChange={handleChange}
                          className="border rounded p-2 w-full text-sm sm:text-base"
                        />
                      ) : (
                        row.enrolmentNumber
                      )}
                    </td>
                    <td className="border-r-1 border-[var(--gradient)] py-2 text-sm sm:text-base">
                      {isEditing === row._id ? (
                        <input
                          type="text"
                          name="result"
                          value={editedRow.result || ""}
                          onChange={handleChange}
                          className="border rounded p-2 w-full text-sm sm:text-base"
                        />
                      ) : (
                        row.result
                      )}
                    </td>
                    <td className="border-r-1 border-[var(--gradient)] py-2 text-sm sm:text-base">
                      {isEditing === row._id ? (
                        <input
                          type="text"
                          name="semester"
                          value={editedRow.semester || ""}
                          onChange={handleChange}
                          className="border rounded p-2 w-full text-sm sm:text-base"
                        />
                      ) : (
                        row.semester
                      )}
                    </td>
                    <td className="py-2 space-x-2">
                      {isEditing === row._id ? (
                        <button
                          className="bg-[#3f64fb] px-2 py-1 rounded-md cursor-pointer"
                          onClick={handleSave}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="#efefef"
                            className="h-5 w-5 md:h-6 md:w-6"
                          >
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          className="bg-[#3f64fb] px-2 py-1 rounded-md cursor-pointer"
                          onClick={() => handleEdit(row)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="#efefef"
                            className="h-5 w-5 md:h-6 md:w-6"
                          >
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                          </svg>
                        </button>
                      )}
                      <button
                        className="bg-[#3f64fb] px-2 py-1 rounded-md cursor-pointer"
                        onClick={() => handleDelete(row._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          fill="#efefef"
                          className="h-5 w-5 md:h-6 md:w-6"
                        >
                          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultTable;
