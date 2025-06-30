import { create } from "zustand";
import axiosInstance from "./axiosInstance";
import { toast } from "react-hot-toast";
const useBiddingApis = create((set) => ({
  bids: [],
  events: [],
  winners: [],

  scheduleEvent: async (event) => {
    try {
      const response = await axiosInstance.post(`/event`, event);
      set((state) => ({ events: [...state.events, response.data.data] }));
      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      return error.response;
    }
  },

  getEvents: async () => {
    try {
      const response = await axiosInstance.get(`/event`);
      set((state) => ({ events: response.data.data }));
      return response.data.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },

  deleteEvent: async (id) => {
    try {
      const response = await axiosInstance.delete(`/event/${id}`);
      set((state) => ({ events: state.events.filter((e) => e._id !== id) }));
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      return error.message;
    }
  },

  getWinner: async () => {
    try {
      const response = await axiosInstance.get(`/getwinner`);
      console.log(response.data);
      response?.data.length !== 0 &&
        set((state) => ({ winners: response?.data[0]?.winner }));
      return response.data;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  },

  evalResult: async () => {
    try {
      const response = await axiosInstance.get(`/evalresult`);
      set((state) => ({ winners: response.data?.data }));
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      return error.message;
    }
  },

  updateWinnerStatus: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/updatewinner/${id}`, data);
      toast.success(response.data.message);
      set((state) => ({
        winners: state.winners.map((winner) =>
          winner._id === id ? { ...winner, ...response.data?.data } : winner
        ),
      }));
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      return error.message;
    }
  },
}));

export default useBiddingApis;
