import React, { useState, useEffect } from "react";
import { useBiddingStore } from "../apis/biddingApis";

const WinnerTable = () => {
  const { getWinner, winners } = useBiddingStore();

  useEffect(() => {
    getWinner();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="max-h-96 overflow-y-auto px-2">
          <table className="w-full ">
            <thead>
              <tr className="border-b-1  text-base md:text-lg">
                <th className="p-1 border-r-1 ">Enrolment</th>
                <th className="p-1 border-r-1  text-ellipsis">
                  <span className="block md:hidden">Compo.</span>
                  <span className="hidden md:block">Component Name</span>
                </th>
                <th className="p-1 border-r-1 ">
                  <span className="block sm:hidden">Sem.</span>
                  <span className="hidden sm:block">Semester</span>
                </th>
                <th className="p-1 border-r-1 ">
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
                  <tr key={row._id} className="text-center border-b-1 ">
                    <td className="border-r-1 whitespace-nowrap  py-2 text-sm sm:text-base">
                      {row.personId}
                    </td>
                    <td className="border-r-1  py-2 text-sm sm:text-base">
                      {row.componentName}
                    </td>
                    <td className=" border-r-1 whitespace-nowrap  py-2 text-sm sm:text-base">
                      {row.semester}
                    </td>
                    <td className=" border-r-1 whitespace-nowrap  py-2 text-sm sm:text-base">
                      {row.biddingAmount}
                    </td>
                    <td>
                      <section
                        className={`m-2 rounded font-medium ${
                          row.status == "Pending"
                            ? `bg-red-500 text-white`
                            : `bg-green-500 text-black`
                        }`}
                      >
                        {row.status}
                      </section>
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
