"use client";

import { useState } from "react";
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
  Menu,
  X,Mail
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
   {
    href: "/dashboard/contacts",
    label: "Contacts",
    icon: Mail,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const [open, setOpen] = useState(false);

  if (loading) return null;

  if (!user || user.role !== "admin") {
    return null;
  }

  const SidebarContent = () => (
    <>
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
              onClick={() => setOpen(false)}
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
          onClick={() => setOpen(false)}
          className="flex items-center gap-4 rounded-xl px-5 py-3 font-medium text-gray-300 transition hover:bg-[#3A241C] hover:text-[#C3955B]"
        >
          <Home size={20} />
          Back to Website
        </Link>
      </nav>
    </>
  );

  return (
    <>

      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-[#C3955B]/20 bg-[#261311] px-4 py-4 lg:hidden">
        

        <h2 className="text-lg font-bold text-[#C3955B]">
          Admin Dashboard
        </h2>
         <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-[#C3955B] transition hover:bg-[#3A241C]"
        >
          <Menu size={26} />
        </button>
        
      </div>

  
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-[#261311] shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end px-5 py-5">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-[#C3955B] transition hover:bg-[#3A241C]"
          >
            <X size={24} />
          </button>
        </div>

        <SidebarContent />
      </aside>

      <aside className="hidden min-h-screen w-72 border-r border-[#C3955B]/20 bg-[#261311] shadow-2xl lg:block">
        <SidebarContent />
      </aside>
    </>
  );
}