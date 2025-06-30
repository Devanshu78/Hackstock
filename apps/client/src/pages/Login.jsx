import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserService from "../apis/usersApis";
import toast from "react-hot-toast";

function Login() {
  const Navigate = useNavigate();
  const { loginStudent } = useUserService();
  const [showPassword, setShowPassword] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    userEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    const response = await loginStudent(loginDetails);
    if (response?.status === 200) {
      toast.success(response.data.message);
      setLoginDetails({ userEmail: "", password: "" });
      Navigate("/");
    }
  };

  return (
    <div className="bg-[url(/background-image.png)] bg-cover bg-center min-h-screen">
      <div className="text-center font-ag">
        <h1 className="font-bold text-[2rem] md:text-[3rem] text-[#5e17eb]">
          HackStock
        </h1>
        <p className="text-xl md:text-3xl">Build, Bid, Breakthrogh</p>
      </div>

      <div className="w-fit mx-auto px-4 md:px-10 mt-5 py-5 md:py-7 bg-white rounded-xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold">WELCOME ON BOARD</h2>
        <p className="text-lg md:text-xl">
          Stock up on innvotaion!! <br /> Trade with intelligence ❤️
        </p>
      </div>

      <div className="flex justify-evenly relative">
        <img
          className="w-10 absolute -top-6 left-[23%] sm:left-[40%] lg:left-[45%]"
          src="/ind-left.png"
          alt="inductor image"
        />
        <img
          className="w-10 absolute -top-6 right-[23%] sm:right-[40%] lg:right-[45%]"
          src="/ind-right.png"
          alt="inductor image"
        />
        <img
          className="w-6 lg:w-7 top-9 absolute right-[5%] sm:right-[30%] lg:right-[42%] xl:right-[35%]"
          src="/diode.png"
          alt="diode image"
        />
      </div>

      <div className="outline-2 w-fit lg:w-xl mx-auto mt-24 bg-[url(/login-bg.png)] bg-center bg-cover flex flex-col items-center rounded-2xl px-5">
        <h2 className="text-2xl md:text-3xl font-bold px-6 py-3 mt-7 rounded-xl bg-white w-fit">
          LOGIN PAGE
        </h2>
        <div className="flex flex-col items-center space-y-5 my-5 w-full">
          <input
            className="px-6 py-2 outline-2 border-none rounded-2xl w-full bg-white/80"
            type="email"
            name="userEmail"
            value={loginDetails.userEmail}
            onChange={(e) => handleChange(e)}
            id="emailbox"
            placeholder="Email id"
          />
          <div className="outline-2 px-6 py-2 mb-5 rounded-2xl w-full bg-white/80 flex items-center justify-between">
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
          className="px-6 py-2 mb-5 outline-2 border-none rounded-2xl w-70 bg-white/90 font-bold text-lg md:text-2xl cursor-pointer"
          onClick={() => handleClick()}
        >
          Login
        </button>
      </div>

      <div className="mt-10 w-70 mx-auto relative">
        <button
          className="bg-[var(--secondary-color)] text-center outline-2 w-full py-2 rounded-2xl font-semibold text-xl md:text-2xl cursor-pointer"
          onClick={() => Navigate("/createaccount")}
        >
          Create an account
        </button>
        <img
          className="w-10 relative left-5 pb-5"
          src="/gnd.png"
          alt="ground symbol"
        />
      </div>
    </div>
  );
}

export default Login;
