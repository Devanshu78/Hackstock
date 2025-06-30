import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProjectService from "../apis/projectsApis";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, getProjectData, updateProject, deleteProject } =
    useProjectService();

  const [isEditable, setIsEditable] = useState(false);
  const [clickToDelete, setClickToDelete] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");

  useEffect(() => {
    getProject(id);
  }, []);
  const textareaRef = useRef();

  useEffect(() => {
    if (getProjectData) {
      setUpdateName(getProjectData.projectName || "");
      setUpdateDesc(getProjectData.projectDescription || "");
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [getProjectData]);

  console.log("getProjectData", getProjectData);

  const editDetail = async () => {
    const newData = {
      ...getProjectData,
      projectName: updateName,
      projectDescription: updateDesc,
    };
    await updateProject(newData._id, newData);
    setIsEditable(!isEditable);
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
            <input
              type="text"
              name="projectName"
              id=""
              readOnly={!isEditable}
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              className={`border-none text-[var(--action-color)] text-2xl md:text-3xl font-bold text-center w-full max-w-7xl  rounded-lg ${
                isEditable ? `outline-1 py-1` : `outline-none`
              }`}
            />
            <textarea
              name="projectDescription"
              ref={textareaRef}
              id=""
              value={updateDesc}
              readOnly={!isEditable}
              onChange={(e) => setUpdateDesc(e.target.value)}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              // rows={1}
              className={`border-none text-base md:text-lg w-full max-w-7xl rounded-lg ${
                isEditable ? `outline-1 p-1 ` : `outline-none text-center`
              }`}
            />
            <p className="text-base md:text-lg">
              {" "}
              <span className="font-semibold">Submitted to :</span>{" "}
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
            {getProjectData.isVerified === "verified" && (
              <div className="bg-[var(--action-color)] rounded-md text-center w-full max-w-lg md:max-w-xl md:text-lg font-medium py-1 text-white">
                Verified
              </div>
            )}
            {getProjectData.isVerified === "unverified" && (
              <div className="bg-[var(--secondary-color)] rounded-md text-center w-full max-w-lg md:max-w-xl md:text-lg font-medium py-1">
                Non Verified
              </div>
            )}
            {getProjectData.isVerified === "rejected" && (
              <div className="bg-red-500/80 rounded-md text-center w-full max-w-lg md:max-w-xl md:text-lg font-medium py-1 text-white">
                Rejected
              </div>
            )}

            <div className="flex gap-4 justify-center w-full  max-w-7xl">
              <div className="bg-[#7cb6cb] px-2 py-1 flex items-center rounded-lg cursor-pointer">
                {isEditable ? (
                  <button
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => {
                      editDetail();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="#ec5228"
                      className="h-8 w-8"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                    <span className="hidden md:block text-xl font-semibold text-[#ec5228]">
                      Save
                    </span>
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-1 cursor-pointer "
                    onClick={() => {
                      setIsEditable((prev) => !prev);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="#ec5228"
                      className="h-8 w-8"
                    >
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                    <span className="hidden md:block text-xl font-semibold text-[#ec5228]">
                      Edit
                    </span>
                  </button>
                )}
              </div>
              <button
                className="bg-[#7cb6cb] p-1 flex items-center gap-1 rounded-lg cursor-pointer"
                onClick={() => {
                  setClickToDelete(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="#ef0f16"
                  className="h-8 w-8"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
                <span className="hidden md:block text-xl font-semibold text-[#ef0f16]">
                  Delete
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {clickToDelete && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl font-inter shadow-2xl">
          <h1 className="text-xl text-center font-semibold">Are you sure?</h1>
          <div className="mt-2 flex items-center gap-4 justify-between ">
            <button
              onClick={() => setClickToDelete(false)}
              className="border border-gray-800 px-4 py-2 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                const response = await deleteProject(getProjectData._id);
                if (response) {
                  navigate("/projects");
                }
                setClickToDelete(false);
              }}
              className="text-white font-bold rounded-lg bg-red-500 border border-red-500 hover:bg-red-600 hover:border-red-600 px-4 py-2 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
