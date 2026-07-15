"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import {
  Trash2,
  Flag,
  Search,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  deleteBook,
  reportBook,
} from "@/services/admin.service";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  createdBy: string;
}

interface Props {
  books: Book[];
  reload: () => Promise<void>;
}

export default function BooksTable({
  books,
  reload,
}: Props) {
  const [loading, setLoading] =
    useState("");

  const [search, setSearch] =
    useState("");

  const filteredBooks =
    useMemo(() => {
      return books.filter(
        (book) =>
          book.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          book.author
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [books, search]);

  const handleDelete =
    async (id: string) => {
      if (
        !confirm(
          "Delete this book?"
        )
      )
        return;

      try {
        setLoading(id);

        await deleteBook(id);

        toast.success(
          "Book deleted"
        );

        reload();
      } catch {
        toast.error(
          "Delete failed"
        );
      } finally {
        setLoading("");
      }
    };

  const handleReport =
    async (id: string) => {
      const reason =
        prompt(
          "Report reason"
        );

      if (!reason) return;

      try {
        setLoading(id);

        await reportBook(
          id,
          reason
        );

        toast.success(
          "Report sent"
        );
      } catch {
        toast.error(
          "Failed"
        );
      } finally {
        setLoading("");
      }
    };

return (
  <div className="rounded-2xl border border-[#8A5A22]/20 bg-[#C3955B] shadow-xl">
    <div className="flex flex-col gap-4 border-b border-[#8A5A22]/20 p-5 md:flex-row md:items-center md:justify-between">
      <h2 className="text-2xl font-bold text-[#261311]">
        Books
      </h2>

      <div className="relative w-full md:w-80">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#261311]/60"
        />

        <input
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-[#8A5A22]/30 bg-white py-3 pl-10 pr-4 text-[#261311] outline-none transition focus:border-[#261311]"
        />
      </div>
    </div>

  
    <div className="hidden overflow-x-auto lg:block">
      <table className="min-w-full">
        <thead className="bg-[#261311] text-white">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Author</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-center">Price</th>
            <th className="p-4 text-center">Rating</th>
            <th className="p-4 text-left">Owner</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredBooks.map((book) => (
            <tr
              key={book._id}
              className="border-b border-[#8A5A22]/20 transition hover:bg-[#d2aa77]"
            >
              <td className="p-4 font-semibold text-[#261311]">
                {book.title}
              </td>

              <td className="p-4">{book.author}</td>

              <td className="p-4">
                <span className="rounded-full bg-[#261311] px-3 py-1 text-xs font-medium text-white">
                  {book.category}
                </span>
              </td>

              <td className="p-4 text-center font-semibold">
                ${book.price}
              </td>

              <td className="p-4 text-center">
                ⭐ {book.rating}
              </td>

              <td className="p-4 truncate max-w-[180px]">
                {book.createdBy}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <Link
                    href={`/books/${book._id}`}
                    className="rounded-lg bg-[#261311] px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                  >
                    View
                  </Link>

                  <button
                    disabled={loading === book._id}
                    onClick={() => handleReport(book._id)}
                    className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600 disabled:opacity-50"
                  >
                    <Flag size={18} />
                  </button>

                  <button
                    disabled={loading === book._id}
                    onClick={() => handleDelete(book._id)}
                    className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
<div className="space-y-5 p-5 lg:hidden">
  {filteredBooks.map((book) => (
    <div
      key={book._id}
      className="overflow-hidden rounded-3xl border border-[#C3955B]/20 bg-[#261311] shadow-xl"
    >
     
      <div className="border-b border-[#C3955B]/15 bg-[#3A241C] px-5 py-4">
        <h3 className="line-clamp-1 text-lg font-bold text-[#C3955B]">
          {book.title}
        </h3>

        <p className="mt-1 text-sm text-gray-300">
          by {book.author}
        </p>
      </div>

    
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-[#4A2C22] p-3">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Category
            </p>

            <p className="mt-1 font-semibold text-white">
              {book.category}
            </p>
          </div>

          <div className="rounded-xl bg-[#4A2C22] p-3">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Price
            </p>

            <p className="mt-1 font-semibold text-[#C3955B]">
              ${book.price}
            </p>
          </div>

          <div className="rounded-xl bg-[#4A2C22] p-3">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Rating
            </p>

            <p className="mt-1 font-semibold text-yellow-400">
              ⭐ {book.rating}
            </p>
          </div>

          <div className="rounded-xl bg-[#4A2C22] p-3">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Owner
            </p>

            <p className="mt-1 truncate text-sm text-white">
              {book.createdBy}
            </p>
          </div>

        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">

          <Link
            href={`/books/${book._id}`}
            className="flex items-center justify-center rounded-xl bg-[#C3955B] py-3 font-semibold text-[#261311] transition hover:scale-105"
          >
            View
          </Link>

          <button
            disabled={loading === book._id}
            onClick={() => handleReport(book._id)}
            className="flex items-center justify-center rounded-xl bg-yellow-500 py-3 text-white transition hover:scale-105 hover:bg-yellow-600"
          >
            <Flag size={18} />
          </button>

          <button
            disabled={loading === book._id}
            onClick={() => handleDelete(book._id)}
            className="flex items-center justify-center rounded-xl bg-red-600 py-3 text-white transition hover:scale-105 hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </div>
    </div>
  ))}
</div>
  
    
  </div>
);
}