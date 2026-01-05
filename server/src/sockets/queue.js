import redisConnection from "../utils/redisConnection.js";
import { Queue } from "bullmq";

export const bidQueue = new Queue("queue", {
  connection: redisConnection,
  removeOnComplete: true,
  removeOnFail: true,
});
