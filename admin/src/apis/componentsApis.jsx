import { create } from "zustand";
import axiosInstance from "./axiosInstance";
import { toast } from "react-hot-toast";

const useComponentsService = create((set) => ({
  components: [],
  addComponent: async (component) => {
    try {
      const response = await axiosInstance.post("/component", component);
      set((state) => ({ components: [...state.components, response?.data] }));
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },
  getComponents: async () => {
    const response = await axiosInstance.get("/component");
    set({ components: response.data });
    return response.data.data;
  },
  deleteComponent: async (id, imageId) => {
    const response = await axiosInstance.delete(
      `/component/${id}/?imageId=${imageId}`
    );
    toast.success(response.data.message);
    return response.data;
  },
  updateComponent: async (id, component) => {
    const response = await axiosInstance.put(`/component/${id}`, component);
    toast.success(response.data.message);
    return response.data;
  },
}));

export default useComponentsService;
