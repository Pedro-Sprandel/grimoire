import { useNavigate, useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import { useImageLoader } from "../hooks/useImageLoader";
import ReviewsList from "../components/ReviewsList";
import { useReviews } from "../hooks/useReview";
import ReviewStars from "../components/ReviewStars";

const BookPage: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const { book, loading, error } = useBook(id);
  const { currentUserReview, reviews, averageRating, refetch } = useReviews(book?._id);
  const { imageSrc } = useImageLoader(book?.coverImageUrl || "");
  const navigate = useNavigate();

  if (loading) {
    return <div className="min-h-screen bg-gray-700 text-white flex justify-center items-center h-screen">Loading...</div>;
  };

  if (error) {
    navigate("/404");
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Book not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gap-12 bg-gray-700 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-gray-300 shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={imageSrc || book.coverImageUrl}
              alt={book.title}
              className="w-64 h-64 object-contain rounded-md shadow"
            />
          </div>

          <div className="flex flex-col justify-between">
            <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
            <ReviewStars rating={averageRating ?? 0} total={reviews.length} fixed />
            <p className="text-lg text-gray-600 mt-2">
              <span className="font-semibold">Authors:</span> {book.authors.join(", ")}
            </p>
            <p className="text-gray-700 mt-4">{book.description}</p>
          </div>
        </div>
      </div>
      <ReviewsList currentUserReview={currentUserReview} reviews={reviews} bookId={id} refetch={refetch} />
    </div>
  );
};

export default BookPage;
