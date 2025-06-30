import React, { useState, useEffect } from "react";
import useBiddingApis from "../apis/biddingApis.jsx";

const WinnerTable = () => {
  const { getWinner, winners, updateWinnerStatus } = useBiddingApis();
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    getWinner();
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
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="max-h-96 overflow-y-auto px-2">
          <table className="w-full ">
            <thead>
              <tr className="border-b-1 border-[var(--gradient)] text-base md:text-lg">
                <th className="p-1 border-r-1 border-[var(--gradient)]">
                  Enrolment
                </th>
                <th className="p-1 border-r-1 border-[var(--gradient)] text-ellipsis">
                  <span className="block md:hidden">Compo.</span>
                  <span className="hidden md:block">Component Name</span>
                </th>
                <th className="p-1 border-r-1 border-[var(--gradient)]">
                  <span className="block sm:hidden">Sem.</span>
                  <span className="hidden sm:block">Semester</span>
                </th>
                <th className="p-1 border-r-1 border-[var(--gradient)]">
                  <span className="block sm:hidden">Amo.</span>
                  <span className="hidden sm:block">Amount</span>
                </th>
                <th className="p-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {winners?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    No results found
                  </td>
                </tr>
              ) : (
                winners?.map((row, index) => (
                  <tr
                    key={row._id}
                    className="text-center border-b-1 border-[var(--gradient)]"
                  >
                    <td className="border-r-1 whitespace-nowrap border-[var(--gradient)] py-2 text-sm sm:text-base">
                      {row.personId}
                    </td>
                    <td className="border-r-1 border-[var(--gradient)] py-2 text-sm sm:text-base">
                      {row.componentName}
                    </td>
                    <td className=" border-r-1 whitespace-nowrap border-[var(--gradient)] py-2 text-sm sm:text-base">
                      {row.semester}
                    </td>
                    <td className=" border-r-1 whitespace-nowrap border-[var(--gradient)] py-2 text-sm sm:text-base">
                      {row.biddingAmount}
                    </td>
                    <td className="p-2">
                      <select
                        name="status"
                        value={statusMap[row._id]}
                        onChange={(e) => handleStatusChange(e, row._id)}
                        className={`max-w-48 w-full rounded-md px-1 md:py-1 font-medium outline-none border-none ${
                          statusMap[row._id] === "Pending"
                            ? "bg-red-500"
                            : "bg-green-500"
                        } focus:bg-white `}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                      </select>
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

export default WinnerTable;
