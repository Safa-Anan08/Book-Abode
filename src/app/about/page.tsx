"use client";

import {
  BookOpen,
  Users,
  ShieldCheck,
  Heart,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-[#261311] text-white">

      <section className="px-5 py-24 lg:px-8">

        <div className="mx-auto max-w-7xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-[#C3955B]/40 bg-[#C3955B]/10 px-5 py-2 text-sm font-semibold text-[#C3955B]">
            <Sparkles size={16} />
            About BookAbode
          </span>

          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-extrabold leading-tight lg:text-7xl">
            Where Every Book
            <span className="text-[#C3955B]">
              {" "}Finds Its Reader
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
            BookAbode is a modern online book marketplace designed for
            readers and book lovers. Discover amazing books, connect with
            sellers, and build your personal reading journey in one place.
          </p>

        </div>

      </section>


  
      <section className="px-5 pb-24 lg:px-8">

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">


          <div className="rounded-3xl border border-[#C3955B]/20 bg-white/5 p-8 backdrop-blur-xl">

            <BookOpen
              size={45}
              className="text-[#C3955B]"
            />

            <h2 className="mt-6 text-3xl font-bold">
              Our Mission
            </h2>

            <p className="mt-4 leading-relaxed text-white/70">
              Our goal is to make books more accessible by creating a
              trusted platform where readers can discover new stories and
              sellers can share their collections with the world.
            </p>

          </div>



          <div className="rounded-3xl border border-[#C3955B]/20 bg-white/5 p-8 backdrop-blur-xl">

            <Heart
              size={45}
              className="text-red-400"
            />

            <h2 className="mt-6 text-3xl font-bold">
              Our Vision
            </h2>

            <p className="mt-4 leading-relaxed text-white/70">
              We believe books connect people, inspire creativity, and
              create lifelong memories. BookAbode aims to become a
              comfortable home for every book enthusiast.
            </p>

          </div>


        </div>

      </section>



      <section className="bg-[#1B0D0B] px-5 py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-center text-4xl font-bold">
            Why Choose
            <span className="text-[#C3955B]">
              {" "}BookAbode?
            </span>
          </h2>


          <div className="mt-12 grid gap-6 md:grid-cols-3">


            <FeatureCard
              icon={<BookOpen />}
              title="Huge Collection"
              text="Explore thousands of books across different categories."
            />


            <FeatureCard
              icon={<ShieldCheck />}
              title="Trusted Platform"
              text="Secure transactions and reliable book sellers."
            />


            <FeatureCard
              icon={<Users />}
              title="Book Community"
              text="Connect with readers and share your passion."
            />


          </div>

        </div>

      </section>




      <section className="px-5 py-20 lg:px-8">

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 md:grid-cols-4">


          <Stat
            number="10K+"
            title="Books"
          />

          <Stat
            number="5K+"
            title="Readers"
          />

          <Stat
            number="500+"
            title="Sellers"
          />

          <Stat
            number="24/7"
            title="Support"
          />


        </div>

      </section>


    </main>
  );
}



function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {

  return (
    <div className="rounded-3xl border border-[#C3955B]/20 bg-white/5 p-7 transition hover:-translate-y-2">

      <div className="text-[#C3955B]">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-white/60">
        {text}
      </p>

    </div>
  );
}



function Stat({
  number,
  title,
}: {
  number:string;
  title:string;
}) {

  return (
    <div className="rounded-3xl bg-[#C3955B] p-6 text-center text-[#261311]">

      <h3 className="text-4xl font-extrabold">
        {number}
      </h3>

      <p className="mt-2 font-semibold">
        {title}
      </p>

    </div>
  );
}