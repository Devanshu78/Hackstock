import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useBiddingStore = create((set) => ({
  bidding: [],
  winners: [],
  Notification: {},
  showNotification: false,
  canBid: false,
  setCanBid: (canBid) => set({ canBid }),
  setBidding: (bidding) => set({ bidding }),

  getEvent: async () => {
    try {
      const { data } = await axiosInstance.get("/event");
      set({ Notification: data.data });
      set({ showNotification: true });
      set({ canBid: data.data.isActive });
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
      return;
    }
  },

  getWinner: async () => {
    try {
      const response = await axiosInstance.get(`/getwinner`);
      response?.data.length !== 0 &&
        set((state) => ({ winners: response.data[0].winner }));
      return response.data;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  },
}));
