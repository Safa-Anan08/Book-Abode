"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

export default function UserDropdown({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const { user, setUser } = useAuth();

  const router = useRouter();

  const logout = async () => {
    await axiosInstance.post("/auth/logout");

    setUser(null);

    toast.success("Logged out");

    router.push("/");
  };

  if (mobile) {
    return (
      <button
        onClick={logout}
        className="py-3 text-left text-red-600"
      >
        Logout
      </button>
    );
  }

  return (
   <div className="relative">

  <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-3 rounded-full border border-[#C3955B]/30 bg-[#261311] px-3 py-2 text-white transition hover:border-[#C3955B] hover:bg-[#3A241C]"
  >

    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C3955B] font-bold text-[#261311] shadow-lg">
      {user?.name?.charAt(0).toUpperCase()}
    </div>

    <div className="hidden text-left sm:block">
      <p className="text-sm font-semibold">
        {user?.name}
      </p>

      <p className="text-xs text-gray-400">
        Reader
      </p>
    </div>

    <ChevronDown
      size={18}
      className={`transition ${
        open ? "rotate-180" : ""
      }`}
    />

  </button>

  {open && (
    <div className="absolute right-0 z-50 mt-4 w-64 overflow-hidden rounded-2xl border border-[#C3955B]/20 bg-[#261311] shadow-2xl">

 
      <div className="border-b border-[#C3955B]/10 bg-[#3A241C] p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C3955B] text-lg font-bold text-[#261311]">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {user?.name}
            </h3>

            <p className="text-sm text-gray-400">
              {user?.email}
            </p>
          </div>

        </div>

      </div>


      <div className="py-2">

        <Link
          href="/profile"
          className="block px-5 py-3 text-gray-300 transition hover:bg-[#C3955B]/10 hover:text-[#C3955B]"
        >
          👤 My Profile
        </Link>

        <Link
          href="/books/manage"
          className="block px-5 py-3 text-gray-300 transition hover:bg-[#C3955B]/10 hover:text-[#C3955B]"
        >
          📚 My Books
        </Link>

        <Link
          href="/books/add"
          className="block px-5 py-3 text-gray-300 transition hover:bg-[#C3955B]/10 hover:text-[#C3955B]"
        >
          ➕ Add Book
        </Link>

        <Link
          href="/wishlist"
          className="block px-5 py-3 text-gray-300 transition hover:bg-[#C3955B]/10 hover:text-[#C3955B]"
        >
          ❤️ My Wishlist
        </Link>

      </div>

   
      <div className="border-t border-[#C3955B]/10">

        <button
          onClick={logout}
          className="w-full px-5 py-4 text-left font-semibold text-red-400 transition hover:bg-red-600 hover:text-white"
        >
          🚪 Logout
        </button>

      </div>

    </div>
  )}

</div>
  );
}