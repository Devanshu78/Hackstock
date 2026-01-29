import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProjectService from "../apis/projectsApis";
import toast from "react-hot-toast";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, getProjectData, updateProject, deleteProject } =
    useProjectService();

  const [isEditable, setIsEditable] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const textareaRef = useRef();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await getProject(id);
      setIsLoading(false);
    };
    loadData();
  }, [id]);

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

  const editDetail = async () => {
    setIsSaving(true);
    const newData = {
      ...getProjectData,
      projectName: updateName,
      projectDescription: updateDesc,
    };
    await updateProject(newData._id, newData);
    setIsEditable(false);
    setIsSaving(false);
    toast.success("Project updated successfully");
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteProject(getProjectData._id);
    if (response) {
      toast.success("Project deleted");
      navigate("/projects");
    }
    setIsDeleting(false);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "verified":
        return {
          label: "Verified",
          className:
            "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
      case "unverified":
        return {
          label: "Pending Review",
          className:
            "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
      case "rejected":
        return {
          label: "Rejected",
          className:
            "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
      default:
        return {
          label: "Unknown",
          className:
            "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-slate-700",
          icon: null,
        };
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="aspect-video bg-gray-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-10 w-3/4 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-24 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
    );
  }

  if (!getProjectData) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-gray-400 dark:text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Project not found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The project you're looking for doesn't exist or has been deleted.
        </p>
        <button
          onClick={() => navigate("/projects")}
          className="btn btn-primary"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const statusConfig = getStatusConfig(getProjectData.isVerified);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors animate-fadeInUp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
            clipRule="evenodd"
          />
        </svg>
        Back to Projects
      </button>

      {/* Image Gallery */}
      {getProjectData.projectImage?.length > 0 && (
        <div className="mb-8 animate-fadeInUp">
          {/* Main Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 mb-3">
            <img
              src={getProjectData.projectImage[activeImage]?.imageUrl}
              alt={`${getProjectData.projectName} - Image ${activeImage + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {getProjectData.projectImage.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {getProjectData.projectImage.map((img, index) => (
                <button
                  key={img.imageId}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 transition-all duration-200 ${
                    activeImage === index
                      ? "ring-2 ring-emerald-600 dark:ring-emerald-400 ring-offset-2 dark:ring-offset-slate-900"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Project Info */}
      <div className="animate-fadeInUp" style={{ animationDelay: "100ms" }}>
        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${statusConfig.className} mb-4`}
        >
          {statusConfig.icon}
          <span className="font-semibold">{statusConfig.label}</span>
        </div>

        {/* Title */}
        {isEditable ? (
          <input
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            className="input text-3xl font-bold mb-4"
            placeholder="Project Name"
          />
        ) : (
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {getProjectData.projectName}
          </h1>
        )}

        {/* Description */}
        {isEditable ? (
          <textarea
            ref={textareaRef}
            value={updateDesc}
            onChange={(e) => setUpdateDesc(e.target.value)}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            className="input textarea mb-6"
            placeholder="Project Description"
          />
        ) : (
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {getProjectData.projectDescription}
          </p>
        )}

        {/* Teacher Info */}
        {getProjectData.teacherId && (
          <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-slate-800 rounded-xl mb-6">
            <div className="w-12 h-12 rounded-full gradient-cool flex items-center justify-center text-white font-bold">
              {getProjectData.teacherId.userName?.charAt(0)?.toUpperCase() ||
                "T"}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Submitted to
              </p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {getProjectData.teacherId.userName}
              </p>
            </div>
          </div>
        )}

        {/* Components */}
        {getProjectData.projectComponents?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Components Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {getProjectData.projectComponents.map((comp, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {comp.componentName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200 dark:border-slate-700">
          {isEditable ? (
            <>
              <button
                onClick={editDetail}
                disabled={isSaving}
                className="btn btn-success"
              >
                {isSaving ? (
                  <>
                    <span className="spinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setIsEditable(false);
                  setUpdateName(getProjectData.projectName);
                  setUpdateDesc(getProjectData.projectDescription);
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditable(true)}
                className="btn btn-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-danger"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm animate-fadeIn" />
          <div
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-scaleInBounce"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-red-600 dark:text-red-400"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
              Delete Project?
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              This action cannot be undone. The project will be permanently
              removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="btn btn-danger flex-1"
              >
                {isDeleting ? (
                  <>
                    <span className="spinner" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
