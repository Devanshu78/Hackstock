import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import axios from "axios";
const server = import.meta.env.VITE_SERVER_URL;

const useUserService = create((set) => ({
  getStudentDetails: {},
  flameCoin: 0,
  valid: false,
  setFlameCoin: (num) => {
    set({ flameCoin: num });
  },
  registerStudent: async (details) => {
    let result;
    try {
      const response = await axios.post(`${server}/registerUser`, details);
      set({ getStudentDetails: response?.data?.data });
      result = response;
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
        return err.response;
      }
    }
    return result;
  },
  loginStudent: async (details) => {
    try {
      const response = await axiosInstance.post(`/loginuser`, details);
      return response;
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
        return err.response;
      }
    }
  },
  logoutStudent: async () => {
    try {
      const response = await axiosInstance.post(`/logoutuser`);
      return response;
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        return error.response;
      }
    }
    return;
  },

  getUser: async () => {
    try {
      const response = await axiosInstance.get(`/getuser`);
      set({ getStudentDetails: response?.data?.data });
      set({ flameCoin: response?.data?.data?.firePoints });
      return response;
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
        return err.response;
      }
    }
    return;
  },

  isAuthenticated: async () => {
    try {
      const response = await axiosInstance.get(`/isAuthenticated`);
      set({ valid: response?.data?.loggedIn });
      return response;
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
        return err.response;
      }
    }
    return;
  },
}));

export default useUserService;
