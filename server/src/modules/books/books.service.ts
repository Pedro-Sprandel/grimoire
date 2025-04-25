import createHttpError from "http-errors";
import { getFromCache, setToCache } from "../../utils/cache.ts";
import {
  getAllBookReviewsById,
  getBookById,
  getBooks,
  getReviewByUserAndBookId,
  getUserBooks
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
  if (!review) {
    throw createHttpError(404, "User not found");
  }

  return review;
};

export const getAllBookReviewsByIdService = async (bookId: string) => {
  const books = await getAllBookReviewsById(bookId);

  if (!books) {
    throw createHttpError(404, "Reviews not found");
  }

  return books;
};

export const validateUniqueBookForUser = async (
  userId: string,
  bookId: string
) => {
  const user = await getUserBooks(userId);
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const bookExists = user.books.some(
    (book) => book.bookId.toString() === bookId
  );
  if (bookExists) {
    throw createHttpError(409, "Book ID must be unique for this user");
  }
};
