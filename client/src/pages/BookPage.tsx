import { useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { book, loading, error } = useBook(id);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  };

  if (error) {
    return <div className="flex justify-center items-center h-screen">
      <p className="text-red-500">{error}</p>
    </div>;
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Book not found</p>
      </div>
    );
  }

  return (
    <>
      <p>{book.title}</p>
    </>
  );
};

export default BookPage;