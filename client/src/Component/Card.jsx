import React, { useState } from "react";

function Card({ cardData, canBid }) {
  const [isHovered, setIsHovered] = useState(false);
  const isLowStock = cardData?.componentAvailability <= 5;
  const isOutOfStock = cardData?.componentAvailability === 0;
  const biddingActive = canBid === "true";

  return (
    <div
      className="group relative cursor-pointer h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div
        className={`
          relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden h-full flex flex-col
          border transition-all duration-300 ease-out
          ${
            isHovered
              ? "shadow-xl shadow-emerald-500/20 dark:shadow-emerald-500/30 border-emerald-400 dark:border-emerald-500 -translate-y-1"
              : "shadow-md border-gray-200 dark:border-slate-700"
          }
        `}
      >
        {/* Points Badge - Top Left */}
        <div className="absolute top-2 left-2 z-10">
          <div
            className={`
              flex items-center gap-1 px-2 py-1 rounded-lg
              bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold
              shadow-md transition-all duration-300
              ${isHovered ? "scale-105" : "scale-100"}
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-mono">{cardData?.componentValue}</span>
          </div>
        </div>

        {/* Stock Badge - Top Right */}
        <div className="absolute top-2 right-2 z-10">
          <div
            className={`
              px-2 py-1 rounded-lg text-[10px] font-bold backdrop-blur-sm
              transition-all duration-300 shadow-sm
              ${
                isOutOfStock
                  ? "bg-red-500 text-white"
                  : isLowStock
                  ? "bg-orange-500 text-white"
                  : "bg-emerald-500 text-white"
              }
            `}
          >
            {isOutOfStock ? (
              "0 left"
            ) : (
              <span className="flex items-center gap-1">
                <span
                  className={`w-1 h-1 rounded-full bg-white ${
                    isLowStock ? "animate-pulse" : ""
                  }`}
                />
                {cardData?.componentAvailability} left
              </span>
            )}
          </div>
        </div>

        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800">
          <img
            src={cardData?.componentImage}
            alt={cardData?.componentName}
            className={`
              w-full h-full object-contain p-4
              transition-all duration-500 ease-out
              ${isHovered ? "scale-110 p-2" : "scale-100"}
            `}
          />

          {/* Hover Overlay */}
          <div
            className={`
              absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
              flex items-end justify-center pb-4
              transition-opacity duration-300
              ${isHovered ? "opacity-100" : "opacity-0"}
            `}
          >
            {biddingActive ? (
              <div className="px-4 py-2 bg-white rounded-lg text-xs font-bold text-emerald-600 shadow-lg flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Click to Bid
              </div>
            ) : (
              <div className="px-4 py-2 bg-gray-900 rounded-lg text-xs font-semibold text-white shadow-lg flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                Bidding Closed
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex-1 flex flex-col justify-center bg-white dark:bg-slate-800">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-center text-sm leading-tight line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 mb-1">
            {cardData?.componentName}
          </h3>

          {/* Category/Type indicator */}
          <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
            </svg>
            Electronic Component
          </div>
        </div>

        {/* Animated Bottom Border */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
            transition-transform duration-300 origin-left
            ${isHovered ? "scale-x-100" : "scale-x-0"}
          `}
        />
      </div>
    </div>
  );
}

export default Card;
