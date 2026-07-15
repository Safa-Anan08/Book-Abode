"use client";

import { useEffect, useState } from "react";

import { getBooks } from "@/services/admin.service";
import BooksTable from "@/components/dashboard/BooksTable";


export default function BooksPage() {
  const [books, setBooks] =
    useState([]);

  const loadBooks = async () => {
    const res = await getBooks();

    setBooks(res.books);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div className="space-y-6 rounded-xl py-2 bg-[#C3955B]">

      <h1 className="text-3xl font-bold mx-2">
        Manage Books
      </h1>

      <BooksTable
        books={books}
        reload={loadBooks}
      />

    </div>
  );
}