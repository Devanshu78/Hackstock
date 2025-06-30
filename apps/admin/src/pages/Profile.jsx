import React, { useEffect } from "react";
import useUserService from "../apis/usersApis";

function Profile() {
  const { getTeacherDetails, getData } = useUserService();

  useEffect(() => {
    getData();
  }, []);
  console.log(getTeacherDetails);

  return (
    <div className="w-auto mx-4 my-4 md:my-10 md:mx-auto md:px-4 max-w-7xl">
      <h1 className="text-center font-ag text-3xl text-[#3f7d58]">Profile</h1>

      <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Name :{" "}
          <span className="text-lg font-medium">
            {getTeacherDetails?.userName}
          </span>
        </p>
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Email :{" "}
          <span className="text-lg font-medium">
            {getTeacherDetails?.userEmail}
          </span>
        </p>
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Phone Number :{" "}
          <span className="text-lg font-medium">
            {getTeacherDetails?.phoneNumber}
          </span>
        </p>

        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Role :{" "}
          <span className="text-lg font-medium">{getTeacherDetails?.role}</span>
        </p>

        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Course :{" "}
          <span className="text-lg font-medium">
            {getTeacherDetails?.course}
          </span>
        </p>
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Branch :{" "}
          <span className="text-lg font-medium">
            {getTeacherDetails?.branch}
          </span>
        </p>

        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Total Project Submitted :{" "}
          <span className="text-lg font-medium">
            {getTeacherDetails?.projects?.length}
          </span>
        </p>
      </section>
    </div>
  );
}

export default Profile;
