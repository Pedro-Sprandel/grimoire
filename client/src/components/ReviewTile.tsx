import { ReviewWithUsername } from "../hooks/useReview";
import ReviewStars from "./ReviewStars";

interface ReviewTileProps {
  review: ReviewWithUsername
}

export const ReviewTile: React.FC<ReviewTileProps> = ({ review }) => {
  return (
    <div
      key={review.createdAt}
      className="p-4 border-t border-gray-400"
    >
      <div className="flex items-center gap-2">
        <p>
          <i>Reviewed by {review.userId.username}</i>
        </p>
        <ReviewStars rating={review.rating} fixed />
      </div>
      <p className="text-gray-800 font-semibold py-4 text-xl">
        {review.title}
      </p>
      <p>{review.comment}</p>
    </div>
  );
};
