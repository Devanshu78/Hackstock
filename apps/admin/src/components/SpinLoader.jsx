import React from "react";

const SpinLoader = () => {
  return (
    <div>
      <span className="relative flex h-5 w-5 justify-center items-center">
        <span className="animate-spin absolute inline-flex h-full w-full rounded-full bg-gradient-to-tr from-white/40 via-white/80 to-white/40 opacity-75"></span>
        <span className="relative inline-flex rounded-full size-3 bg-[var(--gradient)]"></span>
      </span>
    </div>
  );
};

export default SpinLoader;
