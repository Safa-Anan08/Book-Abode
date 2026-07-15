import Link from "next/link";
import {
  BookOpen,
  Code2,
  FlaskConical,
  Landmark,
  Brain,
  GraduationCap,
} from "lucide-react";

const categories = [
  {
    title: "Programming",
    icon: Code2,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Science",
    icon: FlaskConical,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "History",
    icon: Landmark,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Novel",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Psychology",
    icon: Brain,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Education",
    icon: GraduationCap,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function Categories() {
  return (
  <section className="bg-[#261311] py-20">
    <div className="mx-auto max-w-7xl px-6">

      <h2 className="mb-3 text-center text-4xl font-bold text-white">
        Browse Categories
      </h2>

      <p className="mx-auto mb-14 max-w-2xl text-center leading-7 text-gray-300">
        Explore books from different categories and discover your next
        favorite read.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.title}
              href={`/books?category=${category.title}`}
              className="group rounded-2xl border border-[#C3955B]/20 bg-[#3A211A] p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#C3955B] hover:shadow-2xl"
            >
              <div className="mb-6 inline-flex rounded-2xl bg-[#C3955B] p-4 text-black transition group-hover:scale-110">
                <Icon size={30} />
              </div>

              <h3 className="mb-3 text-2xl font-bold text-white">
                {category.title}
              </h3>

              <p className="leading-7 text-gray-300">
                Discover quality books in the{" "}
                {category.title.toLowerCase()} category.
              </p>

              <div className="mt-6 h-1 w-0 rounded-full bg-[#C3955B] transition-all duration-300 group-hover:w-full" />
            </Link>
          );
        })}
      </div>

    </div>
  </section>
);
}