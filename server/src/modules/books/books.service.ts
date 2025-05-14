import createHttpError from "http-errors";
import { getFromCache, setToCache } from "../../utils/cache.ts";
import {
  getAllBookReviewsById,
  getBookById,
  getBooks,
  getReviewByUserAndBookId
} from "./books.repository.ts";

export const getBooksService = async () => {
  const BOOKS_CACHE_KEY = "books";
  const cachedBooks = await getFromCache(BOOKS_CACHE_KEY);

  if (cachedBooks) {
    return cachedBooks;
  }

  const books = await getBooks();

  if (books) {
    setToCache("books", books);
    return books;
  }

  return null;
};

export const getBookByIdService = async (id: string) => {
  const BOOKS_CACHE_KEY = "books";
  const BOOK_CACHE_KEY = `book:${id}`;

  const cachedBook = await getFromCache(BOOK_CACHE_KEY);

  if (cachedBook) {
    return cachedBook;
  }

  const cachedBooks = await getFromCache(BOOKS_CACHE_KEY);

  if (cachedBooks) {
    const book = cachedBooks.find((book: { id: string }) => book.id === id);

    if (book) {
      setToCache(BOOK_CACHE_KEY, book);

      return book;
    }
  }

  const book = await getBookById(id);

  if (book) {
    setToCache(BOOK_CACHE_KEY, book);
    return book;
  }

  return null;
};

export const getUserReview = async (userId: string, bookId: string) => {
  const review = await getReviewByUserAndBookId(userId, bookId);

  return review || null;
};

export const getAllBookReviewsByIdService = async (bookId: string) => {
  const reviews = await getAllBookReviewsById(bookId);

  if (!reviews) {
    throw createHttpError(404, "Reviews not found");
  }

  return reviews;
};
