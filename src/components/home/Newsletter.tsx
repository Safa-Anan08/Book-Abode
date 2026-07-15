"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("Thanks for subscribing!");

    setEmail("");
  };

  return (
   
  <section className="bg-[#C3955B] py-20">
    <div className="mx-auto max-w-3xl px-6 text-center">

      <h2 className="text-4xl font-bold text-[#261311]">
        Subscribe to our Newsletter
      </h2>

      <p className="mt-4 leading-7 text-[#4D2E22]">
        Receive updates about new books, popular collections,
        and exclusive recommendations.
      </p>

      <form
        onSubmit={handleSubscribe}
        className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-xl border-2 border-[#261311]/20 bg-[#F7E7CC] px-5 py-3 text-[#261311] placeholder:text-[#7A5A42] outline-none transition focus:border-[#261311]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="rounded-xl bg-[#261311] px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#3A1D14] hover:shadow-xl"
        >
          Subscribe
        </button>
      </form>

    </div>
  </section>
);
  
}