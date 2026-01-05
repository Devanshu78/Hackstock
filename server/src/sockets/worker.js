// worker.js
import { Worker } from "bullmq";
import redisConnection from "../utils/redisConnection.js";
import { processBid } from "../Controllers/admin/biddingController.js";

const worker = new Worker(
  "queue",
  async (job) => {
    const bidData = job.data;
    console.log("🛠️ Processing bid:", bidData);
    await processBid(bidData);
  },
  {
    connection: redisConnection,
    removeOnComplete: true,
    removeOnFail: true,
  }
);

worker.on("ready", () => {
  console.log("✅ Worker is connected to Redis and ready!");
});

worker.on("completed", (job) => {
  console.log(`✅ Bid processed successfully for job ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed: ${err.message}`);
});
