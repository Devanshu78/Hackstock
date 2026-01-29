import React, { useEffect, useState } from "react";
import useUserService from "../apis/usersApis";
import { useNavigate } from "react-router-dom";

function Project() {
  const { getStudentDetails, getUser } = useUserService();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await getUser();
      setIsLoading(false);
    };
    loadData();
  }, []);

  const projects = getStudentDetails?.projects || [];

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.isVerified === filter;
  });

  const getStatusConfig = (status) => {
    switch (status) {
      case "verified":
        return {
          label: "Verified",
          className: "badge-success",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5"
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
          label: "Pending",
          className: "badge-warning",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5"
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
          className: "badge-error",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          ),
        };
      default:
        return {
          label: "Unknown",
          className: "badge-neutral",
          icon: null,
        };
    }
  };

  const filterOptions = [
    { value: "all", label: "All Projects" },
    { value: "verified", label: "Verified" },
    { value: "unverified", label: "Pending" },
    { value: "rejected", label: "Rejected" },
  ];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 w-40 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-10 w-48 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 dark:bg-slate-700 rounded-2xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fadeInUp">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            My Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {projects.length} project{projects.length !== 1 ? "s" : ""}{" "}
            submitted
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                filter === option.value
                  ? "bg-emerald-600 dark:bg-emerald-500 text-white"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 animate-fadeInUp">
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {filter === "all" ? "No projects yet" : `No ${filter} projects`}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {filter === "all"
              ? "Start by uploading your first project"
              : "Try a different filter to see more projects"}
          </p>
          {filter === "all" && (
            <button
              onClick={() => navigate("/projectupload")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Upload Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const statusConfig = getStatusConfig(project.isVerified);
            return (
              <div
                key={project._id}
                onClick={() => navigate(`/project/${project._id}`)}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fadeInUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Project Image Preview */}
                {project.projectImage?.[0]?.imageUrl && (
                  <div className="relative -mx-6 -mt-6 mb-4 aspect-video overflow-hidden rounded-t-[15px]">
                    <img
                      src={project.projectImage[0].imageUrl}
                      alt={project.projectName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div
                  className={!project.projectImage?.[0]?.imageUrl ? "pt-0" : ""}
                >
                  {!project.projectImage?.[0]?.imageUrl && (
                    <span
                      className={`inline-flex items-center gap-1 mb-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                        project.isVerified === "verified"
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                          : project.isVerified === "unverified"
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {statusConfig.icon}
                      {statusConfig.label}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {project.projectName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {project.projectDescription}
                  </p>

                  {/* Components Tags */}
                  {project.projectComponents?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.projectComponents.slice(0, 3).map((comp, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-md"
                        >
                          {comp.componentName}
                        </span>
                      ))}
                      {project.projectComponents.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 rounded-md">
                          +{project.projectComponents.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/projectupload")}
        className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300"
        >
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>
    </div>
  );
}

export default Project;
