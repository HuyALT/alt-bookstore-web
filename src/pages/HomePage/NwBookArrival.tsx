import BookCard from "../../components/BookCard";
import { useEffect, useState } from "react";
import type { BookResponse } from "../../types/response/BookResponse";
import { getNewArrivals } from "../../services/BookApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getWishlist } from "../../services/WishListApi";
export default function NwBookArrival() {
  const [bookArrivals, setBookArrivals] = useState<BookResponse[]>([]);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      const res = await getNewArrivals(0, 9);
      setBookArrivals(res);
    };
    const fetchWishlist = async () => {
      const res = await getWishlist();
      if (res.success) {
        setWishlistBookIds(new Set(res.data.map((item) => item.book.id)));
      }
    };
    fetchNewArrivals();
    fetchWishlist();
  }, []);
  const [wishlistBookIds, setWishlistBookIds] = useState<Set<string>>(
    new Set(),
  );
  const [startIndex, setStartIndex] = useState(0);
  const ITEMS_PER_PAGE = 3;
  const nextSlide = () => {
    const nextIndex = startIndex + ITEMS_PER_PAGE;

    if (nextIndex >= bookArrivals.length) {
      setStartIndex(startIndex);
      return;
    }

    setStartIndex(nextIndex);
  };

  const prevSlide = () => {
    if (startIndex - ITEMS_PER_PAGE >= 0) {
      setStartIndex(startIndex - ITEMS_PER_PAGE);
    }
  };
  return (
    <section className="py-section-gap bg-surface-container-lowest">
      <div className="max-w-[1280px] mx-auto px-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-bold">New Arrival</h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className="
            w-12 h-12 
            flex items-center justify-center
            rounded-full border border-outline-variant
            bg-surface-container-low
            hover:bg-surface-container-highest
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all duration-300
          "
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={nextSlide}
              disabled={
                startIndex + ITEMS_PER_PAGE >= (bookArrivals?.length ?? 0)
              }
              className="
            w-12 h-12 
            flex items-center justify-center
            rounded-full border border-outline-variant
            bg-surface-container-low
            hover:bg-surface-container-highest
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all duration-300
          "
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="
          flex
          gap-5
          transition-transform
          duration-700
          ease-in-out
        "
            style={{
              transform: `translateX(-${startIndex * (100 / ITEMS_PER_PAGE)}%)`,
            }}
          >
            {bookArrivals.map((book) => (
              <div
                key={book.id}
                className="
              flex-[0_0_calc((100%-2rem)/3)]
              bg-surface-container-lowest
              border border-outline-variant
              rounded-2xl
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-1
              transition-all duration-300
              p-5
            "
              >
                <BookCard
                  id={book.id}
                  genre={book.genre.name}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  imageUrl={book.coverImageUrl}
                  avgRating={book.avgRating}
                  reviewCount={book.reviewCount}
                  isInWishList={wishlistBookIds.has(book.id)}
                  onWishlistChange={(bookId, isAdded) => {
                    setWishlistBookIds((prev) => {
                      const newSet = new Set(prev);
                      if (isAdded) {
                        newSet.add(bookId);
                      } else {
                        newSet.delete(bookId);
                      }
                      return newSet;
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
