import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import { create } from "zustand";

export const useResultsService = create((set) => ({
  results: [],
  getResults: async () => {
    const response = await axiosInstance.get("/result");
    set({ results: response.data });
    return response.data;
  },
  addResult: async (result) => {
    try {
      const response = await axiosInstance.post("/result", result);
      set((state) => ({ results: [...state.results, response.data] }));
      response?.status === 201 && toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return;
    }
  },
  updateResult: async (id, result) => {
    const response = await axiosInstance.put(`/result/${id}`, result);
    set((state) => ({
      results: state.results.map((r) => (r.id === id ? response.data : r)),
    }));
    toast.success(response.data.message);
    return response.data;
  },
  deleteResult: async (id) => {
    const response = await axiosInstance.delete(`/result/${id}`);
    toast.success(response.data.message);
    set((state) => ({
      results: state.results.filter((r) => r.id !== id),
    }));
  },
}));
