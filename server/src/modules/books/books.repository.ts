import BookModel from "../../models/BookModel.ts";
import redisClient from "../../redisClient.ts";
import logger from "../../utils/logger.ts";

const CACHE_KEY = "books";

export const getBooks = async () => {
  const cachedBooks = await redisClient.get(CACHE_KEY);

  if (cachedBooks) {
    logger.info("Cache hit for books");
    return JSON.parse(cachedBooks);
  }

  logger.info("Cache miss for books");

  const books = await BookModel.find();

  await redisClient.set(CACHE_KEY, JSON.stringify(books));

  return books;
};