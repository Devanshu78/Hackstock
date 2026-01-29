import React, { useRef, useState } from "react";
import useComponentsService from "../apis/componentsApis";

function AddComponent() {
  const { addComponent } = useComponentsService();
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
    setIsOpen(false);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleCancel = () => {
    setComponentDetails({
      componentName: "",
      componentValue: "",
      componentAvailability: "",
      componentImage: "",
    });
    setIsOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add New Component</span>
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Component
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Component Image
              </label>
              {componentDetails.componentImage.length === 0 ? (
                <div
                  onClick={handleClick}
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload image
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(Array.from(e.target.files || []))
                    }
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <img
                    src={URL.createObjectURL(
                      componentDetails.componentImage[0]
                    )}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveFile(0)}
                    className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Component Name
              </label>
              <input
                type="text"
                name="componentName"
                value={componentDetails.componentName}
                onChange={handleChange}
                placeholder="e.g., Arduino Uno"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Value
                </label>
                <input
                  type="text"
                  name="componentValue"
                  value={componentDetails.componentValue}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Available Quantity
                </label>
                <input
                  type="text"
                  name="componentAvailability"
                  value={componentDetails.componentAvailability}
                  onChange={handleChange}
                  placeholder="e.g., 20"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={
                  isLoading ||
                  !componentDetails.componentName ||
                  !componentDetails.componentImage
                }
                className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Adding..." : "Add Component"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddComponent;
