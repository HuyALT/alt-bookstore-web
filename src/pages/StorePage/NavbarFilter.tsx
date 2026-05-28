import { useEffect, useState } from "react";
import { getAllGenres } from "../../services/GenreApi";
import type { GenreResponse } from "../../types/response/GenreResponse";

type NavbarFilterProps = {
  selectedGenreId: number | null;
  keyword: string;
  onGenreChange: (genreId: number | null) => void;
  onClearSearch: () => void;
};

export default function NavbarFilter({
  selectedGenreId,
  keyword,
  onGenreChange,
  onClearSearch,
}: NavbarFilterProps) {
  const [genres, setGenres] = useState<GenreResponse[]>([]);

  const hasKeyword = keyword.trim().length > 0;

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await getAllGenres();
      if (res.success) {
        setGenres(res.data);
      } else {
        console.log(res.message);
      }
    };

    fetchGenres();
  }, []);

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-12 md:sticky md:top-28 self-start">
      <div>
        <h2 className="font-label-sm text-label-sm text-on-surface-variant mb-6 uppercase tracking-widest">
          Search
        </h2>

        <ul className="space-y-4 mb-10">
          <li>
            <button
              type="button"
              onClick={onClearSearch}
              disabled={!hasKeyword}
              className={`
                font-body-md text-body-md transition-colors text-left
                disabled:cursor-not-allowed
                ${
                  hasKeyword
                    ? "text-primary font-semibold"
                    : "text-on-surface-variant/50"
                }
              `}
            >
              {hasKeyword ? `Search: "${keyword}"` : "No active search"}
            </button>
          </li>
        </ul>

        <h2 className="font-label-sm text-label-sm text-on-surface-variant mb-6 uppercase tracking-widest">
          Categories
        </h2>

        <select
          value={selectedGenreId ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            onGenreChange(value === "" ? null : Number(value));
          }}
          className="
    w-full
    bg-surface-container-low
    border border-outline-variant/40
    px-4 py-3
    font-body-md text-body-md
    text-on-surface
    focus:outline-none
    focus:border-primary
    transition-colors
  "
        >
          <option value="">All Genres</option>

          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-8 border-t border-outline-variant/30">
        <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
          "A library is not a luxury but one of the necessities of life."
        </p>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">
          — Henry Ward Beecher
        </p>
      </div>
    </aside>
  );
}
