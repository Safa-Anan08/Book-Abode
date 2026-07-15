import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#261311]">

  <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-[#C3955B]/10 blur-[120px]" />
  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#C3955B]/10 blur-[150px]" />

  <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col-reverse items-center justify-between gap-14 px-6 py-16 lg:flex-row">

    
    <div className="max-w-2xl text-center lg:text-left">

      <span className="inline-block rounded-full border border-[#C3955B]/30 bg-[#C3955B]/10 px-4 py-2 text-sm font-medium text-[#C3955B]">
         Your Digital Reading Companion
      </span>

      <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
        Discover Your
        <span className="block text-[#C3955B]">
          Next Favorite Book
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-base leading-8 text-gray-300 sm:text-lg">
        Explore thousands of books across every genre. Build your personal
        library, discover inspiring stories, and enjoy seamless reading from
        one beautifully crafted platform.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

       

        <Link
          href="/books"
          className="rounded-xl border border-[#C3955B] px-7 py-3.5 text-center font-semibold text-[#C3955B] transition duration-300 hover:bg-[#C3955B] hover:text-black"
        >
          Explore Books
        </Link>

      </div>

    </div>

    <div className="relative">

      <div className="absolute -inset-4 rounded-3xl bg-[#C3955B]/20 blur-3xl" />

      <img
        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900"
        alt="Books"
        className="relative w-full max-w-sm rounded-3xl border border-[#C3955B]/20 object-cover shadow-2xl sm:max-w-md lg:max-w-lg"
      />

    </div>

  </div>
</section>
  );
}