import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";

const useProjectService = create((set) => ({
  getProjectData: {},
  getProject: async (id) => {
    try {
      const response = await axiosInstance.get(`/getproject/${id}`);
      set({ getProjectData: response?.data?.data });
      return response;
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
        return err.response;
      }
    }
    return;
  },
  addProject: async (formData) => {
    try {
      const response = await axiosInstance.post("/addproject", formData);
      return response;
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
        return err.response;
      }
    }
    return;
  },

  updateProject: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/updateproject/${id}`, data);
      toast.success(response.data.message);
      return response;
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
        return err.response;
      }
    }
  },
  deleteProject: async (id) => {
    try {
      const response = await axiosInstance.delete(`/deleteproject/${id}`);
      toast.success(response.data.message);
      return response;
    } catch (err) {
      console.error(err.message);
      if (err.response) {
        toast.error(err.response.data.message);
        return err.response;
      }
      return err.message;
    }
  },
}));

export default useProjectService;
