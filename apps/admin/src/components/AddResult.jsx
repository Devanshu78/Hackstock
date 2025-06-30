import React, { useState, useRef } from "react";
import UploadIcon from "./UploadIcon";
import toast from "react-hot-toast";
import { useResultsService } from "../apis/resultsApis";

const AddResult = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const { addResult } = useResultsService();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (newFiles) => {
    const selectedFile = newFiles[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // sent to store
    try {
      await addResult(formData);
      setFile(null);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-10 p-4 my-6">
        <div
          className={`relative group-hover/file:shadow-2xl z-40 flex items-center justify-center gap-4 h-10 w-full max-w-xs rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)] min-w-32 bg-[var(--color)] cursor-pointer
          ${file ? "hidden" : "block"} `}
          onClick={handleClick}
        >
          <p className="text-white font-bold">Add File</p>
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            type="file"
            onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
            className="hidden"
          />
          <UploadIcon />
        </div>

        {file && (
          <p className="text-white bg-[var(--color)] font-semibold text-base md:text-lg outline-1 h-10 w-full max-w-xs flex justify-center items-center rounded-md ">
            {file.name}
          </p>
        )}

        <button
          className={`cursor-pointer outline-1.5 py-2 px-4 bg-[var(--primary-btn)] text-center text-white rounded-md hover:bg-[var(--primary-dark-btn)] transform-none transition-all duration-300 ease-in-out `}
          onClick={handleUpload}
        >
          Upload Result
        </button>
      </div>
    </div>
  );
};

export default AddResult;
