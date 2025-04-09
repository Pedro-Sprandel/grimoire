import BookModel from "../../models/BookModel.ts";

export const getBooks = async () => await BookModel.find();