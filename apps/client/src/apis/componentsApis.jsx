import { create } from "zustand";
import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";

const useComponentService = create((set) => ({
  getComponentData: [],
  getComponent: async () => {
    try {
      const response = await axiosInstance.get("/component");
      set({ getComponentData: response?.data?.data });
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

export default useComponentService;
