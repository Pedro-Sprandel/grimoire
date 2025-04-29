import { useState } from "react";
import { useReviews } from "../hooks/useReview";
import ReviewStars from "./ReviewStars";
import AddReviewForm from "./AddReviewForm";

interface ReviewsListProps {
  bookId: string;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ bookId }) => {
  const [addReviewMode, setAddReviewMode] = useState(false);
  const { reviews, refetch } = useReviews(bookId);

  return (
    <div className="bg-gray-300 w-full max-w-4xl rounded-lg">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold text-gray-800">Reviews ({reviews.length})</h2>
        <button
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setAddReviewMode(true)}
        >
          Add Review
        </button>
      </div>
      {addReviewMode
        ? <AddReviewForm
          bookId={bookId}
          onCancel={() => setAddReviewMode(false)}
          onSubmit={() => {
            setAddReviewMode(false);
            refetch();
          }}
        />
        : reviews.map((review) => (
          <div key={review.createdAt} className="p-4 border-t border-gray-400">
            <div className="flex items-center gap-2">
              <p><i>Reviewed by {review.userId.username}</i></p>
              <ReviewStars rating={review.rating} fixed />
            </div>
            <p className="text-gray-800 font-semibold py-4 text-xl">{review.title}</p>
            <p>{review.comment}</p>
          </div>
        ))}
    </div>
  );
};

export default ReviewsList;