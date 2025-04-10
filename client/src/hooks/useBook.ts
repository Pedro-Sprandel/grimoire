import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { fetchBookById } from "../services/bookService.ts";
import { showNotification } from "../utils/showNotification";

export const useBook = (id: string | undefined) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!id) {
          throw new Error("Book ID is invalid");
        }
        const bookData = await fetchBookById(id);
        setBook(bookData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          showNotification(err.message, "error");
        } else {
          setError("An unexpected error occurred");
          showNotification("An unexpected error occurred", "error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return { book, loading, error };
};