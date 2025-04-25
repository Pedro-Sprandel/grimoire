import BookCard from "../components/BookCard";
import { useBooks } from "../hooks/useBooks";

const Home: React.FC = () => {
  const { books, loading, error } = useBooks();

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
          <BookCard book={book} key={book._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;