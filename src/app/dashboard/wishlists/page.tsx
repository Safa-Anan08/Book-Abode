"use client";

import { useEffect, useState } from "react";
import WishlistsTable from "@/components/dashboard/WishlistsTable";
import { getWishlists } from "@/services/admin.service";

export default function WishlistsPage() {
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({
    totalWishlist: 0,
    totalUsers: 0,
  });

  const load = async () => {
    const res = await getWishlists();

    setBooks(res.books);
    setStats(res.stats);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <WishlistsTable
      books={books}
      stats={stats}
    />
  );
}