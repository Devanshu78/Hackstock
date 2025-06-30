import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useUserService from "../apis/usersApis";

function Signup() {
  const Navigate = useNavigate();

  const { registerStudent } = useUserService();
  const [showPassword, setShowPassword] = useState(false);

  const [signupDetails, setSignupDetails] = useState({
    userEmail: "",
    userName: "",
    enrolmentNumber: "",
    course: "",
    branch: "",
    semester: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    const response = await registerStudent(signupDetails);
    if (response?.status === 201) {
      toast.success(response.data.message);
      setSignupDetails({
        userEmail: "",
        userName: "",
        enrolmentNumber: "",
        course: "",
        branch: "",
        semester: "",
        password: "",
      });
      Navigate("/login");
    }
  };

  return (
    <>
      <div className="bg-[#dfbe92] min-h-screen">
        <div className="text-center font-ag">
          <h1 className="font-bold text-[2rem] md:text-[3rem] text-[#5e17eb]">
            HackStock
          </h1>
          <p className="text-xl md:text-3xl">Build, Bid, Breakthrogh</p>
        </div>

        <p className="text-2xl md:text-3xl tracking-wider w-fit mx-auto px-4 mt-5 py-5 bg-white rounded-xl text-center font-bold uppercase">
          Gang Join Karoge <br /> Humara ?
        </p>

        <div className="outline-2 w-fit mx-5 py-4 md:max-w-3xl md:mx-auto mt-10 bg-[url(/login-bg.png)] bg-center bg-cover rounded-2xl px-5 space-y-5">
          <input
            className="px-6 py-2 outline-2 border-none rounded-2xl w-full bg-white/80 mt-5"
            type="email"
            name="userEmail"
            id="emailbox"
            value={signupDetails.userEmail}
            onChange={(e) => handleChange(e)}
            placeholder="Email id"
          />
          <input
            className="px-6 py-2 outline-2 border-none rounded-2xl w-full bg-white/80"
            type="text"
            name="userName"
            id="namebox"
            value={signupDetails.userName}
            onChange={(e) => handleChange(e)}
            placeholder="Name"
          />
          <input
            className="px-6 py-2 outline-2 border-none rounded-2xl w-full bg-white/80"
            type="number"
            name="enrolmentNumber"
            value={signupDetails.enrolmentNumber}
            onChange={(e) => handleChange(e)}
            id="enrollbox"
            placeholder="Enrollment Number"
          />
          <input
            className="px-6 py-2 outline-2 border-none rounded-2xl w-full bg-white/80"
            type="text"
            name="course"
            id="coursebox"
            value={signupDetails.course}
            onChange={(e) => handleChange(e)}
            placeholder="Course"
          />
          <input
            className="px-6 py-2 outline-2 border-none rounded-2xl w-full bg-white/80"
            type="text"
            name="branch"
            id="classbox"
            value={signupDetails.branch}
            onChange={(e) => handleChange(e)}
            placeholder="Class"
          />
          <input
            className="px-6 py-2 outline-2 border-none rounded-2xl w-full bg-white/80"
            type="number"
            name="semester"
            id="semesterbox"
            onChange={(e) => handleChange(e)}
            value={signupDetails.semester}
            placeholder="semester"
          />
          <div className="outline-2 px-6 py-2 rounded-2xl w-full bg-white/80 flex items-center justify-between">
            <input
              className="outline-none border-none w-full h-full bg-transparent"
              type={showPassword ? "text" : "password"}
              name="password"
              value={signupDetails.password}
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
        </div>

        <p className="text-base md:text-lg text-center my-5">
          {" "}
          Already have an account?{" "}
          <span
            className="text-blue-600/80 cursor-pointer"
            onClick={() => Navigate("/login")}
          >
            Login
          </span>
        </p>

        <div className="w-70 mx-auto pb-5">
          <button
            className="bg-[var(--secondary-color)] text-center outline-2 w-full py-2 rounded-2xl font-semibold text-xl md:text-2xl cursor-pointer"
            onClick={(e) => handleClick(e)}
          >
            Create it!!!
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
