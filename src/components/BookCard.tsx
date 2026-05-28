import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { incrementItem } from "../services/CartApi";
import { useToast } from "../components/ToastContext";
import RatingStarsDisplay from "../pages/BookDetailPage/RatingStarsDisplay";
import { addToWishlist, removeFromWishlist } from "../services/WishListApi";

type BookCardProps = {
  id: string;
  genre: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  avgRating?: number;
  reviewCount?: number;
  isInWishList?: boolean;
  onWishlistChange?: (bookId: string, isAdded: boolean) => void;
};

export default function BookCard({
  id,
  genre,
  title,
  author,
  price,
  imageUrl,
  avgRating = 0,
  reviewCount = 0,
  isInWishList = false,
  onWishlistChange,
}: BookCardProps) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/books/${id}`);
  };
  const { showToast } = useToast();
  const handleAddToCart = async () => {
    try {
      const response = await incrementItem(id);

      showToast("success", "Item added to cart!");
    } catch (error) {
      console.log(error);
      showToast("error", "Failed to add item to cart.");
    }
  };
  const handleWishlistClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    const nextValue = !isInWishList;

    onWishlistChange?.(id, nextValue);

    const response = isInWishList
      ? await removeFromWishlist(id)
      : await addToWishlist(id);

    if (!response.success) {
      onWishlistChange?.(id, isInWishList);
    }
  };

  return (
    <div
      key={id}
      className="book-card-hover cursor-pointer flex flex-col group"
    >
      <div
        className="group relative aspect-[3/4] bg-surface-container overflow-hidden mb-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
        onClick={handleCardClick}
      >
        <img
          className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700"
          data-alt="Book cover"
          src={imageUrl}
          alt={title}
        />

        <div
          className="
      absolute inset-x-0 bottom-0
      translate-y-full
      group-hover:translate-y-0
      transition-transform duration-300
      p-4
      bg-surface/90 backdrop-blur-sm
    "
        >
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="
              cursor-pointer
          w-11 h-11
          flex items-center justify-center
          rounded-full
          bg-primary
          text-on-primary
          hover:opacity-90
          active:scale-95
          transition-all duration-200
        "
              aria-label="Add to cart"
              title="Add to cart"
              onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                await handleAddToCart();
              }}
            >
              <ShoppingCart size={20} />
            </button>

            <button
              type="button"
              className={`
    cursor-pointer
    w-11 h-11
    flex items-center justify-center
    rounded-full
    active:scale-95
    transition-all duration-200
    ${
      isInWishList
        ? "bg-primary text-on-primary"
        : "bg-surface-container-lowest text-primary border border-outline-variant/40 hover:bg-primary hover:text-on-primary"
    }
  `}
              aria-label={
                isInWishList ? "Remove from wishlist" : "Add to wishlist"
              }
              title={isInWishList ? "Remove from wishlist" : "Add to wishlist"}
              onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                await handleWishlistClick(e);
              }}
            >
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-2 text-primary justify-center">
        <RatingStarsDisplay rating={avgRating} />
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          ({reviewCount})
        </p>
      </div>

      <div className="text-center flex flex-col flex-1">
        <span className="font-label-sm text-label-sm text-tertiary mb-2 block">
          {genre}
        </span>

        <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
          {title}
        </h3>

        <p className="font-body-md text-body-md text-on-surface-variant italic">
          {author}
        </p>

        <p className="font-body-md text-body-md text-primary mt-4">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
