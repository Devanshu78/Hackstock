import { bidQueue } from "./queue.js";

export const registerSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ New socket connected:", socket.id);

    socket.on("bid", async (data) => {
      try {
        await bidQueue.add("place-bid", {
          ...data,
          timestamp: new Date().toISOString(),
        });
        console.log("🎯 Bid enqueued:", data);
      } catch (err) {
        console.error("❌ Error enqueueing bid:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
};
