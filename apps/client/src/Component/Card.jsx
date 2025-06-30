import React from "react";

function Card({ cardData }) {
  return (
    <div className="relative cursor-pointer">
      <div className="relative">
        <img
          className="absolute -top-5 -left-5 w-12 sm:w-14 lg:w-16"
          src="/red-circle.png"
          alt="red circle"
        />
        <p className="text-white text-center font-semibold w-fit absolute -top-3 -left-2 lg:-top-2  lg:left-0 leading-4 text-sm sm:text-base">
          {`${cardData?.componentValue}`} <br /> Pts.
        </p>
      </div>
      <div className="relative">
        <img
          className="w-12 md:w-14 lg:w-16 absolute -top-3 left-18 md:left-30 lg:left-36"
          src="/tag.png"
          alt="tag png"
        />
        {cardData.componentAvailability > 5 ? (
          <p className="absolute -top-1 left-23 md:left-36 lg:left-43 text-green-600 text-center font-semibold text-sm sm:text-base md:text-lg leading-4">
            {`${cardData?.componentAvailability}`} <br /> left
          </p>
        ) : (
          <p className="absolute -top-2 left-23 md:left-36 lg:left-43 text-red-500 text-center font-semibold text-sm sm:text-base md:text-lg leading-4">
            {`${cardData?.componentAvailability}`} <br /> left
          </p>
        )}
      </div>
      <div className="outline-2 md:outline-4 rounded-lg overflow-clip md:rounded-3xl w-fit bg-white h-full flex flex-col justify-between">
        <img
          className="w-32 h-32 md:w-44 md:h-44 lg:w-56 lg:h-56 object-cover"
          src={`${cardData.componentImage}`}
          alt=""
        />
        <p className="bg-[var(--secondary-color)] rounded-lg text-center text-base md:text-lg lg:text-2xl font-semibold w-full p-2">
          {`${cardData.componentName}`}
        </p>
      </div>
    </div>
  );
}

export default Card;
