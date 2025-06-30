import React, { useRef, useState } from "react";
import UploadIcon from "./UploadIcon";
import useComponentsService from "../apis/componentsApis";

function AddComponent() {
  const { addComponent } = useComponentsService();

  const fileInputRef = useRef(null);
  const [isActive, setActive] = useState(false);
  const [componentDetails, setComponentDetails] = useState({
    componentName: "",
    componentValue: "",
    componentAvailability: "",
    componentImage: "",
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (newFiles) => {
    setComponentDetails((prevDetails) => ({
      ...prevDetails,
      componentImage: [...prevDetails.componentImage, ...newFiles],
    }));
  };

  const handleRemoveFile = (index) => {
    setComponentDetails((prevDetails) => ({
      ...prevDetails,
      componentImage: prevDetails.componentImage.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComponentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("componentImage", componentDetails.componentImage[0]);
    formData.append("componentName", componentDetails.componentName);
    formData.append("componentValue", componentDetails.componentValue);
    formData.append(
      "componentAvailability",
      componentDetails.componentAvailability
    );

    await addComponent(formData);
    setComponentDetails({
      componentName: "",
      componentValue: "",
      componentAvailability: "",
      componentImage: "",
    });
    setActive(false);
    fileInputRef.current.value = null;
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-10 p-4 my-6">
        <div
          className={`relative group-hover/file:shadow-2xl z-40  flex flex-col items-center justify-center h-32 max-w-[8rem] rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)] min-w-32 bg-[var(--color)] cursor-pointer ${
            componentDetails.componentImage.length > 0 ? "hidden" : "block"
          } ${
            isActive
              ? "block transition-all duration-300 ease-in-out"
              : " hidden"
          }`}
          onClick={handleClick}
        >
          <p className="text-white font-bold">Upload Image</p>
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            type="file"
            onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
            className="hidden"
          />
          <UploadIcon />
        </div>
        {componentDetails.componentImage.length > 0 && isActive && (
          <div className="flex flex-wrap">
            {componentDetails?.componentImage?.map((file, index) => (
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
        )}

        <div
          className={`${isActive ? "space-y-6" : "space-y-0"} w-full max-w-sm`}
        >
          <input
            type="text"
            name="componentName"
            value={componentDetails.componentName}
            onChange={(e) => handleChange(e)}
            id=""
            onClick={() => setActive(true)}
            placeholder={`${isActive ? "Component Name" : "Add New Component"}`}
            className={`outline-2 outline-[var(--gradient)] rounded-md p-2 w-full ${
              isActive ? "text-start" : "text-center"
            }`}
          />
          <input
            type="text"
            name="componentValue"
            value={componentDetails.componentValue}
            onChange={(e) => handleChange(e)}
            id=""
            placeholder="Component Value"
            className={`outline-2 outline-[var(--gradient)] rounded-md p-2 w-full ${
              isActive
                ? "block transition-shadow duration-300 ease-in-out"
                : "hidden"
            }`}
          />
          <input
            type="text"
            name="componentAvailability"
            value={componentDetails.componentAvailability}
            onChange={(e) => handleChange(e)}
            id=""
            placeholder="Component Available"
            className={`outline-2 outline-[var(--gradient)] rounded-md p-2 w-full ${
              isActive
                ? "block transition-all duration-300 ease-in-out"
                : "hidden"
            }`}
          />
        </div>

        <button
          className={`cursor-pointer outline-1.5 py-2 px-4 bg-[var(--primary-btn)] text-center text-white rounded-md hover:bg-[var(--primary-dark-btn)] transform-none transition-all duration-300 ease-in-out ${
            isActive ? "block" : "hidden"
          }`}
          onClick={handleSubmit}
        >
          Add Component
        </button>
      </div>
    </div>
  );
}

export default AddComponent;
