import React, { useState } from "react";
import useBiddingApis from "../apis/biddingApis";

const ScheduleBox = () => {
  const { scheduleEvent } = useBiddingApis();

  const [schedule, setSchedule] = useState({
    eventDate: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await scheduleEvent(schedule);
    if (res.data.success) {
      setSchedule({
        eventDate: "",
        startTime: "",
        endTime: "",
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-4 p-4 bg-white rounded-md shadow-md mx-auto max-w-xs w-full ">
      <input
        type="date"
        name="eventDate"
        value={schedule.eventDate}
        onChange={(e) => handleChange(e)}
        className="outline-1 py-2 rounded-md px-2"
        min={new Date().toISOString().split("T")[0]}
      />
      <input
        type="time"
        name="startTime"
        value={schedule.startTime}
        onChange={(e) => handleChange(e)}
        className="outline-1 py-2 rounded-md px-2"
      />
      <input
        type="time"
        name="endTime"
        value={schedule.endTime}
        onChange={(e) => handleChange(e)}
        min={schedule.startTime}
        className="outline-1 py-2 rounded-md px-2"
      />
      <button
        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer"
        onClick={handleSubmit}
      >
        Schedule Event
      </button>
    </div>
  );
};

export default ScheduleBox;
