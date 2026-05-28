type RatingStarsProps = {
  rating: number;
  max?: number;
};

export default function RatingStarsDisplay({
  rating,
  max = 5,
}: RatingStarsProps) {
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;

        let icon = "star";

        if (roundedRating >= starValue) {
          icon = "star";
        } else if (roundedRating >= starValue - 0.5) {
          icon = "star_half";
        } else {
          icon = "star";
        }

        const isFilled = roundedRating >= starValue;
        const isHalf =
          roundedRating >= starValue - 0.5 && roundedRating < starValue;

        return (
          <span
            key={index}
            className="material-symbols-outlined text-xl text-primary my-2.5"
            style={{
              fontVariationSettings:
                isFilled || isHalf ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
}
