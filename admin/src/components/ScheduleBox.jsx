import React, { useState } from "react";
import useBiddingApis from "../apis/biddingApis";

const ScheduleBox = () => {
  const { scheduleEvent } = useBiddingApis();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const res = await scheduleEvent(schedule);
    if (res.data.success) {
      setSchedule({
        eventDate: "",
        startTime: "",
        endTime: "",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Schedule Event
      </h2>

      <div className="space-y-4">
        {/* Event Date */}
        <div>
          <label
            htmlFor="eventDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={schedule.eventDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
            style={{
              colorScheme: document.documentElement.classList.contains("dark")
                ? "dark"
                : "light",
            }}
          />
        </div>

        {/* Start Time */}
        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={schedule.startTime}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
            style={{
              colorScheme: document.documentElement.classList.contains("dark")
                ? "dark"
                : "light",
            }}
          />
        </div>

        {/* End Time */}
        <div>
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={schedule.endTime}
            onChange={handleChange}
            min={schedule.startTime}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
            style={{
              colorScheme: document.documentElement.classList.contains("dark")
                ? "dark"
                : "light",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={
            isLoading ||
            !schedule.eventDate ||
            !schedule.startTime ||
            !schedule.endTime
          }
          className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Scheduling..." : "Schedule Event"}
        </button>
      </div>
    </div>
  );
};

export default ScheduleBox;
