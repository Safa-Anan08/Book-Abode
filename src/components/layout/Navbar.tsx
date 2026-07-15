"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import UserDropdown from "./UserDropdown";
import NotificationBell from "../shared/NotificationBell";
export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const links = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/books",
      label: "Books",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];

  return (
   <header className="sticky top-0 z-50 border-b border-[#C3955B]/20 bg-[#261311]/95 backdrop-blur-xl">
  <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

    <Link
      href="/"
      className="text-3xl font-extrabold tracking-wide text-[#C3955B] transition hover:opacity-90"
    >
      BookAbode
    </Link>

    <nav className="hidden items-center gap-8 lg:flex">
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`relative text-sm font-medium transition-all duration-300 ${
            pathname === item.href
              ? "text-[#C3955B]"
              : "text-white/80 hover:text-[#C3955B]"
          }`}
        >
          {item.label}

          {pathname === item.href && (
            <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#C3955B]" />
          )}
        </Link>
      ))}

      {user && (
        <>
          {user.role === "admin" && (
            <Link
              href="/dashboard"
              className={`relative text-sm font-medium transition ${
                pathname.startsWith("/dashboard")
                  ? "text-[#C3955B]"
                  : "text-white/80 hover:text-[#C3955B]"
              }`}
            >
              Admin Dashboard

              {pathname.startsWith("/dashboard") && (
                <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#C3955B]" />
              )}
            </Link>
          )}

          <Link
            href="/books/manage"
            className={`relative text-sm font-medium transition ${
              pathname === "/books/manage"
                ? "text-[#C3955B]"
                : "text-white/80 hover:text-[#C3955B]"
            }`}
          >
            My Books

            {pathname === "/books/manage" && (
              <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#C3955B]" />
            )}
          </Link>
        </>
      )}
    </nav>

    <div className="hidden lg:block">
      {user ? (
        <div className="flex items-center gap-5">
          <NotificationBell />
          <UserDropdown />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl border border-[#C3955B] px-5 py-2.5 text-sm font-semibold text-[#C3955B] transition hover:bg-[#C3955B] hover:text-black"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-[#C3955B] px-5 py-2.5 text-sm font-semibold text-black shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            Register
          </Link>
        </div>
      )}
    </div>


    <button
      onClick={() => setOpen(!open)}
      className="rounded-lg p-2 text-[#C3955B] transition hover:bg-white/10 lg:hidden"
    >
      {open ? <X size={28} /> : <Menu size={28} />}
    </button>
  </div>

  {open && (
    <div className="border-t border-[#C3955B]/20 bg-[#261311] lg:hidden">
      <div className="space-y-2 px-6 py-5">

        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`block rounded-lg px-3 py-3 text-sm font-medium transition ${
              pathname === item.href
                ? "bg-[#C3955B] text-black"
                : "text-white hover:bg-white/10"
            }`}
          >
            {item.label}
          </Link>
        ))}

        {user && (
          <>
            {user.role === "admin" && (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-white transition hover:bg-white/10"
              >
                Admin Dashboard
              </Link>
            )}

            <Link
              href="/books/manage"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-white transition hover:bg-white/10"
            >
              My Books
            </Link>

            <div className="pt-3">
              <NotificationBell />
            </div>

            <div className="pt-3">
              <UserDropdown mobile />
            </div>
          </>
        )}

        {!user && (
          <div className="space-y-3 pt-4">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block rounded-xl border border-[#C3955B] py-3 text-center font-semibold text-[#C3955B]"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-[#C3955B] py-3 text-center font-semibold text-black"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  )}
</header>
  );
}