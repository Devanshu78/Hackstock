import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useUserService from "../apis/usersApis";

function Navbar() {
  const Navigate = useNavigate();
  const menuRef = useRef();
  const { logoutUser } = useUserService();

  const openMenu = () => {
    menuRef.current.classList.add("left-0");
  };

  const closeMenu = () => {
    menuRef.current.classList.remove("left-0");
  };
  return (
    <div>
      <div className="w-full flex gap-10 xl:gap-20 px-4 sm:px-0 justify-between sm:justify-center pt-2  items-center">
        <div className="text-center" onClick={() => Navigate("/")}>
          <img
            className="h-12 md:h-14 lg:h-16 object-cover"
            src="/logo.png"
            alt="hackstock logo"
          />
        </div>

        <ul
          ref={menuRef}
          className="font-mono  font-semibold fixed lg:flex gap-5 xl:gap-10 lg:relative  bg-white/85 lg:bg-transparent h-full min-w-60 md:min-w-72 lg:min-w-auto -left-[100%] lg:left-0  transition-all duration-500 ease-in-out bottom-0 z-50 text-xl cursor-pointer select-none pt-20 lg:pt-0 space-y-5 lg:space-y-0 px-5 lg:px-0 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#3f64fb"
            className="cursor-pointer w-10 h-10 absolute top-5 right-5 lg:hidden"
            onClick={closeMenu}
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
          <li
            className="cursor-pointer transition-all duration-200 ease-in-out hover:text-[var(--primary-dark-btn)]"
            onClick={() => (Navigate("/"), closeMenu())}
          >
            Components
          </li>
          <li
            className="cursor-pointer transition-all duration-200 ease-in-out hover:text-[var(--primary-dark-btn)]"
            onClick={() => (Navigate("/results"), closeMenu())}
          >
            Upload Result
          </li>
          <li
            className="cursor-pointer transition-all duration-200 ease-in-out hover:text-[var(--primary-dark-btn)]"
            onClick={() => (Navigate("/biddingdetails"), closeMenu())}
          >
            Bidding Details
          </li>
          <li
            className="cursor-pointer transition-all duration-200 ease-in-out hover:text-[var(--primary-dark-btn)]"
            onClick={() => (Navigate("projects"), closeMenu())}
          >
            Projects
          </li>
          <li
            className="cursor-pointer transition-all duration-300 ease-in-out hover:text-[var(--primary-dark-btn)]"
            onClick={() => (Navigate("profile"), closeMenu())}
          >
            Profile
          </li>
          <li
            className="cursor-pointer outline-1.5 py-2 px-4 bg-[var(--primary-btn)] text-center text-white rounded-md hover:bg-[var(--primary-dark-btn)] transform-none transition-all duration-200 ease-in-out"
            onClick={() => {
              logoutUser();
              Navigate("/login");
            }}
          >
            Log-out
          </li>
        </ul>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#3f64fb"
            className="cursor-pointer w-10 h-10 lg:hidden"
            onClick={openMenu}
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
