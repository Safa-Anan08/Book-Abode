"use client";

import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
}

export default function RecentBooks({
  books,
}: {
  books: Book[];
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Recent Books
      </h2>

      <div className="space-y-4">

        {books.slice(0, 5).map((book) => (
          <Link
            key={book._id}
            href={`/books/${book._id}`}
            className="block rounded-lg border p-4 transition hover:bg-gray-50"
          >
            <h3 className="font-semibold">
              {book.title}
            </h3>

            <p className="text-sm text-gray-500">
              {book.author}
            </p>

          </Link>
        ))}

      </div>

    </div>
  );
}