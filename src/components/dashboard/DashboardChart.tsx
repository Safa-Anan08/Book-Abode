"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#4f46e5",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export default function DashboardChart({
  total,
  wishlist,
  mine,
}: {
  total: number;
  wishlist: number;
  mine: number;
}) {
  const data = [
    {
      name: "Books",
      value: total,
    },
    {
      name: "Wishlist",
      value: wishlist,
    },
    {
      name: "My Books",
      value: mine,
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Library Overview
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>

          <Pie
            data={data}
            outerRadius={110}
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[index % COLORS.length]
                }
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}