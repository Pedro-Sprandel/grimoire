import type { NextFunction, Request, Response } from "express";
import { addReviewToUser } from "./review.repository.ts";
import { removeUndefinedFields } from "../../utils/format.ts";

export const addReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userId,
      bookId,
      title = undefined,
      comment = undefined,
      rating
    } = req.body;

    const newReview = removeUndefinedFields({
      bookId,
      title,
      comment,
      rating
    });

    await addReviewToUser(userId, newReview);

    res.status(201).json({
      message: "Review added successfully",
      review: newReview
    });
  } catch (error) {
    next(error);
  }
};
