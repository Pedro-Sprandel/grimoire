import redisClient from "../redisClient.ts";
import logger from "./logger.ts";

export const getFromCache = async (key: string) => {
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  } catch (error) {
    logger.warn(`Error getting data from cache for key "${key}":`, error);
    return null;
  }
};

export const setToCache = async (
  key: string,
  data: unknown,
  ttl: number = 3600
): Promise<void> => {
  try {
    await redisClient.set(key, JSON.stringify(data), { EX: ttl });
  } catch (error) {
    logger.error(`Error setting data to cache for key "${key}":`, error);
  }
};
