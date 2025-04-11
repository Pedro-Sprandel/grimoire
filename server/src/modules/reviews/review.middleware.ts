import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import { validateUniqueBookForUser } from "./review.service.ts";
import logger from "../../utils/logger.ts";

const VALID_RATINGS = new Set([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);

export const validateAddReviewBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body?.bookId || !req.body?.rating) {
    return next(createHttpError(400, "Missing required fields"));
  }

  const {
    userId,
    bookId,
    title = undefined,
    comment = undefined,
    rating
  } = req.body;

  if (!isValidObjectId(userId)) {
    return next(createHttpError(400, "Invalid user ID format"));
  }

  if (!isValidObjectId(bookId)) {
    return next(createHttpError(400, "Invalid book ID format"));
  }

  try {
    await validateUniqueBookForUser(userId, bookId);
  } catch (error) {
    logger.error("Error checking book Id uniqueness: ", error);
    return next(error);
  }

  if (!VALID_RATINGS.has(rating)) {
    return next(
      createHttpError(400, "Review must be a number between 0.5 and 5")
    );
  }

  if (title !== undefined && (title.length < 1 || title.length > 48)) {
    return next(
      createHttpError(400, "Review title must be between 1 and 48 characters")
    );
  }

  if (comment !== undefined && (comment.length < 1 || comment.length > 1000)) {
    return next(
      createHttpError(400, "Comment must be between 1 and 1000 characters")
    );
  }

  next();
};
