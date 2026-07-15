"use client";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  "/images/hero1.jpeg",
  "/images/hero2.jpeg",
  "/images/hero3.jpeg",
  "/images/hero4.jpeg",
  "/images/hero5.jpeg",
  "/images/hero6.jpeg",
];

export default function Hero() {
  return (
    <section className="relative h-[65vh] min-h-[450px] overflow-hidden md:h-[75vh] lg:h-[85vh]">
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
        ]}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="h-full w-full"
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">

       
              <Image
                src={image}
                alt=""
                fill
                className="object-cover blur-md scale-110"
              />

         
              <div className="absolute inset-0 bg-black/40" />

             
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="relative h-full w-full ">

                  <Image
                    src={image}
                    alt={`Hero ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />


                  <div
  className="
    absolute 
    bottom-[12%]
    left-1/2
    flex
    w-[90%]
    -translate-x-1/2
    flex-row
    justify-start
    gap-3

    md:bottom-[15%]
    md:left-[23%]
    md:w-auto
    md:translate-x-0
  "
>
  <Link
    href="/books"
    className="
      flex-1
      rounded-xl
      bg-[#C3955B]
      px-4
      py-3
      text-center
      font-semibold
      text-[#261311]
      transition
      hover:scale-105
      md:flex-none
      md:px-7
    "
  >
    Explore Books
  </Link>

  <Link
    href="/register"
    className="
      flex-1
      rounded-xl
      border
      border-white
      bg-black/30
      px-4
      py-3
      text-center
      font-semibold
      text-white
      backdrop-blur
      transition
      hover:bg-white
      hover:text-black
      md:flex-none
      md:px-7
    "
  >
    Join Now
  </Link>
</div>

                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}