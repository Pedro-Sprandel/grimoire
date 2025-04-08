import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.ts";
import createHttpError from "http-errors";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    next(createHttpError(401, "Authentication required"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("JWT verification failed:", error);
    next(createHttpError(403, "Invalid or expired token"));
  }
};