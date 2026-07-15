"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { BookFormData } from "@/types/book";
import { BOOK_CATEGORIES } from "@/constants/book";

interface Props {
  register: UseFormRegister<BookFormData>;
  errors: FieldErrors<BookFormData>;
}

export default function BookBasicInfo({
  register,
  errors,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">

      <div>
        <label className="mb-2 block text-sm font-medium">
          Book Title
        </label>

 <input
  {...register("title", {
    required: "Title is required",
  })}
  placeholder="Atomic Habits"
  className="w-full rounded-xl border p-3 focus:border-indigo-600 focus:outline-none"
/>

        <p className="mt-1 text-sm text-red-500">
          {errors.title?.message}
        </p>
      </div>


      <div>
        <label className="mb-2 block text-sm font-medium">
          Author
        </label>

        <input
          {...register("author", {
            required: "Author is required",
          })}
          placeholder="James Clear"
          className="w-full rounded-xl border p-3 focus:border-indigo-600 focus:outline-none"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.author?.message}
        </p>
      </div>

  
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          {...register("category", {
            required: "Category is required",
          })}
          className="w-full rounded-xl border p-3 focus:border-indigo-600 focus:outline-none"
        >
          <option value="">Select Category</option>

          {BOOK_CATEGORIES.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <p className="mt-1 text-sm text-red-500">
          {errors.category?.message}
        </p>
      </div>


      <div>
        <label className="mb-2 block text-sm font-medium">
          Price
        </label>

        <input
          type="number"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Price must be positive",
            },
          })}
          className="w-full rounded-xl border p-3 focus:border-indigo-600 focus:outline-none"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.price?.message}
        </p>
      </div>

  
      <div>
        <label className="mb-2 block text-sm font-medium">
          Rating
        </label>

        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          {...register("rating", {
            valueAsNumber: true,
          })}
          className="w-full rounded-xl border p-3 focus:border-indigo-600 focus:outline-none"
        />
      </div>
    </div>
  );
}