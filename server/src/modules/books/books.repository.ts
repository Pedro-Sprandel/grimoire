import BookModel from "../../models/BookModel.ts";
import { getFromCache, setToCache } from "../../utils/cache.ts";

export const getBooks = async () => {
  const cachedBooks = await getFromCache("books");

  if (cachedBooks) {
    return cachedBooks;
  }

  const books = await BookModel.find();

  setToCache("books", books);

  return books;
};

export const getBookById = async (id: string) => {
  return BookModel.findById(id);
};
