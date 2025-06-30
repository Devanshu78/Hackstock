import React, { useEffect, useState } from "react";
import useBiddingApis from "../apis/biddingApis";

const EventLists = () => {
  const { getEvents, events, deleteEvent } = useBiddingApis();
  // const [events, setEvents] = useState();

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {}, [events]);

  return (
    <div className="flex-1 max-h-64 overflow-y-auto ">
      {events?.map((event, ind) => (
        <div
          className="flex justify-between items-center w-full bg-[#ef9651] px-4 py-2 rounded-lg shadow-md mb-4"
          key={ind}
        >
          <p className="text-lg font-medium">{event.eventDate}</p>
          <span className="max-w-xs md:w-full md:flex justify-evenly items-center">
            <p className="text-lg font-medium">{event.startTime}</p>
            <p className="text-lg font-medium">{event.endTime}</p>
          </span>
          <button
            className="bg-[var(--color)] px-2 py-1 rounded-lg cursor-pointer"
            onClick={() => deleteEvent(event._id)}
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
        </div>
      ))}

      {events?.length === 0 && (
        <section className="border-1 border-dashed h-16 md:h-60 w-full font-ag flex justify-center items-center ">
          No event is scheduled
        </section>
      )}
    </div>
  );
};

export default EventLists;
