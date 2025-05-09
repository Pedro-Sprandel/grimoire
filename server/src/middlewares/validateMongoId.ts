import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const validateMongoIdFromParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Object.values(req.params).forEach((id) => {
    if (!isValidObjectId(id)) {
      return next(createHttpError(400, `Invalid MongoDB Id: ${id}`));
    }
  });

  next();
};
