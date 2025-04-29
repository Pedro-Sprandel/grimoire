import React, { useState } from "react";
import fullStar from "../icons/full_star.svg";
import emptyStar from "../icons/empty_star.svg";

interface ReviewStarsProps {
  rating?: number;
  onRatingChange?: (newRating: number) => void;
  fixed?: boolean;
}

const MAX_RATING = 5;

const ReviewStars: React.FC<ReviewStarsProps> = ({ rating = 0, onRatingChange, fixed = false }) => {
  const [hoveringRating, setHoveringRating] = useState<number>(rating);
  const [selectedRating, setSelectedRating] = useState<number>(rating);

  const changeRating = (newRating: number) => {
    setSelectedRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  if (fixed) {
    return (
      <div className="flex h-8 items-center justify-left overflow-hidden">
        {[...Array(MAX_RATING)].map((_, index) => (
          <img
            key={index}
            src={index < rating ? fullStar : emptyStar}
            alt="star"
            className="h-full object-contain"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-8 items-center justify-left overflow-hidden">
      {[...Array(MAX_RATING)].map((_, index) => (
        <img
          key={index}
          src={index < hoveringRating ? fullStar : emptyStar}
          alt="star"
          className="h-full object-contain cursor-pointer"
          onMouseEnter={() => setHoveringRating(index + 1)}
          onMouseLeave={() => setHoveringRating(selectedRating)}
          onClick={() => changeRating(index + 1)}
        />
      ))}
    </div>
  );
};

export default ReviewStars;