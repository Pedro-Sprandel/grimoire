import type { NextFunction, Request, Response } from "express";
import { getBooks } from "./books.repository.ts";

export const getBooksController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await getBooks();

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};