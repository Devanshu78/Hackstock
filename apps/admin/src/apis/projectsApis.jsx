import { create } from "zustand";
import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";

const useProjectService = create((set) => ({
  getProjectData: {},

  getProjects: async (id) => {
    try {
      const response = await axiosInstance.get(`/getprojects/${id}`);
      set({ getProjectData: response?.data?.data });
      return response.data;
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
      return;
    }
  },
  updateProject: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/getprojects/${id}`, data);
      set({ getProjectData: response?.data?.data });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
      return;
    }
  },
}));

export default useProjectService;
