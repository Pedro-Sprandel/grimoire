import type { NextFunction, Request, Response } from "express";
import { registerUser } from "./auth.service.ts";

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerUser(req.body.username, req.body.email, req.body.password);
    res.status(201).json({user});
  } catch (error) {
    next(error);
  }
};