"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBook } from "@/services/book.service";
import toast from "react-hot-toast";
import BookDetailsSkeleton from "@/components/skeleton/BookDetailsSkeleton";
import ReportBook from "@/components/books/ReportBook";
import { checkoutBook } from "@/services/payment.service";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;

  image: string;
  imagePublicId?: string;

  pdfUrl: string;
  pdfPublicId?: string;

  price: number;
  rating: number;

  shortDescription: string;
  fullDescription: string;

  createdBy?: string;
}

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await getBook(id);
      setBook(res.book);
    } catch {
      toast.error("Failed to load book.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
  return <BookDetailsSkeleton />;
  }

  if (!book) {
    return (
      <div className="py-20 text-center text-xl">
        Book not found.
      </div>
    );
  }
const handlePreview = () => {
  window.open(book?.pdfUrl, "_blank");
};

const handleBuy = async () => {
  try {
    const res = await checkoutBook(book._id);

    window.location.href = res.url;
  } catch {
    toast.error("Payment failed.");
  }
};
  return (
  <div className="min-h-screen bg-[#C3955B] py-12">
    <div className="mx-auto max-w-7xl px-6">

      <div className="grid items-center gap-14 lg:grid-cols-2">

  
        <div className="rounded-3xl bg-[#E3C18F] p-8 shadow-2xl">
          <img
            src={book.image}
            alt={book.title}
            className="mx-auto h-[520px] w-auto object-contain transition duration-300 hover:scale-105"
          />
        </div>

  
        <div className="rounded-3xl bg-[#D4AE79] p-8 shadow-2xl">

          <span className="inline-block rounded-full bg-[#261311] px-4 py-2 text-sm font-semibold text-white">
            {book.category}
          </span>

          <h1 className="mt-5 text-4xl font-extrabold text-[#261311] lg:text-5xl">
            {book.title}
          </h1>

          <p className="mt-2 text-lg text-[#4D2E22]">
            By{" "}
            <span className="font-semibold">
              {book.author}
            </span>
          </p>

 
          <div className="mt-8 flex flex-wrap gap-8 rounded-2xl bg-[#E3C18F] p-6 shadow-lg">

            <div>
              <p className="text-sm text-[#4D2E22]">
                Price
              </p>

              <h3 className="mt-1 text-3xl font-bold text-[#261311]">
                ${book.price}
              </h3>
            </div>

            <div>
              <p className="text-sm text-[#4D2E22]">
                Rating
              </p>

              <h3 className="mt-1 text-3xl font-bold text-[#261311]">
                ⭐ {book.rating}
              </h3>
            </div>

          </div>

 
          <div className="mt-8">

            <h2 className="mb-3 text-2xl font-bold text-[#261311]">
              Overview
            </h2>

            <p className="leading-8 text-[#4D2E22]">
              {book.shortDescription}
            </p>

          </div>

  
          <div className="mt-8">

            <h2 className="mb-3 text-2xl font-bold text-[#261311]">
              Description
            </h2>

            <p className="leading-8 text-[#4D2E22]">
              {book.fullDescription}
            </p>

          </div>

         
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            {/* <button
              onClick={handlePreview}
              className="rounded-xl border-2 border-[#261311] px-8 py-3 font-semibold text-[#261311] transition-all duration-300 hover:bg-[#261311] hover:text-white"
            >
               Preview PDF
            </button> */}

            <button
              onClick={handleBuy}
              className="rounded-xl bg-[#261311] px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-xl"
            >
              Buy & Download (${book.price})
            </button>

          </div>

        </div>

      </div>

     
      <div className="mt-14 rounded-3xl bg-[#D4AE79] p-8 shadow-2xl">
        <ReportBook bookId={book._id} />
      </div>

    </div>
  </div>
);
}