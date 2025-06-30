import React, { useState, useMemo, useRef } from "react";
import UploadIcon from "../Component/UploadIcon";
import useComponentService from "../apis/componentsApis";
import useProjectService from "../apis/projectsApis";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const ProjectUpload = () => {
  const { getComponentData, getComponent } = useComponentService();
  const { addProject } = useProjectService();

  useMemo(() => {
    return getComponent();
  }, []);

  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    projectDescription: "",
    teacherId: "",
    projectComponents: [],
    projectImage: [],
  });
  const [component, setComponent] = useState("");
  const [additionalComponent, setAdditionalComponent] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (newFiles) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      projectImage: [...prevDetails.projectImage, ...newFiles],
    }));
  };

  const handleComponentsChange = (e) => {
    if (e.target.value == "" || e.target.value == "other") {
      setComponent(e.target.value);
      return;
    }
    const { componentName } = JSON.parse(e.target.value);
    setComponent(componentName);
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      projectComponents: [
        ...prevDetails.projectComponents,
        JSON.parse(e.target.value),
      ],
    }));
    setComponent("");
  };

  const handleAdditionalComponents = () => {
    if (additionalComponent == "") return;
    const id = uuidv4();
    const newComponent = {
      id,
      componentName: additionalComponent,
      componentValue: "10",
      componentAvailability: "0",
      componentImage: "",
    };

    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      projectComponents: [...prevDetails.projectComponents, newComponent],
    }));
    setAdditionalComponent("");
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (item) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      projectComponents: prevDetails.projectComponents.filter(
        (prevItem) => prevItem?._id !== item?._id
      ),
    }));
  };
  const handleRemoveFile = (index) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      projectImage: prevDetails.projectImage.filter((_, i) => i !== index),
    }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("projectName", projectDetails.projectName);
    formData.append("projectDescription", projectDetails.projectDescription);
    formData.append("teacherId", projectDetails.teacherId);
    formData.append(
      "projectComponents",
      JSON.stringify(projectDetails.projectComponents)
    );
    projectDetails.projectImage.forEach((file) =>
      formData.append("projectImage", file)
    );
    const loading = toast.loading("Uploading project");

    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0, 0, 0, 0.5)";
    modal.style.zIndex = "1000";
    document.body.appendChild(modal);

    console.log(projectDetails);

    const response = await addProject(formData);
    console.log(response);
    if (response.status == 201) {
      toast.success(response.data.message);
      toast.dismiss(loading);
      document.body.removeChild(modal);

      setProjectDetails({
        projectName: "",
        projectDescription: "",
        teacherId: "",
        projectComponents: [],
        projectImage: [],
      });
      setComponent("");
      setAdditionalComponent("");
      setProjectDetails((prevDetails) => ({
        ...prevDetails,
        projectImage: [],
      }));
    } else {
      toast.error(response.data.message);
      toast.dismiss(loading);
      document.body.removeChild(modal);
    }
  };

  return (
    <div className="lg:h-[calc(100vh-8.5rem)] flex items-center mt-10 lg:mt-0">
      <div className="w-full flex-1 md:flex justify-center items-center">
        <div
          id="ImageArea"
          className="flex-1 h-full flex items-center justify-center flex-col"
        >
          {/* Black Box - file upload */}
          <div
            className="relative group-hover/file:shadow-2xl z-40  flex flex-col items-center justify-center h-32 mt-4 max-w-[8rem] rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)] min-w-32 bg-[var(--action-color)] cursor-pointer"
            onClick={handleClick}
          >
            <p className="text-white font-bold">Upload Image</p>
            <input
              ref={fileInputRef}
              id="file-upload-handle"
              type="file"
              onChange={(e) =>
                handleFileChange(Array.from(e.target.files || []))
              }
              className="hidden"
            />
            <UploadIcon />
          </div>

          {/* Image Grid */}
          <div
            className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 justify-items-center xl:grid-cols-3 gap-5 min-w-80 max-w-2xl md:w-full my-10 min-h-48 outline-2 outline-dashed p-4
           outline-[var(--action-color)] max-h-96 overflow-y-auto"
          >
            {projectDetails?.projectImage.map((file, index) => (
              <div className="relative" key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-48 w-36 object-cover rounded-md"
                />
                <span
                  className="cursor-pointer absolute top-2 right-2"
                  onClick={() => handleRemoveFile(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#00000"
                    className="h-5 rounded-full bg-sky-100"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Area */}
        <div
          id="FormArea"
          className="px-6 md:px-10 pb-10 md:py-10 flex-1 h-full"
        >
          <div className="space-y-4 md:space-y-6 lg:space-y-8 flex-1 flex flex-col">
            <input
              type="text"
              name="projectName"
              value={projectDetails.projectName}
              onChange={(e) => handleChange(e)}
              id=""
              placeholder="Project Name"
              className="outline-2 outline-[var(--secondary-color)] rounded-md p-2 w-full max-w-xl"
            />
            <textarea
              name="projectDescription"
              placeholder="Project Description"
              id=""
              rows="5"
              value={projectDetails.projectDescription}
              onChange={(e) => handleChange(e)}
              className="outline-2 outline-[var(--secondary-color)] rounded-md p-2 w-full max-w-xl"
            ></textarea>
            <input
              type="text"
              name="teacherId"
              id=""
              value={projectDetails.teacherId}
              onChange={(e) => handleChange(e)}
              placeholder="Teacher Id"
              className="outline-2 outline-[var(--secondary-color)] rounded-md p-2 w-full max-w-xl"
            />
            <select
              name="projectComponents"
              className="outline-2 outline-[var(--secondary-color)] rounded-md p-2 w-full max-w-xl"
              id=""
              value={component}
              onChange={(e) => handleComponentsChange(e)}
            >
              <option value="">Choose Component</option>
              {getComponentData.map((item, index) => (
                <option key={index} value={JSON.stringify(item)}>
                  {item.componentName}
                </option>
              ))}
              <option value="other">Others...</option>
            </select>
            {component === "other" && (
              <div className="flex max-w-xl gap-4">
                <input
                  type="text"
                  name="additionalComponent"
                  id=""
                  value={additionalComponent}
                  onChange={(e) => setAdditionalComponent(e.target.value)}
                  placeholder="Add Component"
                  className="outline-2 outline-[var(--secondary-color)] rounded-md p-2 w-full max-w-xl"
                />
                <button
                  onClick={handleAdditionalComponents}
                  className="bg-[var(--action-color)] text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  Add
                </button>
              </div>
            )}
          </div>
          <ul className="p-4 flex gap-2 flex-wrap max-w-xl max-h-96  overflow-y-auto">
            {projectDetails.projectComponents.map((item, index) => (
              <li
                key={index}
                className="p-2 rounded-lg bg-sky-100 flex-1 flex gap-2 items-center justify-between shadow-2xl max-w-fit"
              >
                {item.componentName}
                <span
                  className="cursor-pointer"
                  onClick={() => handleRemove(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#00000"
                    className="h-5 rounded-full bg-sky-200"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </span>
              </li>
            ))}
          </ul>

          <div className="w-full flex items-center justify-center max-w-xl">
            <button
              className="bg-[var(--action-color)] text-white px-4 py-2 rounded-lg min-w-56 lg:min-w-sm font-bold text-xl cursor-pointer"
              onClick={handleUpload}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectUpload;
