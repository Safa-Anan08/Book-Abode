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
    <div className="rounded-xl bg-[#C3955B] shadow">

      <div className="flex items-center justify-between border-b p-5">

        <h2 className="text-2xl font-bold">
          Books
        </h2>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3"
          />

          <input
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="rounded-lg border py-2 pl-10 pr-4"
          />

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-[#835824]">

            <tr>

              <th className="p-4">
                Title
              </th>

              <th>
                Author
              </th>

              <th>
                Category
              </th>

              <th>
                Price
              </th>

              <th>
                Rating
              </th>

              <th>
                Owner
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredBooks.map(
              (book) => (

                <tr
                  key={book._id}
                  className="border-b"
                >

                  <td className="p-4">
                    {book.title}
                  </td>

                  <td>
                    {book.author}
                  </td>

                  <td>
                    {book.category}
                  </td>

                  <td>
                    $
                    {book.price}
                  </td>

                  <td>
                    ⭐
                    {book.rating}
                  </td>

                  <td>
                    {
                      book.createdBy
                    }
                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <Link
                        href={`/books/${book._id}`}
                        className="rounded bg-green-600 px-3 py-2 text-white"
                      >
                        View
                      </Link>

                      <button
                        disabled={
                          loading ===
                          book._id
                        }
                        onClick={() =>
                          handleReport(
                            book._id
                          )
                        }
                        className="rounded bg-yellow-500 p-2 text-white"
                      >
                        <Flag
                          size={
                            18
                          }
                        />
                      </button>

                      <button
                        disabled={
                          loading ===
                          book._id
                        }
                        onClick={() =>
                          handleDelete(
                            book._id
                          )
                        }
                        className="rounded bg-red-600 p-2 text-white"
                      >
                        <Trash2
                          size={
                            18
                          }
                        />
                      </button>

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}