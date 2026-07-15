"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Heart,
  Users,
  Trophy,
} from "lucide-react";
import { FaHeart } from "react-icons/fa";

interface WishlistBook {
  bookId: string;
  title: string;
  author: string;
  image: string;
  category: string;
  wishlistCount: number;
  lastAdded: string;
}

interface Stats {
  totalWishlist: number;
  totalUsers: number;
}

interface Props {
  books: WishlistBook[];
  stats: Stats;
}

export default function WishlistsTable({
  books,
  stats,
}: Props) {
  const [search, setSearch] =
    useState("");

  const filteredBooks = useMemo(() => {
  return (books ?? []).filter((book) => {
    const keyword = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword) ||
      book.category.toLowerCase().includes(keyword)
    );
  });
}, [books, search]);

  const topBook =
      books?.length ? books[0] : null;

  const getRank = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";

    return index + 1;
  };

  const categoryColor = (
    category: string
  ) => {
    switch (
      category.toLowerCase()
    ) {
      case "novel":
        return "bg-purple-100 text-purple-700";

      case "science":
        return "bg-green-100 text-green-700";

      case "history":
        return "bg-yellow-100 text-yellow-700";

      case "business":
        return "bg-blue-100 text-blue-700";

      case "self help":
        return "bg-pink-100 text-pink-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-4xl font-bold text-[#261311]">
        Wishlist Analytics
      </h1>

     <p className="mt-2 text-[#261311]/70">
       Monitor the most wishlisted books across the platform.
        </p>

      </div>


      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-3xl bg-[#261311] p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-200">
                Total Wishlists
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#C3955B]">
                {stats.totalWishlist}
              </h2>

            </div>

            <div className="rounded-full bg-red-100 p-4">
              <Heart className="text-red-500" />
            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-[#C3955B] p-6 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-200">
                Most Wishlisted
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {topBook
                  ? topBook.title
                  : "--"}
              </h2>

              <p className="flex items-center gap-2 mt-1 text-sm text-gray-100">
                <FaHeart className="text-red-500" />{" "}
                {topBook
                  ? topBook.wishlistCount
                  : 0}{" "}
                Wishlists
              </p>

            </div>

            <div className="rounded-full bg-yellow-100 p-4">
              <Trophy className="text-yellow-500" />
            </div>

          </div>

        </div>

     

        <div className="rounded-2xl bg-[#e2b883] p-6 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-black">
                Wishlist Users
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.totalUsers}
              </h2>

            </div>

            <div className="rounded-full bg-blue-100 p-4">
              <Users className="text-blue-500" />
            </div>

          </div>

        </div>

      </div>

     

      <div className="relative">

        <Search
          size={20}
          className="absolute left-4 top-4 text-gray-100"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by book, author or category..."
          className="w-full rounded-xl border bg-[#e2b883] py-3 pl-12 pr-4 outline-none focus:border-blue-500"
        />

      </div>

            <div className="hidden overflow-hidden rounded-2xl border bg-[#e2b883] shadow lg:block">
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-[#2d1512]">

              <tr className="text-left text-sm font-semibold text-white">

                <th className="px-6 py-4">
                  Rank
                </th>

                <th className="px-6 py-4">
                  Book
                </th>

                <th className="px-6 py-4">
                  Author
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4 text-center">
                  Wishlists
                </th>

                <th className="px-6 py-4">
                  Last Wishlisted
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredBooks.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="py-14 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <Heart
                        size={48}
                        className="mb-4 text-gray-300"
                      />

                      <h3 className="text-lg font-semibold">
                        No wishlisted books found
                      </h3>

                      <p className="mt-2 text-gray-500">
                        Try another search keyword.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredBooks.map(
                  (book, index) => (

                    <tr
                      key={book.bookId}
                      className="border-t transition hover:bg-blue-50"
                    >

                    

                      <td className="px-6 py-5 text-xl font-bold bg-[#e2b883]">

                        {getRank(index)}

                      </td>

                     

                      <td className="px-6 py-5 bg-[#e2b883]">

                        <div className="flex items-center gap-4">

                          <img
                            src={
                              book.image
                            }
                            alt={
                              book.title
                            }
                            className="h-16 w-12 rounded-lg object-cover shadow"
                          />

                          <div>

                            <h3 className="font-semibold">

                              {book.title}

                            </h3>

                            <p className="text-sm text-gray-300">

                              ID:
                              {" "}
                              {book.bookId.slice(
                                0,
                                8
                              )}
                              ...

                            </p>

                          </div>

                        </div>

                      </td>


                      <td className="px-6 py-5 font-medium">

                        {book.author}

                      </td>


                      <td className="px-6 py-5">

                        <span className="mt-3 inline-flex rounded-full bg-[#C3955B] px-3 py-1 text-xs font-semibold text-[#261311]">
                      {book.category}
                       </span>

                      </td>

                    

                      <td className="px-6 py-5 text-center">

                        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">

                          <FaHeart className="text-red-500" /> {book.wishlistCount}

                        </span>

                      </td>


                      <td className="px-6 py-5 text-gray-600">

                        {new Date(
                          book.lastAdded
                        ).toLocaleDateString()}

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>
           

      <div className="space-y-4 lg:hidden">

        {filteredBooks.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <Heart
              size={45}
              className="mx-auto mb-4 text-gray-300"
            />

            <h3 className="text-lg font-semibold">
              No wishlisted books found
            </h3>

            <p className="mt-2 text-gray-500">
              Try another search.
            </p>
          </div>
        ) : (
          filteredBooks.map((book, index) => (
            <div
              key={book.bookId}
             className="overflow-hidden rounded-3xl border border-[#C3955B]/20 bg-[#261311] shadow-xl"
            >
             <div className="flex gap-4 border-b border-[#C3955B]/10 bg-[#3A241C] p-4">

                <img
                  src={book.image}
                  alt={book.title}
                  className="h-28 w-20 rounded-xl border border-[#C3955B]/20 object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">

                  <div className="flex items-center justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C3955B] text-lg">
                      {getRank(index)}
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-sm font-semibold text-red-400">
                      <FaHeart className="text-red-500" /> {book.wishlistCount}
                    </span>

                  </div>

                  <h3 className="mt-3 text-lg font-bold text-[#C3955B]">
                    {book.title}
                  </h3>

                  <p className="text-sm text-gray-500 ">
                    {book.author}
                  </p>

                  <span
                    className={ ` bg-[#e2b883] mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${categoryColor(
                      book.category
                    )}`}
                  >
                    {book.category}
                  </span>

                  <p className="mt-4 text-xs uppercase tracking-wide text-gray-400">
                    Last Wishlisted
                  </p>

                  <p className="font-semibold text-white">
                    {new Date(
                      book.lastAdded
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}