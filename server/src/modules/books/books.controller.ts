import type { NextFunction, Request, Response } from "express";
import { getBookById, getBooks } from "./books.repository.ts";
import createHttpError from "http-errors";
import {
  getAllBookReviewsByIdService,
  getUserReview
} from "./books.service.ts";
import { removeUndefinedFields } from "../../utils/format.ts";
import { addReview } from "../books/books.repository.ts";

export const getBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await getBooks();

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const book = await getBookById(id);

    if (!book) {
      return next(createHttpError(404, "Book not found"));
    }

    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const getReviewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = typeof req.query.userId === "string" ? req.query.userId : null;
    const bookId = req.params.bookId;

    let userReview = null;
    let reviews = null;

    if (userId) {
      userReview = await getUserReview(userId, bookId);
    }

    reviews = await getAllBookReviewsByIdService(bookId);

    res.status(200).json({ reviews, userReview });
  } catch (error) {
    next(error);
  }
};

export const getUserReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user;

    if (!userId) {
      return next(createHttpError(401, "Authentication required"));
    }

    const review = await getUserReview(userId, bookId);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

export const addReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const { title = undefined, comment = undefined, rating } = req.body;

    const userId = req.user;
    if (!userId) {
      return next(createHttpError(401, "Authentication required"));
    }
    const newReview = removeUndefinedFields({
      userId,
      bookId,
      title,
      comment,
      rating
    });

    await addReview(newReview);

    res.status(201).json({
      message: "Review added successfully",
      review: newReview
    });
  } catch (error) {
    next(error);
  }
};
