import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProjectService from "../apis/projectsApis";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjects, getProjectData, updateProject } = useProjectService();
  const [statusMap, setStatusMap] = useState("");

  useEffect(() => {
    getProjects(id);
  }, []);

  useEffect(() => {
    if (getProjectData?.isVerified) {
      setStatusMap(getProjectData.isVerified);
    }
  }, [getProjectData]);

  const updateStatus = (data) => {
    setStatusMap(data);
    updateProject(getProjectData._id, { isVerified: data });
  };

  return (
    <div>
      {getProjectData ? (
        <div className="my-4 md:my-6">
          <div className="flex flex-wrap gap-2 mx-4 justify-center">
            {getProjectData.projectImage?.map((img, index) => (
              <img
                src={img.imageUrl}
                key={img.imageId}
                alt={`project image ${index + 1}`}
                className="w-auto h-36 md:min-h-72 max-w-72 object-cover flex-1 rounded-xl shadow-xl"
              />
            ))}
          </div>
          <div className="py-2 px-4 lg:py-6 space-y-2 flex flex-col items-center max-w-7xl mx-auto">
            <p
              className={`text-[var(--gradient)] text-2xl md:text-3xl font-bold text-center`}
            >
              {getProjectData.projectName}
            </p>
            <p className=" text-base md:text-lg">
              {getProjectData.projectDescription}
            </p>
            <p className="text-base md:text-lg">
              {" "}
              <span className="font-semibold">Submitted By :</span>{" "}
              {getProjectData?.userId?.userName}
            </p>
            <p className="text-base md:text-lg">
              {" "}
              <span className="font-semibold">Submitted To :</span>{" "}
              {getProjectData?.teacherId?.userName}
            </p>
            <ul className="flex gap-2 flex-wrap max-w-xl max-h-96  overflow-y-auto">
              {getProjectData.projectComponents?.map((item, index) => (
                <li
                  key={index}
                  className="p-2 rounded-lg bg-sky-100 items-center justify-between shadow-xl max-w-fit"
                >
                  {item.componentName}
                </li>
              ))}
            </ul>
            <select
              name=""
              id=""
              value={statusMap}
              onChange={(e) => updateStatus(e.target.value)}
              className={`max-w-xs w-full rounded-md p-2 font-medium outline-none border-none focus:bg-white
                ${statusMap === "unverified" ? "bg-[#ef9651]" : ""}
                ${statusMap === "verified" ? "bg-[#3f7d58]" : ""}
                ${statusMap === "rejected" ? "bg-red-500" : ""}`}
            >
              <option value="unverified">Non Verified</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProjectDetails;
