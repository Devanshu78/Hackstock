import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProjectService from "../apis/projectsApis";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjects, getProjectData, updateProject } = useProjectService();
  const [statusMap, setStatusMap] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      await getProjects(id);
      setIsLoading(false);
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    if (getProjectData?.isVerified) {
      setStatusMap(getProjectData.isVerified);
    }
  }, [getProjectData]);

  const updateStatus = (data) => {
    setStatusMap(data);
    updateProject(getProjectData._id, { isVerified: data });
  };

  const getStatusConfig = (status) => {
    const config = {
      verified: {
        bg: "bg-green-100 dark:bg-green-900/20",
        text: "text-green-800 dark:text-green-400",
        border: "border-green-300 dark:border-green-700",
        label: "Verified",
      },
      unverified: {
        bg: "bg-yellow-100 dark:bg-yellow-900/20",
        text: "text-yellow-800 dark:text-yellow-400",
        border: "border-yellow-300 dark:border-yellow-700",
        label: "Pending Review",
      },
      rejected: {
        bg: "bg-red-100 dark:bg-red-900/20",
        text: "text-red-800 dark:text-red-400",
        border: "border-red-300 dark:border-red-700",
        label: "Rejected",
      },
    };
    return config[status] || config.unverified;
  };

  const currentStatus = getStatusConfig(statusMap);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Go back"
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Project Details
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Review project submission and update status
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg
                className="animate-spin h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Loading project details...
              </p>
            </div>
          </div>
        ) : getProjectData ? (
          <div className="space-y-6">
            {/* Project Images Gallery */}
            {getProjectData.projectImage?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Project Images
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getProjectData.projectImage.map((img, index) => (
                    <div key={img.imageId} className="relative group">
                      <div
                        onClick={() => setSelectedImage(img.imageUrl)}
                        className="relative h-64 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all cursor-pointer bg-white dark:bg-gray-800"
                      >
                        {/* Main Image - Always visible */}
                        <img
                          src={img.imageUrl}
                          alt={`Project image ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==";
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {getProjectData.projectName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {getProjectData.projectDescription}
                  </p>
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Submitted By */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <svg
                      className="w-5 h-5 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Submitted By
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {getProjectData?.userId?.userName || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Submitted To */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <svg
                      className="w-5 h-5 text-purple-600 dark:text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Submitted To
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {getProjectData?.teacherId?.userName || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Components */}
            {getProjectData.projectComponents?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Components ({getProjectData.projectComponents.length})
                </h2>
                <div className="flex flex-wrap gap-2">
                  {getProjectData.projectComponents.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <svg
                        className="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item.componentName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Status Update Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Project Status
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Current Status
                  </p>
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}
                  >
                    {currentStatus.label}
                  </span>
                </div>
                <div className="w-full sm:w-64">
                  <label
                    htmlFor="status-select"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Update Status
                  </label>
                  <select
                    id="status-select"
                    value={statusMap}
                    onChange={(e) => updateStatus(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors border ${
                      statusMap === "unverified"
                        ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700"
                        : statusMap === "verified"
                        ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-300 dark:border-green-700"
                        : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-300 dark:border-red-700"
                    }`}
                    style={{
                      colorScheme: document.documentElement.classList.contains(
                        "dark"
                      )
                        ? "dark"
                        : "light",
                    }}
                  >
                    <option
                      value="unverified"
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      Pending Review
                    </option>
                    <option
                      value="verified"
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      Verified
                    </option>
                    <option
                      value="rejected"
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      Rejected
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Project not found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              The requested project could not be loaded
            </p>
          </div>
        )}
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Close"
            >
              <svg
                className="w-6 h-6 text-gray-900 dark:text-white"
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

            {/* Image */}
            <img
              src={selectedImage}
              alt="Project image preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
