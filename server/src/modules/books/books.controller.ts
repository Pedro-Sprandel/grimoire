import type { NextFunction, Request, Response } from "express";
import { getBooksService } from "./books.service.ts";

export const getBooksController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await getBooksService();

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};