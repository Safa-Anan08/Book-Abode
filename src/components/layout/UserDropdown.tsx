"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import { FaHeart ,FaPlus, FaBook,FaUser} from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
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
          className=" flex items-center  gap-3 w-full px-5 py-4 text-left font-semibold text-red-400 transition hover:bg-[#C3955B]/10 hover:text-[#C3955B]"
        >
          <IoLogOut /> Logout
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
   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C3955B] text-lg font-bold text-[#261311]">
  {user?.name?.charAt(0).toUpperCase() || "U"}
</div>
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
          onClick={() => setOpen(false)}
           className="flex items-center gap-3 px-5 py-3 text-gray-300 transition hover:bg-[#C3955B]/10 hover:text-[#C3955B]"
     
        >
          <FaUser  className="text-purple-900" />
        <span>My Profile</span>
        </Link>
        <Link
          href="/books/manage"
          onClick={() => setOpen(false)}
           className="flex items-center gap-3 px-5 py-3 text-gray-300 transition hover:bg-[#C3955B]/10 hover:text-[#C3955B]"
     
        >
          <FaBook className="text-blue-500" />
        <span>My Book</span>
        </Link>

        
        <Link
        href="/books/add"
        onClick={() => setOpen(false)}
        className="flex items-center gap-3 px-5 py-3 text-gray-300 transition hover:bg-[#C3955B]/10 hover:text-[#C3955B]"
     >
       <FaPlus className="text-purple-500" />
        <span>Add Book</span>
     </Link>


       <Link
        href="/wishlist"
        onClick={() => setOpen(false)}
        className="flex items-center gap-3 px-5 py-3 text-gray-300 transition hover:bg-[#C3955B]/10 hover:text-[#C3955B]"
     >
       <FaHeart className="text-red-500" />
        <span>My Wishlist</span>
     </Link>

      </div>

   
      <div className="border-t border-[#C3955B]/10">

        <button
          onClick={logout}
          className=" flex items-center gap-3 w-full px-5 py-4 text-left font-semibold text-red-400 transition hover:bg-[#C3955B]/10 hover:text-[#C3955B]"
        >
          <IoLogOut /> Logout
        </button>

      </div>

    </div>
  )}

</div>
  );
}