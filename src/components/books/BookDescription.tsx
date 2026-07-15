"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BookFormData } from "@/types/book";

interface Props {
  register: UseFormRegister<BookFormData>;
  errors: FieldErrors<BookFormData>;
}

export default function BookDescription({
  register,
  errors,
}: Props) {
  return (
    <div className="space-y-6">
   
      <div>
        <label className="mb-2 block text-sm font-medium">
          Short Description
        </label>

        <textarea
          rows={3}
          {...register("shortDescription", {
            required: "Short description is required",
          })}
          className="w-full rounded-xl border p-3 focus:border-indigo-600 focus:outline-none"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.shortDescription?.message}
        </p>
      </div>


      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Description
        </label>

        <textarea
          rows={8}
          {...register("fullDescription", {
            required: "Full description is required",
          })}
          className="w-full rounded-xl border p-3 focus:border-indigo-600 focus:outline-none"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.fullDescription?.message}
        </p>
      </div>
    </div>
  );
}