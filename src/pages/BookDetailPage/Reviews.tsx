import { useEffect, useState } from "react";
import type { ReviewResponse } from "../../types/response/ReviewResponse";
import { getReviewBookIds } from "../../services/ReviewApi";
import RatingStarsDisplay from "./RatingStarsDisplay";
import RatingStarsInput from "./RatingStarsIInput";
type ReviewsProps = {
  avgRating: number;
  totalReviews: number;
  bookId?: string;
};

export default function Reviews({
  avgRating,
  totalReviews,
  bookId,
}: ReviewsProps) {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [star, starRating] = useState(5);

  const REVIEWS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;

  const visibleReviews = reviews.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewBookIds(
          bookId!,
          currentPage - 1,
          REVIEWS_PER_PAGE,
        );
        if (!response.success) {
          throw new Error("Failed to fetch reviews");
        }
        setReviews(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [currentPage]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <section className="mt-section-gap border-t border-outline-variant/30 pt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          Reader Reflections
        </h2>
        <div className="flex items-center gap-4">
          <RatingStarsDisplay rating={avgRating} />
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {avgRating.toFixed(1)} / 5.0 ({totalReviews} REVIEWS)
          </span>
        </div>
      </div>
      <div className="mb-16 bg-surface-container-low p-8 border border-outline-variant/30">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-6">
          Write a Review
        </h3>
        <form className="space-y-6">
          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2">
              YOUR RATING
            </label>
            <RatingStarsInput rating={star} onChange={starRating} />{" "}
            <p>({star} / 5)</p>
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2 uppercase">
                Review Title
              </label>
              <input
                className="w-full bg-surface border border-outline-variant/50 focus:border-primary focus:ring-0 p-4 font-body-md text-body-md"
                placeholder="Summarize your experience..."
                type="text"
              />
            </div>
          </div>
          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2 uppercase">
              Your Review
            </label>
            <textarea
              className="w-full bg-surface border border-outline-variant/50 focus:border-primary focus:ring-0 p-4 font-body-md text-body-md"
              placeholder="Share your thoughts on 'The Silent Archive'..."
              rows={4}
            ></textarea>
          </div>
          <button
            className="bg-primary text-on-primary font-label-sm text-label-sm px-10 py-4 uppercase tracking-[0.2em] hover:bg-primary/90 transition-all"
            type="submit"
          >
            Submit Review
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-4 border-b border-outline-variant/20 pb-8"
          >
            <RatingStarsDisplay rating={review.rating} />
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-label-sm text-on-surface font-bold">
                {review.user.name}
              </span>
              <div className="flex items-center gap-3">
                {review.isVerifiedPurchase ? (
                  <span className="flex items-center gap-1 font-label-sm text-[10px] text-on-primary-container bg-primary-container/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <span
                      className="material-symbols-outlined text-[12px]"
                      style={{ fontVariationSettings: "'wght' 700" }}
                    >
                      check
                    </span>
                    Verified Purchase
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-label-sm text-[10px] text-on-secondary-fixed-variant bg-surface-variant px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[12px]">
                      info
                    </span>
                    Community Review
                  </span>
                )}

                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
            <h4 className="font-headline-md text-[18px] text-on-surface mb-1">
              {review.title}
            </h4>
            <p className="font-body-md text-body-md italic text-on-surface-variant leading-relaxed">
              "{review.body}"
            </p>
            <div className="mt-auto flex items-center gap-2">
              <button className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">
                  thumb_up
                </span>
                Helpful ({review.helpfulCount})
              </button>
              <button className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">
                  thumb_down
                </span>
                Not Helpful ({review.notHelpfulCount})
              </button>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-outline text-on-surface-variant disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-all"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = currentPage === page;

            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border transition-all ${
                  isActive
                    ? "bg-primary text-on-primary border-primary"
                    : "border-outline text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-outline text-on-surface-variant disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-all"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
