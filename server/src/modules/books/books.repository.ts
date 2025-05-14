import createHttpError from "http-errors";
import BookModel from "../../models/BookModel.ts";
import ReviewModel from "../../models/ReviewModel.ts";
import User from "../../models/UserModel.ts";
import { getFromCache, setToCache } from "../../utils/cache.ts";

export const getBooks = async () => {
  const cachedBooks = await getFromCache("books");

  if (cachedBooks) {
    return cachedBooks;
  }

  const books = await BookModel.find();

  setToCache("books", books);

  return books;
};

export const getBookById = async (id: string) => {
  return BookModel.findById(id);
};

export const getUserBooks = (userId: string) => {
  return User.findById(userId).select("books");
};

export const getAllBookReviewsById = async (bookId: string) => {
  return ReviewModel.find({ bookId }).populate("userId", "username");
};

export const getReviewByUserAndBookId = async (
  userId: string,
  bookId: string
) => {
  return ReviewModel.findOne({ userId, bookId }).populate("userId", "username");
};

export const addReview = async (payload: {
  userId: string;
  bookId: string;
  title?: string;
  comment?: string;
  rating: number;
}) => {
  const existingReview = await ReviewModel.findOne({
    bookId: payload.bookId,
    userId: payload.userId
  });

  if (existingReview) {
    throw createHttpError(400, "You have already reviewed this book");
  }

  return ReviewModel.create({
    userId: payload.userId,
    bookId: payload.bookId,
    title: payload.title,
    comment: payload.comment,
    rating: payload.rating
  });
};
