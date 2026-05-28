import { useEffect, useState } from "react";
import RatingStarsDisplay from "../BookDetailPage/RatingStarsDisplay";
import type { WishlistResponse } from "../../types/response/WishlistResponse";
import { getWishlist, removeFromWishlist } from "../../services/WishListApi";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistResponse[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist();
        if (response.success) {
          setWishlistItems(response.data);
        } else {
          console.error("Failed to fetch wishlist:");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);
  const handleRemoveFromWishlist = (bookId: string) => {
    try {
      removeFromWishlist(bookId);
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.book.id !== bookId),
      );
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };
  const handkeSeeBookDetail = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-page py-section-gap">
      <header className="mb-16 border-b border-outline-variant/30 pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">
            My Wishlist
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            You have {wishlistItems.length} items curated for later.
          </p>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {wishlistItems.length === 0 ? (
          <div className="col-span-full min-h-[400px] flex flex-col items-center justify-center border border-outline-variant/20 rounded text-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">
              shopping_cart
            </span>

            <p className="font-headline-md text-headline-md text-on-surface mb-2">
              Your wishlist is empty
            </p>

            <p className="font-body-md text-body-md text-on-surface-variant">
              Add some books to your wishlist.
            </p>
          </div>
        ) : (
          wishlistItems.map((item) => (
            <article
              key={item.book.id}
              className="group relative flex flex-col bg-surface-container-low rounded-lg p-4 transition-all duration-300 hover:bg-surface-container-high border border-transparent hover:border-outline-variant/20"
            >
              <button
                aria-label="Remove from wishlist"
                className="absolute top-6 right-6 z-10 text-outline hover:text-error transition-colors bg-surface-container-lowest/80 backdrop-blur-sm rounded-full p-2 flex items-center justify-center opacity-0 group-hover:opacity-100"
                onClick={() => handleRemoveFromWishlist(item.book.id)}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  close
                </span>
              </button>

              <div className="aspect-[2/3] w-full mb-6 overflow-hidden rounded shadow-sm relative bg-surface-variant">
                <img
                  alt={item.book.title}
                  className="w-full h-full object-cover object-center mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  src={item.book.coverImageUrl}
                />
              </div>

              <div className="flex-grow flex flex-col items-center text-center">
                <div className="flex items-center gap-1 mb-2 text-primary">
                  <RatingStarsDisplay rating={item.book.avgRating} />
                </div>

                <h2 className="font-headline-md text-headline-md text-on-surface mb-1">
                  {item.book.title}
                </h2>

                <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                  {item.book.author}
                </p>

                <p className="font-body-lg text-body-lg text-on-surface mb-6 mt-auto">
                  ${item.book.price.toFixed(2)}
                </p>

                <button
                  className="w-full py-3 px-6 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded transition-colors hover:bg-inverse-primary border border-transparent"
                  onClick={() => handkeSeeBookDetail(item.book.id)}
                >
                  See details
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
