import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const validateMongoIdFromParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id = null } = req.params;

  if (isValidObjectId(id)) {
    return next();
  }

  next(createHttpError(400, `Invalid MongoDB Id: ${id}`));
};
