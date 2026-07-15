import Link from "next/link";
import { Mail,} from "lucide-react";
import { FaFacebook ,FaGithub,FaInstagramSquare,FaLinkedin} from "react-icons/fa";

export default function Footer() {
 return (
  <footer className="border-t border-[#C3955B]/20 bg-[#261311] text-gray-300">
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">

      <div>
        <h2 className="mb-5 text-3xl font-extrabold tracking-wide text-[#C3955B]">
          BookAbode
        </h2>

        <p className="leading-8 text-gray-400">
          Discover, organize, and enjoy your favorite books in one
          beautifully crafted platform designed for every reader.
        </p>
      </div>

      <div>
        <h3 className="mb-5 text-lg font-semibold text-white">
          Quick Links
        </h3>

        <ul className="space-y-3">
          <li>
            <Link
              href="/"
              className="transition hover:text-[#C3955B]"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/books"
              className="transition hover:text-[#C3955B]"
            >
              Books
            </Link>
          </li>

          <li>
            <Link
              href="/books/add"
              className="transition hover:text-[#C3955B]"
            >
              Add Book
            </Link>
          </li>

          <li>
            <Link
              href="/books/manage"
              className="transition hover:text-[#C3955B]"
            >
              My Books
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="mb-5 text-lg font-semibold text-white">
          Contact
        </h3>

        <div className="space-y-4">

          <p className="flex items-center gap-3">
            📍
            <span>Dhaka, Bangladesh</span>
          </p>

          <a
            href="mailto:safaspractice@gmail.com"
            className="flex items-center gap-3 transition hover:text-[#C3955B]"
          >
            <Mail size={18} />
            <span className="break-all">
              safaspractice@gmail.com
            </span>
          </a>

        </div>
      </div>

      <div>
        <h3 className="mb-5 text-lg font-semibold text-white">
          Follow Us
        </h3>

        <div className="flex flex-wrap gap-4">

          <a
            href="https://www.facebook.com"
            className="rounded-full border border-[#C3955B]/30 p-3 text-xl transition hover:bg-[#C3955B] hover:text-black"
          >
            <FaFacebook />
          </a>

          <a
            href="https://github.com/Safa-Anan08/Book-Abode"
            className="rounded-full border border-[#C3955B]/30 p-3 text-xl transition hover:bg-[#C3955B] hover:text-black"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com"
            className="rounded-full border border-[#C3955B]/30 p-3 text-xl transition hover:bg-[#C3955B] hover:text-black"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.instagram.com"
            className="rounded-full border border-[#C3955B]/30 p-3 text-xl transition hover:bg-[#C3955B] hover:text-black"
          >
            <FaInstagramSquare />
          </a>

        </div>
      </div>

    </div>

    <div className="border-t border-[#C3955B]/20 py-6 text-center text-sm text-gray-400">
      © {new Date().getFullYear()}{" "}
      <span className="font-semibold text-[#C3955B]">
        BookAbode
      </span>
      . All Rights Reserved.
    </div>
  </footer>
);
}