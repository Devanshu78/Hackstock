import { io } from "socket.io-client";

// Extract base URL (e.g., http://x.x.x.x:8000) from the full API URL if needed
const getBaseUrl = () => {
  if (import.meta.env.VITE_SOCKET_URL) return import.meta.env.VITE_SOCKET_URL;
  if (import.meta.env.VITE_SERVER_URL) {
    try {
      const url = new URL(import.meta.env.VITE_SERVER_URL);
      return url.origin; // Returns http://35.154.253.118:8000
    } catch (e) {
      return "http://localhost:8000";
    }
  }
  return "http://localhost:8000";
};

const server = getBaseUrl();

export const socketInstance = io(`${server}`, {
  transports: ["websocket", "polling"], // Fallback to polling if websocket fails
  withCredentials: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});
