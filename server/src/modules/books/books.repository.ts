import BookModel from "../../models/BookModel.ts";
import redisClient from "../../redisClient.ts";
import logger from "../../utils/logger.ts";

const CACHE_KEY = "books";

export const getBooks = async () => {
  const cachedBooks = await redisClient.get(CACHE_KEY);

  if (cachedBooks) {
    return JSON.parse(cachedBooks);
  }

  const books = await BookModel.find();

  redisClient
    .set(CACHE_KEY, JSON.stringify(books), { EX: 3600 })
    .catch((error) => {
      logger.error("Error setting cache for get books:", error);
    });

  return books;
};

export const getBookById = async (id: string) => {
  const cacheKey = `book:${id}`;
  const cachedBook = await redisClient.get(cacheKey);

  if (cachedBook) {
    logger.info("Cache hit for book:", id);
    return JSON.parse(cachedBook);
  }

  const cachedBooks = await redisClient.get(CACHE_KEY);

  if (cachedBooks) {
    logger.info("Cache hit for all books");
    const books = JSON.parse(cachedBooks);
    const book = books.find((book: { id: string }) => book.id === id);

    if (book) {
      redisClient.set(cacheKey, JSON.stringify(book)).catch((error) => {
        logger.error("Error setting cache for get book by ID:", error);
      });

      return book;
    }
  }

  const book = await BookModel.findById(id);
  if (!book) {
    throw new Error("Book not found");
  }
  redisClient.set(cacheKey, JSON.stringify(book));

  return book;
};
