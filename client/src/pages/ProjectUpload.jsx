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
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (newFiles) => {
    const validFiles = Array.from(newFiles).filter((file) =>
      file.type.startsWith("image/")
    );
    if (validFiles.length !== newFiles.length) {
      toast.error("Only image files are allowed");
    }
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      projectImage: [...prevDetails.projectImage, ...validFiles],
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleComponentsChange = (e) => {
    if (e.target.value === "" || e.target.value === "other") {
      setComponent(e.target.value);
      return;
    }
    const parsedValue = JSON.parse(e.target.value);
    const exists = projectDetails.projectComponents.some(
      (comp) => comp._id === parsedValue._id
    );
    if (exists) {
      toast.error("Component already added");
      setComponent("");
      return;
    }
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      projectComponents: [...prevDetails.projectComponents, parsedValue],
    }));
    setComponent("");
  };

  const handleAdditionalComponents = () => {
    if (!additionalComponent.trim()) return;
    const id = uuidv4();
    const newComponent = {
      id,
      componentName: additionalComponent.trim(),
      componentValue: "10",
      componentAvailability: "0",
      componentImage: "",
    };
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      projectComponents: [...prevDetails.projectComponents, newComponent],
    }));
    setAdditionalComponent("");
    setComponent("");
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (item) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      projectComponents: prevDetails.projectComponents.filter(
        (prevItem) => prevItem?._id !== item?._id && prevItem?.id !== item?.id
      ),
    }));
  };

  const handleRemoveFile = (index) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      projectImage: prevDetails.projectImage.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!projectDetails.projectName.trim()) {
      toast.error("Please enter a project name");
      return false;
    }
    if (!projectDetails.projectDescription.trim()) {
      toast.error("Please enter a project description");
      return false;
    }
    if (!projectDetails.teacherId.trim()) {
      toast.error("Please enter teacher ID");
      return false;
    }
    if (projectDetails.projectComponents.length === 0) {
      toast.error("Please add at least one component");
      return false;
    }
    return true;
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    setIsUploading(true);
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

    const response = await addProject(formData);

    if (response.status === 201) {
      toast.success(response.data.message);
      setProjectDetails({
        projectName: "",
        projectDescription: "",
        teacherId: "",
        projectComponents: [],
        projectImage: [],
      });
      setComponent("");
      setAdditionalComponent("");
    } else {
      toast.error(response.data.message || "Something went wrong");
    }
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Upload Project
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Submit your project for review and verification by the admin team
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images Upload */}
          <div
            className="space-y-6 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Upload Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleClick}
              className={`
                relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
                transition-all duration-300 bg-white dark:bg-slate-800
                ${
                  dragActive
                    ? "border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 scale-[1.02]"
                    : "border-gray-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e.target.files)}
                className="hidden"
              />

              {/* Upload Icon */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl animate-pulse" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {dragActive ? "Drop images here" : "Upload project images"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                Drag and drop or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                PNG, JPG, JPEG up to 10MB each
              </p>
            </div>

            {/* Image Preview Grid */}
            {projectDetails.projectImage.length > 0 && (
              <div className="space-y-4 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {projectDetails.projectImage.length} image
                    {projectDetails.projectImage.length > 1 ? "s" : ""} selected
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProjectDetails((prev) => ({
                        ...prev,
                        projectImage: [],
                      }));
                    }}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 font-medium transition-colors"
                  >
                    Remove all
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {projectDetails.projectImage.map((file, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700 animate-fadeIn shadow-sm hover:shadow-md transition-shadow"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(index);
                          }}
                          className="p-3 bg-white dark:bg-slate-800 rounded-full text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-lg hover:scale-110"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-xs text-white font-medium truncate">
                          {file.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Form */}
          <div
            className="space-y-6 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-slate-700 space-y-6">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Project Name{" "}
                  <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={projectDetails.projectName}
                  onChange={handleChange}
                  placeholder="Enter your project name"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description{" "}
                  <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <textarea
                  name="projectDescription"
                  value={projectDetails.projectDescription}
                  onChange={handleChange}
                  placeholder="Describe your project..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Teacher ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Teacher ID{" "}
                  <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="teacherId"
                  value={projectDetails.teacherId}
                  onChange={handleChange}
                  placeholder="Enter teacher ID"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 font-mono text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Components Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Components{" "}
                  <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <select
                  value={component}
                  onChange={handleComponentsChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/50 outline-none transition-all cursor-pointer text-gray-900 dark:text-gray-100"
                >
                  <option value="">Choose a component</option>
                  {getComponentData.map((item, index) => (
                    <option key={index} value={JSON.stringify(item)}>
                      {item.componentName}
                    </option>
                  ))}
                  <option value="other">➕ Other (custom)...</option>
                </select>

                {/* Custom Component Input */}
                {component === "other" && (
                  <div className="flex gap-2 mt-3 animate-fadeIn">
                    <input
                      type="text"
                      value={additionalComponent}
                      onChange={(e) => setAdditionalComponent(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAdditionalComponents()
                      }
                      placeholder="Enter component name"
                      className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all placeholder:text-gray-400"
                    />
                    <button
                      onClick={handleAdditionalComponents}
                      className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shadow-sm hover:shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Selected Components */}
                {projectDetails.projectComponents.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    {projectDetails.projectComponents.map((item, index) => (
                      <span
                        key={item._id || item.id}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-emerald-200 rounded-lg text-sm font-semibold text-gray-900 animate-fadeIn shadow-sm hover:shadow-md transition-shadow"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                        {item.componentName}
                        <button
                          onClick={() => handleRemove(item)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 dark:disabled:from-slate-700 dark:disabled:to-slate-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Uploading Project...</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Submit Project</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectUpload;
