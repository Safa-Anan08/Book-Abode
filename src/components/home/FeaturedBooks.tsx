"use client";

import { useEffect, useState } from "react";
import { getBooks } from "@/services/book.service";
import BookCard from "@/components/books/BookCard";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const res = await getBooks({
      page: 1,
      limit: 4,
    });

    setBooks(res.books);
  };

  return (
    <section className="mx-auto max-w-9xl px-6 py-20 bg-[#C3955B]">

      <h2 className="mb-10 text-center text-4xl font-bold">
        Featured Books
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {books.map((book: any) => (
          <BookCard
            key={book._id}
            book={book}
          />
        ))}
      </div>

    </section>
  );
}