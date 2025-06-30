import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserService from "../apis/usersApis";

function Login() {
  const Navigate = useNavigate();
  const { loginUser } = useUserService();
  const [showPassword, setShowPassword] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    userEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    const response = await loginUser(loginDetails);
    if (response) {
      setLoginDetails({ userEmail: "", password: "" });
      Navigate("/");
    }
  };

  return (
    <div className="bg-[#efefef] bg-cover bg-center min-h-screen">
      <img src="./logo.png" className="pt-2 max-w-xs mx-auto" alt="" />

      <div className="w-fit mx-auto px-4 md:px-10 mt-5 py-5 md:py-7 bg-[#ffff00] rounded-xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold">WELCOME ON BOARD</h2>
        <p className="text-lg md:text-xl">
          Stock up on innvotaion!! <br /> Trade with intelligence ❤️
        </p>
      </div>

      <div className="w-fit lg:w-xl mx-auto mt-6 md:mt-10 flex flex-col items-center rounded-2xl px-5 shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold px-6 py-3 mt-7 rounded-xl w-fit text-[#3f7d58] font-ag ">
          LOGIN PAGE
        </h2>
        <div className="flex flex-col items-center space-y-5 my-5 w-full">
          <input
            className="px-3 md:px-6 py-2 outline-1 md:outline-2 border-none rounded-xl w-full"
            type="email"
            name="userEmail"
            value={loginDetails.userEmail}
            onChange={(e) => handleChange(e)}
            id="emailbox"
            placeholder="Email id"
          />
          <div className="outline-1 md:outline-2 px-3 md:px-6 py-2 mb-5 rounded-xl w-full flex items-center justify-between">
            <input
              className="outline-none border-none w-full h-full bg-transparent"
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginDetails.password}
              onChange={(e) => handleChange(e)}
              id="passwordbox"
              placeholder="Password"
            />
            {!showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="cursor-pointer w-6 h-6"
                fill="#ec5228"
                onClick={() => setShowPassword(!showPassword)}
              >
                <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="cursor-pointer w-6 h-6"
                fill="#ec5228"
                onClick={() => setShowPassword(!showPassword)}
              >
                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
              </svg>
            )}
          </div>
          <p className="text-blue-600/80 underline">
            Agree to terms and conditions
          </p>
        </div>
        <button
          className="py-2 mb-5 outline-none border-none rounded-lg w-70 font-bold text-lg md:text-2xl cursor-pointer  bg-[var(--primary-btn)] transition-all ease-in-out duration-300 hover:bg-[var(--primary-dark-btn)]  text-white "
          onClick={() => handleClick()}
        >
          Login
        </button>
      </div>

      <div className="mt-10 w-70 mx-auto relative">
        <button
          className="text-center outline-none w-full py-2 rounded-lg font-semibold text-xl md:text-2xl cursor-pointer bg-[var(--secondary-btn)] transition-all ease-in-out duration-300 hover:bg-[var(--secondary-dark-btn)]  text-white "
          onClick={() => Navigate("/signup")}
        >
          Create an account
        </button>
      </div>
    </div>
  );
}

export default Login;
