import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Book Enthusiast",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "BookAbode made it incredibly easy to discover new books. The interface is clean, fast, and enjoyable to use.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Smith",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=14",
    review:
      "I love the search and filtering features. Managing my favorite books has never been this simple.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "University Student",
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "The responsive design works perfectly on my phone and laptop. Highly recommended for book lovers.",
    rating: 5,
  },
];

export default function Testimonials() {
 return (
  <section className="bg-[#C3955B] py-20">
    <div className="mx-auto max-w-7xl px-6">

      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold text-[#261311]">
          What Our Readers Say
        </h2>

        <p className="mt-4 text-[#4D2E22]">
          Thousands of readers trust BookAbode to explore and manage
          their favorite books.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl bg-[#261311] p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="mb-6 flex items-center gap-4">

              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-full border-2 border-[#C3955B] object-cover"
              />

              <div>
                <h3 className="text-lg font-bold text-white">
                  {item.name}
                </h3>

                <p className="text-sm text-[#C3955B]">
                  {item.role}
                </p>
              </div>

            </div>

            <div className="mb-5 flex gap-1">
              {Array.from({ length: item.rating }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className="fill-[#C3955B] text-[#C3955B]"
                />
              ))}
            </div>

            <p className="leading-7 text-gray-300">
              "{item.review}"
            </p>

            <div className="mt-6 h-1 w-0 rounded-full bg-[#C3955B] transition-all duration-300 group-hover:w-full" />
          </div>
        ))}
      </div>

    </div>
  </section>
);
}