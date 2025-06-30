import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUserService from "../apis/usersApis";
import toast from "react-hot-toast";

function Navbar() {
  const { flameCoin, logoutStudent, getUser } = useUserService();
  const Navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    getUser();
  }, []);

  const openMenu = () => {
    menuRef.current.classList.add("left-0");
  };

  const closeMenu = () => {
    menuRef.current.classList.remove("left-0");
  };

  const handleLogout = async () => {
    const response = await logoutStudent();
    if (response) {
      toast.success(response.data.message);
      Navigate("/login");
    }
  };
  return (
    <div className="">
      <div className="w-full flex gap-10 xl:gap-20 justify-between md:justify-center items-center pt-2 ">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#ec5228"
            className="cursor-pointer w-10 h-10 lg:hidden"
            onClick={openMenu}
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>

        <div className="text-center" onClick={() => Navigate("/")}>
          <img
            className="h-12 md:h-14 lg:h-16 object-cover"
            src="/logo.png"
            alt="hackstock logo"
          />
        </div>

        <ul
          ref={menuRef}
          className="font-mono  font-semibold fixed lg:flex items-center gap-5 xl:gap-10 lg:relative  bg-white/85 lg:bg-transparent h-full min-w-60 md:min-w-72 lg:min-w-auto -left-[100%] lg:left-0  transition-all duration-500 ease-in-out bottom-0 z-50 text-xl cursor-pointer select-none pt-20 lg:pt-0 space-y-5 lg:space-y-0 px-5 lg:px-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#ec5228"
            className="cursor-pointer w-10 h-10 absolute top-5 right-5 lg:hidden"
            onClick={closeMenu}
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
          <li
            className="cursor-pointer hover:text-[var(--dark-action-color)]"
            onClick={() => (Navigate("/"), closeMenu())}
          >
            Components
          </li>
          <li
            className="cursor-pointer hover:text-[var(--dark-action-color)]"
            onClick={() => (Navigate("/projectupload"), closeMenu())}
          >
            Upload Project
          </li>
          <li
            className="cursor-pointer hover:text-[var(--dark-action-color)]"
            onClick={() => (Navigate("/biddingdetails"), closeMenu())}
          >
            Bidding Details
          </li>
          <li
            className="cursor-pointer hover:text-[var(--dark-action-color)]"
            onClick={() => (Navigate("projects"), closeMenu())}
          >
            My Projects
          </li>
          <li
            className="cursor-pointer hover:text-[var(--dark-action-color)]"
            onClick={() => (Navigate("profile"), closeMenu())}
          >
            Profile
          </li>
          <li
            className="cursor-pointer outline-1.5 py-2 px-4 bg-[var(--action-color)] text-center text-white rounded-md hover:bg-[var(--dark-action-color)] transform-none transition-all duration-200 ease-in-out"
            onClick={handleLogout}
          >
            Log-out
          </li>
        </ul>

        <div className="text-center h-full flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 384 511.4"
            className="w-8 h-8"
          >
            <defs>
              <linearGradient
                id="a"
                gradientUnits="userSpaceOnUse"
                x1="163.52"
                y1="286.47"
                x2="163.52"
                y2="500.71"
              >
                <stop offset="0" stopColor="#FB6404" />
                <stop offset="1" stopColor="#F2BE10" />
              </linearGradient>
            </defs>
            <path
              fill="#E20919"
              d="M77.46 228.43C65.33 119.85 128.78 43.48 247.72 0c-72.85 94.5 62.09 196.88 69.53 295.03 17.44-29.75 27.34-69.48 29.3-122.55 89.18 139.92 15.25 368.59-181.02 335.73-18.02-3.01-35.38-8.7-51.21-17.17C42.76 452.8 0 369.53 0 290c0-50.69 21.68-95.95 49.74-131.91 3.75 35.23 11.73 61.51 27.72 70.34z"
            />
            <path
              fill="url(#a)"
              d="M139.16 372.49c-21.83-57.66-18.81-150.75 42.33-183.41.43 107.03 103.57 120.64 84.44 234.9 17.64-20.39 26.51-53.02 28.1-78.75 27.96 65.38 6.04 117.72-33.81 144.37-121.15 81-225.48-83.23-156.11-173.26 2.08 20.07 26.14 51.12 35.05 56.15z"
            />
          </svg>
          <p>{flameCoin}</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
