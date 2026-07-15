import Link from "next/link";
import WishlistButton from "@/components/wishlist/WishlistButton";
import Image from "next/image";
interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  shortDescription: string;
}

export default function BookCard({
  book,
}: {
  book: Book;
}) {
  return (
   <div className="group overflow-hidden rounded-2xl border border-[#C3955B]/20 bg-[#261311] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#C3955B]/60 hover:shadow-2xl">


  <div className="relative overflow-hidden bg-[#1E0F0A]">

    <Image
      src={book.image}
      alt={book.title}
      width={400}
      height={500}
      className="h-72 w-full object-contain p-6 transition duration-500 group-hover:scale-105"
    />

    <div className="absolute right-4 top-4">
      <WishlistButton bookId={book._id} />
    </div>

    <span className="absolute left-4 top-4 rounded-full bg-[#C3955B] px-3 py-1 text-xs font-semibold text-black">
      {book.category}
    </span>

  </div>


  <div className="space-y-4 p-6">

    <div>
      <h2 className="line-clamp-1 text-xl font-bold text-white">
        {book.title}
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        {book.author}
      </p>
    </div>

    <p className="line-clamp-2 leading-7 text-gray-300">
      {book.shortDescription}
    </p>

    <div className="flex items-center justify-between border-t border-[#C3955B]/10 pt-4">

      <span className="text-2xl font-bold text-[#C3955B]">
        ${book.price}
      </span>

      <div className="rounded-full bg-[#C3955B]/10 px-3 py-1 text-sm font-medium text-[#C3955B]">
        ⭐ {book.rating}
      </div>

    </div>

    <Link
      href={`/books/${book._id}`}
      className="block rounded-xl bg-[#C3955B] py-3 text-center font-semibold text-black transition duration-300 hover:bg-[#d7ab73]"
    >
      View Details
    </Link>

  </div>

</div>
  );
}