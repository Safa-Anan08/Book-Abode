"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

import {
  addWishlist,
  removeWishlist,
  checkWishlist,
} from "@/services/wishlist.service";

interface Props {
  bookId: string;
}

export default function WishlistButton({
  bookId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [wished, setWished] = useState(false);
console.log("Book ID:", bookId);
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const res = await checkWishlist(bookId);

        if (res.success) {
          setWished(res.wished);
        }
      } catch {
        
      }
    };

    loadWishlist();
  }, [bookId]);

  const handleWishlist = async () => {
    if (loading) return;

    try {
      setLoading(true);

      if (wished) {
        const res = await removeWishlist(bookId);

        if (res.success) {
          setWished(false);
          toast.success("Removed from wishlist");
        }
      } else {
        const res = await addWishlist(bookId);

        if (res.success) {
          setWished(true);
          toast.success("Added to wishlist");
        }
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleWishlist}
      className="flex h-10 w-10 items-center justify-center rounded-full border bg-[#e0be93] transition hover:bg-red-50 disabled:opacity-50"
    >
      <Heart
        size={20}
        className={
          wished
            ? "fill-red-500 text-red-500"
            : "text-gray-500"
        }
      />
    </button>
  );
}