import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email().min(5),
  username: z.string().min(3),
  password: z.string().min(6)
});

export const validateRegisterBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      next(createHttpError(400, err.errors[0].message));
    } else {
      next(createHttpError(500, "Internal server error"));
    }
  }
};