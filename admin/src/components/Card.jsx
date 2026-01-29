import React, { useState } from "react";
import useComponentsService from "../apis/componentsApis";

const Card = ({ item }) => {
  const [isEditable, setIsEditable] = useState(false);
  const { deleteComponent, updateComponent } = useComponentsService();

  const [newDetails, setNewDetails] = useState({
    componentName: item.componentName,
    componentValue: item.componentValue,
    componentAvailability: item.componentAvailability,
    componentImage: item.componentImage,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const editDetail = async (id) => {
    await updateComponent(id, newDetails);
    setIsEditable(!isEditable);
  };

  const handleDeletions = async (id, imageId) => {
    const response = await deleteComponent(id, imageId);
    if (response) {
      console.log("Deleted successfully");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={newDetails.componentImage}
          alt={newDetails.componentName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Component Name */}
        {!isEditable ? (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {newDetails.componentName}
          </h3>
        ) : (
          <input
            type="text"
            value={newDetails.componentName}
            onChange={handleChange}
            name="componentName"
            className="w-full px-3 py-2 text-lg font-semibold bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
            placeholder="Component Name"
          />
        )}

        {/* Value and Availability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Value:
            </span>
            {!isEditable ? (
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {newDetails.componentValue}
              </span>
            ) : (
              <input
                type="text"
                value={newDetails.componentValue}
                onChange={handleChange}
                name="componentValue"
                className="w-24 px-2 py-1 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                placeholder="Value"
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Available:
            </span>
            {!isEditable ? (
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {newDetails.componentAvailability}
              </span>
            ) : (
              <input
                type="text"
                value={newDetails.componentAvailability}
                onChange={handleChange}
                name="componentAvailability"
                className="w-24 px-2 py-1 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                placeholder="Available"
              />
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <button
          onClick={() => handleDeletions(item._id, item.imageId)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span className="text-sm font-medium">Delete</span>
        </button>

        {isEditable ? (
          <button
            onClick={() => editDetail(item?._id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-medium">Save</span>
          </button>
        ) : (
          <button
            onClick={() => setIsEditable(true)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="text-sm font-medium">Edit</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
