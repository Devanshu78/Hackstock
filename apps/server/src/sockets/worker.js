// worker.js
import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,

  maxRetriesPerRequest: null,
});
import { processBid } from "../Controllers/admin/biddingController.js";

const worker = new Worker(
  "queue",
  async (job) => {
    const bidData = job.data;
    console.log("🛠️ Processing bid:", bidData);
    await processBid(bidData);
  },
  {
    connection,
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
