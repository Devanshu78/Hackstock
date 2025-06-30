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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (newFiles) => {
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      componentImage: [...prevDetails.componentImage, ...newFiles],
    }));
  };

  const handleRemoveFile = (index) => {
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      componentImage: prevDetails.componentImage.filter((_, i) => i !== index),
    }));
  };

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
    <div>
      <div className="max-w-56 rounded-md p-1 rounded-b-xl shadow-md bg-[#efefef] text-[#59287b] w-full">
        <img
          src={newDetails.componentImage}
          alt=""
          className="w-full h-36 md:h-44 lg:h-56 object-cover rounded-lg"
        />
        <div
          className={`w-full px-1 mb-1 ${
            isEditable ? "space-y-1.5 my-2" : "space-y-0"
          }`}
        >
          {!isEditable ? (
            <p className="text-xl px-2 font-semibold">
              {newDetails.componentName}
            </p>
          ) : (
            <input
              type="text"
              value={newDetails.componentName}
              onChange={(e) => handleChange(e)}
              name="componentName"
              readOnly={!isEditable}
              className={` ${
                isEditable ? "outline-1" : "outline-none"
              } w-full rounded-md px-2 max-w-64 border-none text-xl text-ellipsis`}
              placeholder="Component Name"
            />
          )}
          <section className="flex justify-between items-center gap-1 px-2">
            <label
              htmlFor="componentValue"
              className={`text-nowrap font-medium ${
                isEditable ? "hidden" : "block"
              }`}
            >
              Value :
            </label>
            <input
              type="text"
              value={newDetails.componentValue}
              onChange={(e) => handleChange(e)}
              name="componentValue"
              readOnly={!isEditable}
              className={` ${
                isEditable ? "outline-1 px-2" : "outline-none"
              } w-full rounded-md  max-w-64 border-none text-lg`}
              placeholder="Component Value"
            />
          </section>
          <section className="flex justify-between items-center gap-1 px-2 ">
            <label
              htmlFor="coponentAvailability"
              className={`text-nowrap font-medium ${
                isEditable ? "hidden" : "block"
              }`}
            >
              Left :
            </label>
            <input
              type="text"
              name="componentAvailability"
              value={newDetails.componentAvailability}
              onChange={(e) => handleChange(e)}
              readOnly={!isEditable}
              className={` ${
                isEditable ? "outline-1 px-2" : "outline-none"
              } w-full rounded-md max-w-64 border-none text-lg `}
              placeholder="Component Available"
            />
          </section>
        </div>
        <div>
          <div className="flex justify-between px-2 md:px-4 w-full  max-w-7xl">
            <button
              className="bg-[#3f64fb] px-2 md:px-4 rounded-lg cursor-pointer"
              onClick={() => handleDeletions(item._id, item.imageId)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#efefef"
                className="h-5 w-5 md:h-6 md:w-6"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
            <div className="bg-[#3f64fb] px-2 md:px-4 py-1 flex items-center rounded-lg cursor-pointer">
              {isEditable ? (
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    editDetail(item?._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#efefef"
                    className="h-4 w-4 md:h-6 md:w-6"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                </button>
              ) : (
                <button
                  className="cursor-pointer "
                  onClick={() => {
                    setIsEditable((prev) => !prev);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#efefef"
                    className="h-4 w-4 md:h-6 md:w-6"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
