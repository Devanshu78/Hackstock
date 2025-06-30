import { io } from "socket.io-client";

const server = import.meta.env.VITE_BASE_URL;

export const socketInstance = io(`${server}`, {
  transports: ["websocket"],
  withCredentials: true,
});
