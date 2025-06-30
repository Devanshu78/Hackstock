import React from "react";
import useBiddingApis from "../apis/biddingApis";
import SpinLoader from "./SpinLoader";

const BiddingResultButton = () => {
  const { evalResult } = useBiddingApis();
  return (
    <div className="max-w-3xs w-full mx-auto">
      <button
        className="max-w-3xs w-full bg-[var(--gradient)] hover:bg-[var(--primary-dark-btn)] transition-all ease-in-out duration-200 py-1 rounded-lg cursor-pointer text-xl tracking-wider text-white font-medium my-10 flex justify-center items-center gap-5"
        onClick={() => evalResult()}
      >
        Evaulate
      </button>
    </div>
  );
};

export default BiddingResultButton;
