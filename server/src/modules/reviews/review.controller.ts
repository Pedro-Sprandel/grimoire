import type { NextFunction, Request, Response } from "express";
import { addReview } from "./review.repository.ts";
import { removeUndefinedFields } from "../../utils/format.ts";
import { getUserReview } from "./review.service.ts";
import createHttpError from "http-errors";

export const addReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId, title = undefined, comment = undefined, rating } = req.body;

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

export const getUserReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
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
