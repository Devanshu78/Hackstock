import IORedis from "ioredis";
import { Queue } from "bullmq";

const connection = new IORedis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  maxRetriesPerRequest: null,
});

export const bidQueue = new Queue("queue", {
  connection,
  removeOnComplete: true,
});
