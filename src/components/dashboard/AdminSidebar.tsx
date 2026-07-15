"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Heart,
  Flag,
  Home,
} from "lucide-react";

const menus = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/users",
    label: "Users",
    icon: Users,
  },
  {
    href: "/dashboard/books",
    label: "Books",
    icon: BookOpen,
  },
  {
    href: "/dashboard/wishlists",
    label: "Wishlists",
    icon: Heart,
  },
  {
    href: "/dashboard/reports",
    label: "Reports",
    icon: Flag,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.role !== "admin") {
    return null;
  }

 return (
  <aside className="min-h-screen w-72 border-r border-[#C3955B]/20 bg-[#261311] shadow-2xl">

  
    <div className="border-b border-[#C3955B]/10 px-6 py-8">

      <span className="rounded-full bg-[#C3955B]/20 px-3 py-1 text-xs font-semibold text-[#C3955B]">
        Dashboard
      </span>

      <h2 className="mt-4 text-3xl font-bold text-[#C3955B]">
        Admin Panel
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        Manage books, users and reports
      </p>

    </div>

 
    <nav className="flex flex-col p-5">

      {menus.map((item) => {
        const Icon = item.icon;

        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mb-3 flex items-center gap-4 rounded-xl px-5 py-3 font-medium transition-all duration-300 ${
              active
                ? "bg-[#C3955B] text-[#261311] shadow-lg"
                : "text-gray-300 hover:bg-[#3A241C] hover:text-[#C3955B]"
            }`}
          >
            <Icon size={20} />
            {item.label}
          </Link>
        );
      })}

 
      <div className="my-6 border-t border-[#C3955B]/10" />

  
      <Link
        href="/"
        className="flex items-center gap-4 rounded-xl px-5 py-3 font-medium text-gray-300 transition hover:bg-[#3A241C] hover:text-[#C3955B]"
      >
        <Home size={20} />
        Back to Website
      </Link>

    </nav>

  </aside>
);
}