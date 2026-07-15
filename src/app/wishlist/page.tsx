"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Heart } from "lucide-react";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import BookCard from "@/components/books/BookCard";

import { getWishlist } from "@/services/wishlist.service";

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

export default function WishlistPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const res = await getWishlist();

      if (res.success) {
        setBooks(res.books);
      }
    } catch {
      toast.error("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-[#C3955B] py-14">
        <div className="mx-auto max-w-7xl px-5">

         
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div>
              <span className="rounded-full bg-[#C3955B]/20 px-4 py-1 text-sm font-medium text-[#523108]">
                My Collection
              </span>

              <h1 className="mt-4 text-4xl font-bold text-white">
                Wishlist
              </h1>

              <p className="mt-2 text-gray-200">
                Save your favorite books and read them later.
              </p>
            </div>

            <div className="rounded-2xl border border-[#C3955B]/20 bg-[#3A241C] px-6 py-4 text-center">
              <p className="text-sm text-gray-400">
                Total Books
              </p>

              <h2 className="mt-1 text-3xl font-bold text-[#C3955B]">
                {books.length}
              </h2>
            </div>

          </div>

          {loading ? (
            <div className="flex h-[50vh] items-center justify-center">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#C3955B]/30 border-t-[#C3955B]" />
            </div>
          ) : books.length === 0 ? (

            /* Empty State */
            <div className="flex min-h-[55vh] flex-col items-center justify-center rounded-3xl border border-[#C3955B]/20 bg-[#3A241C] px-6 text-center">

              <div className="mb-6 rounded-full bg-[#C3955B]/15 p-6">
                <Heart
                  size={60}
                  className="text-[#C3955B]"
                />
              </div>

              <h2 className="text-3xl font-bold text-white">
                Wishlist is Empty
              </h2>

              <p className="mt-3 max-w-md text-gray-400">
                Start exploring our collection and save your
                favorite books here.
              </p>

              <Link
                href="/books"
                className="mt-8 rounded-xl bg-[#C3955B] px-7 py-3 font-semibold text-[#261311] transition hover:-translate-y-1 hover:bg-[#d6ab74]"
              >
                Browse Books
              </Link>

            </div>

          ) : (

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                />
              ))}
            </div>

          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}