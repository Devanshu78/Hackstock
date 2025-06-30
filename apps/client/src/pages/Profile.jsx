import React, { useEffect } from "react";
import useUserService from "../apis/usersApis";

function Profile() {
  const { getStudentDetails, getUser } = useUserService();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-auto mx-4 my-4 md:my-10 md:mx-auto md:px-4 max-w-7xl">
      <h1 className="text-center font-ag text-3xl text-[var(--action-color)]">
        Profile
      </h1>

      <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Name :{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.userName}
          </span>
        </p>
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Email :{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.userEmail}
          </span>
        </p>
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Enrolment Number :{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.enrolmentNumber}
          </span>
        </p>

        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Semester :{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.semester}
          </span>
        </p>
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Result :{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.result}
          </span>
        </p>
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Points :{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.points}
          </span>
        </p>

        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Course :{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.course}
          </span>
        </p>
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Branch :{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.branch}
          </span>
        </p>
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Fire Points :{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.firePoints}
          </span>
        </p>

        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Total Project Submitted :{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.verifiedProjects +
              getStudentDetails?.nonVerifiedProjects}
          </span>
        </p>
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Verified Projects :{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.verifiedProjects}
          </span>
        </p>
        <p className="p-2 bg-sky-50 rounded-lg shadow-md text-center">
          Non Verified Projects:{" "}
          <span className="text-lg font-medium">
            {getStudentDetails?.nonVerifiedProjects}
          </span>
        </p>
      </section>
    </div>
  );
}

export default Profile;
