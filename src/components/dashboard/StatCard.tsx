"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div
          className={`rounded-xl p-4 ${color} text-white`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}