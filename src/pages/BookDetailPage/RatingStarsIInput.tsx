import { useState } from "react";

type RatingStarsProps = {
  rating: number;
  onChange?: (rating: number) => void;
};

function RatingStarsInput({ rating, onChange }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= rating;

        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            className="cursor-pointer text-primary"
          >
            <span
              className="material-symbols-outlined text-xl my-2.5"
              style={{
                fontVariationSettings: isActive
                  ? "'FILL' 1, 'wght' 400"
                  : "'FILL' 0, 'wght' 400",
              }}
            >
              star
            </span>
          </button>
        );
      })}
    </div>
  );
}
export default RatingStarsInput;
