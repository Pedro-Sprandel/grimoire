import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import axiosInstance from "../axiosInstance";
import BookCard from "../components/BookCard";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:3000/api/books");
        setBooks(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-700 p-24">
      <div className="flex flex-wrap justify-center gap-4">
        {books.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;