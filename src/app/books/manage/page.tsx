
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import {
  deleteBook,
  getMyBooks,
} from "@/services/book.service";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  rating: number;
}

export default function ManageBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      const res = await getMyBooks();
      setBooks(res.books);
    } catch {
      toast.error("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!ok) return;

    try {
      const res = await deleteBook(id);

      if (res.success) {
        toast.success(res.message);

        setBooks((prev) =>
          prev.filter((book) => book._id !== id)
        );
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed."
      );
    }
  };

   if (loading) {
  return <TableSkeleton rows={6} />;
 }

  return (
    <ProtectedRoute>
   
  <section className="min-h-screen bg-[#C3955B] py-14">
    <div className="mx-auto max-w-7xl px-4">


      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>
          <span className="rounded-full bg-[#261311]/20 px-4 py-2 text-sm font-semibold text-[#C3955B]">
             Dashboard
          </span>

          <h1 className="mt-4 text-4xl font-bold text-white">
            Manage Books
          </h1>

          <p className="mt-2 text-gray-300">
            View, edit and manage all your uploaded books.
          </p>
        </div>

        <Link
          href="/books/add"
          className="rounded-xl bg-[#C3955B] px-6 py-3 font-semibold text-[#261311] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#D4A76A]"
        >
          + Add New Book
        </Link>

      </div>

      {books.length === 0 ? (

        <div className="rounded-3xl border border-[#C3955B]/20 bg-[#3A241C] py-24 text-center shadow-xl">

          <h2 className="text-3xl font-bold text-white">
            No Books Found
          </h2>

          <p className="mt-3 text-gray-400">
            Start by adding your first book.
          </p>

        </div>

      ) : (

        <div className="overflow-hidden rounded-3xl border border-[#C3955B]/20 bg-[#3A241C] shadow-2xl">

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-[#C3955B] text-[#261311]">

                <tr>

                  <th className="px-6 py-5 text-left font-bold">
                    Title
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Author
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Category
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Price
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Rating
                  </th>

                  <th className="px-6 py-5 text-center font-bold">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {books.map((book) => (

                  <tr
                    key={book._id}
                    className="border-t border-[#C3955B]/10 text-white transition hover:bg-[#261311]"
                  >

                    <td className="px-6 py-5 font-medium">
                      {book.title}
                    </td>

                    <td className="px-6 py-5 text-gray-300">
                      {book.author}
                    </td>

                    <td className="px-6 py-5">

                      <span className="rounded-full bg-[#C3955B]/20 px-3 py-1 text-sm text-[#C3955B]">
                        {book.category}
                      </span>

                    </td>

                    <td className="px-6 py-5 font-semibold text-[#C3955B]">
                      ${book.price}
                    </td>

                    <td className="px-6 py-5">
                      ⭐ {book.rating}
                    </td>

                    <td className="px-6 py-5">

                      <div className="flex flex-wrap justify-center gap-3">

                        <Link
                          href={`/books/edit/${book._id}`}
                          className="rounded-lg bg-[#C3955B] px-4 py-2 text-sm font-semibold text-[#261311] transition hover:bg-[#D4A76A]"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(book._id)}
                          className="rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-600 hover:text-white"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  </section>

    </ProtectedRoute>
  );
}