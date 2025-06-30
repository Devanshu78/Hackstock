import React, { useEffect } from "react";
import useUserService from "../apis/usersApis";
import { useNavigate } from "react-router-dom";

function Project() {
  const { getTeacherDetails, getData } = useUserService();
  const Navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  console.log(getTeacherDetails.projects);
  return (
    <div className="w-auto mx-4 mt-4 md:my-10 md:mx-auto md:px-4 max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center md:justify-items-normal">
      {getTeacherDetails?.projects?.map((project) => (
        <div
          key={project._id}
          className="bg-sky-50 p-5 shadow-lg space-y-2 rounded-lg cursor-pointer w-full"
          onClick={() => Navigate(`/project/${project._id}`)}
        >
          <h1 className="text-2xl font-normal">{project.projectName}</h1>
          <h2 className="text-base/6 max-h-26 overflow-clip tracking-tight text-ellipsis text-nowrap">
            {project.projectDescription}
          </h2>
          {project.isVerified === "verified" && (
            <div className="bg-[#3f7d58] rounded-md text-center w-full max-w-lg md:max-w-xl md:text-lg font-medium py-1 text-white">
              Verified
            </div>
          )}
          {project.isVerified === "unverified" && (
            <div className="bg-[#ef9651] rounded-md text-center w-full max-w-lg md:max-w-xl md:text-lg font-medium py-1">
              Non Verified
            </div>
          )}
          {project.isVerified === "rejected" && (
            <div className="bg-red-500/80 rounded-md text-center w-full max-w-lg md:max-w-xl md:text-lg font-medium py-1 text-white">
              Rejected
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Project;
