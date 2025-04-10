import { createClient } from "redis";
import logger from "./utils/logger.ts";

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
  logger.error("Redis Client Error", err);
  throw new Error("Redis Client Error");
});

redisClient.on("connect", () => {
  logger.info("Redis Client Connected");
});

(async () => {
  await redisClient.connect();
})();

export default redisClient;