import Hero from "@/components/home/Hero";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import Categories from "@/components/home/Categories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main>

      <Hero />

      <FeaturedBooks />

      <Categories />

      <WhyChooseUs />

      <Statistics />

      <Testimonials />

      <FAQ />

       <Newsletter />

    </main>
  );
}