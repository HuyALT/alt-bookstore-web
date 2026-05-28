import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBooksByIds } from "../../services/BookApi";
import type { BookResponse } from "../../types/response/BookResponse";
import Hero from "./Hero";
import Reviews from "./Reviews";
import { getWishlist } from "../../services/WishListApi";

export default function BookDetail() {
  const { id } = useParams();
  const [bookDetail, setBookDetail] = useState<BookResponse | null>(null);
  const [wishlistBookIds, setWishlistBookIds] = useState<Set<string>>(
    new Set(),
  );
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await getBooksByIds(id!);
        if (!response.success) {
          throw new Error("Failed to fetch book details");
        }
        setBookDetail(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    const fetchWishlist = async () => {
      const res = await getWishlist();
      if (res.success) {
        setWishlistBookIds(new Set(res.data.map((item) => item.book.id)));
      }
    };
    fetchBookDetail();
    fetchWishlist();
  }, []);

  return (
    <div className="pt-32 pb-section-gap px-8 lg:px-10">
      <Hero
        id={bookDetail?.id || ""}
        genre={bookDetail?.genre.name || ""}
        title={bookDetail?.title || ""}
        author={bookDetail?.author || ""}
        price={bookDetail?.price || 0}
        imageUrl={bookDetail?.coverImageUrl || ""}
        stockQty={bookDetail?.stockQty || 0}
        description={bookDetail?.description || ""}
        yearPublished={bookDetail?.yearPublished || 0}
        soldCount={bookDetail?.soldCount || 0}
        isInWishlist={wishlistBookIds.has(bookDetail?.id || "")}
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
      <Reviews
        avgRating={bookDetail?.avgRating || 0}
        totalReviews={bookDetail?.reviewCount || 0}
        bookId={id}
      />
    </div>
  );
}
