import { create } from "zustand";
import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";

const useUserService = create((set) => ({
  getTeacherDetails: {},
  getProjectData: {},
  valid: false,
  loginUser: async (data) => {
    try {
      const response = await axiosInstance.post("/login", data);
      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  registerUser: async (data) => {
    try {
      const response = await axiosInstance.post("/register", data);
      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  getUser: async () => {
    try {
      const response = await axiosInstance.get("/student");
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateUser: async (data) => {
    try {
      const response = await axiosInstance.put("/student", data);
      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  logoutUser: async () => {
    try {
      const response = await axiosInstance.get("/logout");
      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  isAuthenticated: async () => {
    try {
      const response = await axiosInstance.get("/isverified");
      set({ valid: response?.data?.loggedIn });
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
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
      return response.data;
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
      return;
    }
  },
  getData: async () => {
    try {
      const response = await axiosInstance.get("/userdata");
      set({ getTeacherDetails: response?.data?.data });
      return response.data;
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
      return;
    }
  },
}));

export default useUserService;
