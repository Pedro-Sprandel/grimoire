import type { NextFunction, Request, Response } from "express";
import { getBookById, getBooks } from "./books.repository.ts";
import createHttpError from "http-errors";

export const getBooksController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await getBooks();

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;
    const book = await getBookById(bookId);

    if (!book) {
      next(createHttpError(404, "Book not found"));
    }

    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};