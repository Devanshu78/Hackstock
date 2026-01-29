import React, { useState, useEffect, useRef } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleReset();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleClick = () => {
    if (!points) {
      alert("Please enter bid amount");
      return;
    }
    if (Number(points) < 10 || Number(points) > 300) {
      alert("Bid amount should be between 10 and 300");
      return;
    }

    setIsSubmitting(true);
    setSelectedCard((prev) => ({ ...prev, points }));
    if (isFlameCoinUsed) {
      setFlameCoin(0);
    }

    socketInstance.emit("bid", {
      componentId: selectedCard._id,
      points,
      flameCoinUsed: isFlameCoinUsed,
      userId: getStudentDetails._id,
      eventId: Notification._id,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
    }, 500);
  };

  const [isActive, setIsActive] = useState(false);

  const checkBox = () => {
    if (!isActive) {
      setPoints(String(Number(points || 0) + Number(flameCoin)));
      setFlameCoinUsed(true);
    } else {
      setPoints(String(Math.max(0, Number(points) - Number(flameCoin))));
      setFlameCoinUsed(false);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setPoints("");
    setFlameCoinUsed(false);
    setIsActive(false);
    setIsOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleReset}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" />

      {/* Modal - Centered and Compact */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md my-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-3 right-3 z-10 p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Component Preview */}
        <div className="p-4 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700 flex-shrink-0 border border-gray-200 dark:border-slate-600">
              <img
                src={selectedCard?.componentImage}
                alt={selectedCard?.componentName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">
                {selectedCard?.componentName}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {selectedCard?.componentValue} pts
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedCard?.componentAvailability} available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-slate-700" />

        {/* Bid Form */}
        <div className="p-4 pt-3">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
            Your Bid Amount
          </label>

          {/* Input with "pts" label */}
          <div className="relative mb-3">
            <input
              ref={inputRef}
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter amount"
              min="10"
              max="300"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl text-center text-xl font-semibold font-mono text-gray-900 dark:text-gray-100 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm font-medium pointer-events-none">
              pts
            </span>
          </div>

          {/* Quick Bid Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[50, 100, 150, 200].map((amount) => (
              <button
                key={amount}
                onClick={() => setPoints(String(amount))}
                className={`py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  Number(points) === amount
                    ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                {amount}
              </button>
            ))}
          </div>

          {/* Flame Coin Option */}
          {flameCoin > 0 && (
            <div
              onClick={checkBox}
              className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all duration-200 mb-3 ${
                isActive
                  ? "border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500"
              }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Checkbox */}
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                    isActive
                      ? "border-emerald-600 dark:border-emerald-500 bg-emerald-600 dark:bg-emerald-500"
                      : "border-gray-300 dark:border-slate-600"
                  }`}
                >
                  {isActive && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-2.5 h-2.5 text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    Use Flame Coins
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Add{" "}
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      +{flameCoin}
                    </span>{" "}
                    bonus points
                  </p>
                </div>
              </div>

              {/* Flame Icon with count */}
              <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-orange-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold font-mono text-orange-600 dark:text-orange-400 text-sm">
                  {flameCoin}
                </span>
              </div>
            </div>
          )}

          {/* Bid Range Info */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-3">
            Bid range:{" "}
            <span className="font-mono font-medium text-gray-700 dark:text-gray-300">
              10 - 300
            </span>{" "}
            points
          </p>

          {/* Submit Button */}
          <button
            onClick={handleClick}
            disabled={isSubmitting || !points}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-sm">Placing bid...</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
                </svg>
                <span className="text-sm">Place Bid</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
