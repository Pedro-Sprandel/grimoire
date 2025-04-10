import { useEffect, useState } from "react";
import { Book } from "../types/Book";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/books");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBooks(data);
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
          <div key={book._id} className="w-[256px] bg-stone-100 rounded flex flex-col items-center">
            <img src={book.coverImageUrl} alt={book.title} className="w-[256px] h-[256px] object-contain" />
            <div className="p-2 flex flex-col items-start w-full">
              <h2 className="font-bold w-full truncate">{book.title}</h2>
              <p className="">{book.authors[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;