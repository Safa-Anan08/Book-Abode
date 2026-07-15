"use client";

interface Props {
  search: string;
  category: string;
  sortBy: string;
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
  onSort: (value: string) => void;
}

export default function BookFilters({
  search,
  category,
  sortBy,
  onSearch,
  onCategory,
  onSort,
}: Props) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="rounded-lg border p-3"
      />

      <select
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        className="rounded-lg border p-3"
      >
        <option value="">All Categories</option>
        <option value="Fiction">Fiction</option>
        <option value="Programming">Programming</option>
        <option value="Science">Science</option>
        <option value="Business">Business</option>
        <option value="History">History</option>
        <option value="Novel">Novel</option>
        <option value="Biography">Biography</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSort(e.target.value)}
        className="rounded-lg border p-3"
      >
        <option value="newest">Newest</option>
        <option value="priceLow">Price: Low → High</option>
        <option value="priceHigh">Price: High → Low</option>
        <option value="rating">Highest Rating</option>
      </select>
    </div>
  );
}