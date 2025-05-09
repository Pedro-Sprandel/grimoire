import axiosInstance from "../axiosInstance";
import { Book } from "../types/Book";

export const fetchBookById = async (id: string): Promise<Book> => {
  const response = await axiosInstance.get(`/books/${id}`);
  return response.data;
};