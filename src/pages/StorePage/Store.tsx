import { useEffect, useState } from "react";
import NavbarFilter from "./NavbarFilter";
import SortSelect from "./SortSelect";
import type { SortOption } from "../../types/util/sort";
import type { BookResponse } from "../../types/response/BookResponse";
import BookCard from "../../components/BookCard";
import { getBooks, searchBooks } from "../../services/BookApi";
import { useSearchParams } from "react-router-dom";
import { getWishlist } from "../../services/WishListApi";

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const isSearching = keyword.trim().length > 0;

  const [sort, setSort] = useState<SortOption>("newest");
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [wishlistBookIds, setWishlistBookIds] = useState<Set<string>>(
    new Set(),
  );
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = isSearching
          ? await searchBooks({
              keyword,
              page,
              size,
            })
          : await getBooks({
              page,
              size,
              genreId: selectedGenreId,
              sort,
            });

        setBooks(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.log(error);
        setBooks([]);
        setTotalPages(0);
      }
    };
    const fetchWishlist = async () => {
      const res = await getWishlist();
      if (res.success) {
        setWishlistBookIds(new Set(res.data.map((item) => item.book.id)));
      }
    };

    fetchBooks();
    fetchWishlist();
  }, [page, size, selectedGenreId, sort]);
  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenreId(genreId);
    setPage(0);

    if (keyword) {
      searchParams.delete("keyword");
      setSearchParams(searchParams);
    }
  };

  const handleSortChange = (value: SortOption) => {
    setSort(value);
    setPage(0);
  };

  const handleClearSearch = () => {
    searchParams.delete("keyword");
    setSearchParams(searchParams);
    setPage(0);
  };

  return (
    <section className="py-section-gap bg-surface">
      <div className="max-w-[1280px] mx-auto px-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Books</h1>

            {isSearching && (
              <p className="text-on-surface-variant mt-2">
                Search result for:{" "}
                <span className="text-primary font-semibold">{keyword}</span>
              </p>
            )}
          </div>

          <SortSelect value={sort} onChange={handleSortChange} />
        </div>

        <div className="flex gap-12">
          <NavbarFilter
            selectedGenreId={selectedGenreId}
            keyword={keyword}
            onGenreChange={handleGenreChange}
            onClearSearch={handleClearSearch}
          />

          <div className="flex-1">
            {books.length === 0 ? (
              <p className="text-on-surface-variant">No books found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300"
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
            )}

            <div className="flex items-center justify-center gap-3 mt-12">
              <button
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
                className="
      px-4 py-2
      border border-outline-variant
      rounded-full
      text-on-surface-variant
      hover:text-primary
      hover:border-primary
      disabled:opacity-30
      disabled:cursor-not-allowed
      transition-colors
    "
              >
                Prev
              </button>

              <span className="px-4 py-2 text-on-surface-variant">
                Page{" "}
                <span className="text-primary font-semibold">{page + 1}</span> /{" "}
                {totalPages}
              </span>

              <button
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="
      px-4 py-2
      border border-outline-variant
      rounded-full
      text-on-surface-variant
      hover:text-primary
      hover:border-primary
      disabled:opacity-30
      disabled:cursor-not-allowed
      transition-colors
    "
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
