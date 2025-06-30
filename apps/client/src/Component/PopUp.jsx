import React, { useState } from "react";
import useUserService from "../apis/usersApis";
import { socketInstance } from "../apis/socketInstance";

function PopUp({
  isOpen,
  setIsOpen,
  selectedCard,
  setSelectedCard,
  Notification,
}) {
  const [points, setPoints] = useState("");
  const { flameCoin, setFlameCoin, getStudentDetails } = useUserService();
  const [isFlameCoinUsed, setFlameCoinUsed] = useState(false);
  const handleClick = () => {
    if (!points) {
      alert("Please enter bid amount");
      return;
    }
    setSelectedCard((prev) => ({ ...prev, points }));
    if (isFlameCoinUsed) {
      setFlameCoin(0);
    }
    if (Number(points) < 10 || Number(points) > 300) {
      alert("Bid amount should be between 10 and 300");
      return;
    }
    socketInstance.emit("bid", {
      componentId: selectedCard._id,
      points,
      flameCoinUsed: isFlameCoinUsed,
      userId: getStudentDetails._id,
      eventId: Notification._id,
    });
    setIsOpen(false);
  };

  const [isActive, setIsActive] = useState(false);

  const checkBox = () => {
    if (!isActive) {
      setPoints(Number(points) + Number(flameCoin));
      setFlameCoinUsed(true);
    } else {
      setPoints(Number(points) - Number(flameCoin));
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setPoints("");
    setFlameCoinUsed(false);
    setIsActive(false);
    setIsOpen(false);
  };

  return (
    <div
      className="fixed h-screen top-0 w-full bg-black/40"
      onClick={handleReset}
    >
      {isOpen && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white shadow-md rounded-2xl px-36 py-10 space-y-5 text-center flex flex-col">
            <input
              className="outline-2 rounded-2xl px-6 py-3 w-70"
              type="number"
              name="bid"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              id=""
              placeholder="Enter your bid"
              min="10"
              max="300"
              maxLength="3"
              inputMode="numeric"
            />

            <div className="flex justify-center items-center gap-2">
              <p
                className={`w-5 h-5 rounded-full cursor-pointer border-2 ${
                  isActive ? "bg-blue-500" : ""
                }`}
                onClick={checkBox}
              ></p>
              <p>Want to use Flame Coin?</p>
            </div>

            <button
              className="oultine-2 px-6 py-3 rounded-lg bg-[var(--secondary-color)] cursor-pointer text-lg font-semibold"
              onClick={handleClick}
            >
              Place Bid
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopUp;
