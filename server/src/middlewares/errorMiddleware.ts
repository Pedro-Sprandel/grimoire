import type { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import logger from "../utils/logger.ts";

export const handleError = (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err.message);
  logger.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
};
