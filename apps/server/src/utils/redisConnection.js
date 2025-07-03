import IORedis from "ioredis";

const redisConnection = new IORedis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  maxRetriesPerRequest: null,
});

export function generateRedisKey(prefix, id, options = {}) {
  let key = `${prefix}:${id}`;
  if (options && Object.keys(options).length > 0) {
    const extra = Object.entries(options)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
    key += `?${extra}`;
  }
  return key;
}

export default redisConnection;
