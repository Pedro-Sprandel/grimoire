import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(createHttpError(401, "Authentication required"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.NotBeforeError
    ) {
      return next(createHttpError(401, "Authentication required"));
    }

    next(error);
  }
};
