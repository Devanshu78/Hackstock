import React from "react";
import ScheduleBox from "../components/ScheduleBox";
import EventLists from "../components/EventLists";
import WinnerTable from "../components/WinnerTable";
import BiddingResultButton from "../components/BiddingResultButton";

function Bidding() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4 mt-6 md:mt-10 justify-center md:items-center max-w-7xl w-full mx-auto">
        <ScheduleBox />
        <EventLists />
      </div>
      <BiddingResultButton />
      <WinnerTable />
    </>
  );
}

export default Bidding;
