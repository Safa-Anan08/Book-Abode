"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      <div className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="mb-8 text-3xl font-bold">
          My Wishlist
        </h1>

        {loading ? (
          <div className="py-20 text-center">
            Loading...
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-xl border py-16 text-center">
            <h2 className="text-xl font-semibold">
              Your wishlist is empty.
            </h2>

            <p className="mt-2 text-gray-500">
              Add books to your wishlist.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
              />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}