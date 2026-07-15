"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Programming",
    books: 45,
  },
   {
    name: "Fiction",
    books: 40,
  },
  {
    name: "Science",
    books: 32,
  },
  {
    name: "Novel",
    books: 58,
  },
  {
    name: "History",
    books: 26,
  },
  {
    name: "Education",
    books: 41,
  },
];

export default function Statistics() {
  return (
  <section className="bg-[#261311] py-20">
    <div className="mx-auto max-w-7xl px-6">

      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold text-white">
          Library Statistics
        </h2>

        <p className="mt-4 text-gray-300">
          A quick overview of books available across different categories.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">

        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-3xl bg-[#C3955B] p-8 shadow-xl transition duration-300 hover:-translate-y-2 hover:bg-[#D2A873]">
            <h3 className="text-4xl font-bold text-[#261311]">
              250+
            </h3>

            <p className="mt-2 text-[#4D2E22]">
              Total Books
            </p>
          </div>

          <div className="rounded-3xl bg-[#C3955B] p-8 shadow-xl transition duration-300 hover:-translate-y-2 hover:bg-[#D2A873]">
            <h3 className="text-4xl font-bold text-[#261311]">
              120+
            </h3>

            <p className="mt-2 text-[#4D2E22]">
              Active Readers
            </p>
          </div>

          <div className="rounded-3xl bg-[#C3955B] p-8 shadow-xl transition duration-300 hover:-translate-y-2 hover:bg-[#D2A873]">
            <h3 className="text-4xl font-bold text-[#261311]">
              35+
            </h3>

            <p className="mt-2 text-[#4D2E22]">
              Categories
            </p>
          </div>

          <div className="rounded-3xl bg-[#C3955B] p-8 shadow-xl transition duration-300 hover:-translate-y-2 hover:bg-[#D2A873]">
            <h3 className="text-4xl font-bold text-[#261311]">
              4.9★
            </h3>

            <p className="mt-2 text-[#4D2E22]">
              Average Rating
            </p>
          </div>

        </div>

        <div className="rounded-3xl bg-[#C3955B] p-6 shadow-2xl">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid
                stroke="#8C6A43"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
                stroke="#261311"
              />

              <YAxis
                stroke="#261311"
              />

              <Tooltip
                contentStyle={{
                  background: "#261311",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#fff" }}
              />

              <Bar
                dataKey="books"
                fill="#261311"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  </section>
);
}