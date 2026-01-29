import React from "react";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <div className="relative text-[30vmin] font-black tracking-[5vmin] text-black">
        404
        <div className="absolute inset-0 w-full h-full mix-blend-screen animate-moving-pattern pointer-events-none"></div>
      </div>
      <div className="text-[5vmin] font-[400] font-[Courgette, cursive]">
        <span className="text-[10vmin]">Ooops...</span>
        <br />
        Page not found
      </div>
      <a
        href="/login"
        rel="noopener noreferrer"
        className="mt-6 text-indigo-600 underline text-lg"
      >
        Go back to Login Page
      </a>
    </div>
  );
};

export default Custom404;
