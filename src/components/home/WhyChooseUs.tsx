import {
  ShieldCheck,
  BookOpen,
  Users,
  Truck,
} from "lucide-react";

const features = [
  {
    title: "Secure Authentication",
    description:
      "JWT based authentication keeps your account and book collection safe.",
    icon: ShieldCheck,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Large Book Collection",
    description:
      "Browse books from multiple categories with powerful search and filtering.",
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Trusted Community",
    description:
      "Share and manage your books with a growing community of readers.",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Fast & Responsive",
    description:
      "Enjoy a fast experience on desktop, tablet, and mobile devices.",
    icon: Truck,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function WhyChooseUs() {
 return (
  <section className="bg-[#C3955B] py-20">
    <div className="mx-auto max-w-7xl px-6">

      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold text-[#261311]">
          Why Choose BookAbode?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#4D2E22]">
          BookAbode provides a modern platform where readers can
          discover, manage, and share books with an intuitive,
          responsive, and secure experience.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-3xl bg-[#E3C18F] p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-[#EDD0A2] hover:shadow-2xl"
            >
              <div className="mb-6 inline-flex rounded-2xl bg-[#261311] p-4 text-white transition-transform duration-300 group-hover:scale-110">
                <Icon size={30} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-[#261311]">
                {feature.title}
              </h3>

              <p className="leading-7 text-[#4D2E22]">
                {feature.description}
              </p>

              <div className="mt-6 h-1 w-0 rounded-full bg-[#261311] transition-all duration-300 group-hover:w-full" />
            </div>
          );
        })}
      </div>

    </div>
  </section>
);
}