"use client";

import {
  BookOpen,
  Users,
  Heart,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    stats: {
      totalBooks: number;
      totalUsers: number;
      totalWishlists: number;
    };
    chart: {
      name: string;
      value: number;
    }[];
  };
}

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export default function DashboardStats({
  data,
}: Props) {
  const cards = [
    {
      title: "Books",
      value: data.stats.totalBooks,
      icon: BookOpen,
    },
    {
      title: "Users",
      value: data.stats.totalUsers,
      icon: Users,
    },
    {
      title: "Wishlists",
      value: data.stats.totalWishlists,
      icon: Heart,
    },
  ];

 return (
  <section className="space-y-8 bg-[#C3955B] p-6 rounded-3xl">

  
    <div className="grid gap-6 md:grid-cols-3">

      {cards.map((card) => (
        <div
          key={card.title}
          className="group rounded-3xl border border-[#C3955B]/20 bg-[#261311] p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
                {card.title}
              </p>

              <h2 className="mt-3 text-4xl font-extrabold text-[#C3955B]">
                {card.value}
              </h2>

            </div>

            <div className="rounded-2xl bg-[#C3955B]/15 p-4 transition group-hover:bg-[#C3955B]">

              <card.icon
                size={34}
                className="text-[#C3955B] group-hover:text-[#261311]"
              />

            </div>

          </div>
        </div>
      ))}

    </div>

  
    <div className="rounded-3xl border border-[#C3955B]/20 bg-[#261311] p-8 shadow-2xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <span className="rounded-full bg-[#C3955B]/15 px-3 py-1 text-xs font-semibold text-[#C3955B]">
            Analytics
          </span>

          <h2 className="mt-3 text-3xl font-bold text-white">
            Books By Category
          </h2>

          <p className="mt-2 text-gray-400">
            Distribution of books across categories.
          </p>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={360}
      >
        <PieChart>
          <Pie
            data={data.chart}
            dataKey="value"
            nameKey="name"
            outerRadius={125}
            innerRadius={70}
            paddingAngle={4}
            label
          >
            {data.chart.map((_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

    </div>

  </section>
);
}