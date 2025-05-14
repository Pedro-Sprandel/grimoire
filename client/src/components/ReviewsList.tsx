import { useState } from "react";
import AddReviewForm from "./AddReviewForm";
import { ReviewWithUsername } from "../hooks/useReview";
import ReviewTile from "./ReviewTile";

interface ReviewsListProps {
  bookId: string;
  currentUserReview: ReviewWithUsername | null;
  reviews: ReviewWithUsername[];
  refetch: () => void;
}

const ReviewsList: React.FC<ReviewsListProps> = ({
  bookId,
  currentUserReview,
  reviews,
  refetch
}) => {
  const [addReviewMode, setAddReviewMode] = useState(false);

  return (
    <div className="bg-gray-300 w-full max-w-4xl rounded-lg">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Reviews ({reviews.length})
        </h2>
        {!currentUserReview && (
          <button
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setAddReviewMode(true)}
          >
            Add Review
          </button>
        )}
      </div>
      {addReviewMode ? (
        <AddReviewForm
          bookId={bookId}
          onCancel={() => setAddReviewMode(false)}
          onSubmit={() => {
            setAddReviewMode(false);
            refetch();
          }}
        />
      ) : (
        <>
          {currentUserReview && (
            <ReviewTile review={currentUserReview} />
          )}
          {reviews
            .filter((review) => review._id !== currentUserReview?._id)
            .map((review) => (
              <ReviewTile key={review.createdAt} review={review} />
            ))}
        </>
      )}
    </div>
  );
};

export default ReviewsList;
