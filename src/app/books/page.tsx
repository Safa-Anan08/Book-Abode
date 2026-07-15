"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { getBooks } from "@/services/book.service";
import BookCard from "@/components/books/BookCard";
import BookCardSkeleton from "@/components/skeleton/BookCardSkeleton";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  shortDescription: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBooks: 0,
  });

  useEffect(() => {
    loadBooks();
  }, [search, category, sortBy, page]);

  const loadBooks = async () => {
    try {
      setLoading(true);

      const res = await getBooks({
        search,
        category,
        sortBy,
        page,
        limit: 8,
      });

      setBooks(res.books);
      setPagination(res.pagination);
    } finally {
      setLoading(false);
    }
  };

 return (
  <section className="min-h-screen bg-[#C3955B] py-14">
    <div className="mx-auto max-w-7xl px-4">


      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <span className="rounded-full bg-[#C3955B]  py-2 text-sm font-semibold text-[#ecd9c1]">
             Digital Library
          </span>

          <h1 className="mt-4 text-4xl font-bold text-white lg:text-5xl">
            Explore Books
          </h1>

          <p className="mt-3 max-w-xl leading-7 text-gray-300">
            Discover premium books from different categories and
            find your next favorite read.
          </p>
        </div>

        <div className="rounded-2xl border border-[#C3955B]/30 bg-[#C3955B] px-6 py-4 shadow-lg">
          <p className="text-sm text-[#261311]">
            Total Books
          </p>

          <h3 className="text-3xl font-bold text-[#261311]">
            {pagination.totalBooks}
          </h3>
        </div>

      </div>

      <div className="mb-10 rounded-3xl border border-[#C3955B]/20 bg-[#3A241C] p-6 shadow-xl">

        <div className="grid gap-5 lg:grid-cols-3">

     
          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C3955B]"
            />

            <input
              value={search}
              placeholder="Search books..."
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-[#C3955B]/20 bg-[#261311] py-3 pl-11 pr-4 text-white placeholder:text-gray-400 outline-none transition focus:border-[#C3955B]"
            />

          </div>

    
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-[#C3955B]/20 bg-[#261311] p-3 text-white outline-none focus:border-[#C3955B]"
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
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-[#C3955B]/20 bg-[#261311] p-3 text-white outline-none focus:border-[#C3955B]"
          >
            <option value="newest">Newest</option>
            <option value="priceLow">
              Price: Low → High
            </option>
            <option value="priceHigh">
              Price: High → Low
            </option>
            <option value="rating">
              Highest Rating
            </option>
          </select>

        </div>

      </div>

   
      {loading ? (
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="rounded-3xl border border-[#C3955B]/20 bg-[#3A241C] py-24 text-center">

          <h2 className="text-3xl font-bold text-white">
            No Books Found
          </h2>

          <p className="mt-3 text-gray-400">
            Try changing your search or filters.
          </p>

        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
            />
          ))}
        </div>
      )}


      {!loading && pagination.totalPages > 1 && (
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">

          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded-xl border border-[#C3955B] px-6 py-3 font-semibold text-[#C3955B] transition hover:bg-[#C3955B] hover:text-[#261311] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <div className="rounded-xl bg-[#C3955B] px-6 py-3 font-bold text-[#261311] shadow-lg">
            {pagination.currentPage} / {pagination.totalPages}
          </div>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-xl border border-[#C3955B] px-6 py-3 font-semibold text-[#C3955B] transition hover:bg-[#C3955B] hover:text-[#261311] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>
      )}

    </div>
  </section>
);
}