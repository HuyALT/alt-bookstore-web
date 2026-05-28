import type { SortOption } from "../../types/util/sort";

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="hidden lg:block">
      <label className="sr-only" htmlFor="sort">
        Sort books
      </label>

      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="
          font-label-sm text-label-sm
          text-on-surface-variant
          bg-surface
          border border-outline-variant
          py-2 px-4
          cursor-pointer
          hover:text-primary
          focus:outline-none
          focus:border-primary
          transition-colors
        "
      >
        <option value="newest">Sort by: Newest</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="titleAsc">Title: A to Z</option>
      </select>
    </div>
  );
}
