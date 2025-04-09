import BookModel from "../../models/BookModel.ts";

export const getBooksService = async () => await BookModel.find();