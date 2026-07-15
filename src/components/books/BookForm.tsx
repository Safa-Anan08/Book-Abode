"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  createBook,
  getBook,
  updateBook,
} from "@/services/book.service";

import BookBasicInfo from "./BookBasicInfo";
import BookDescription from "./BookDescription";
import BookImageUpload from "./BookImageUpload";
import BookSubmitButton from "./BookSubmitButton";

import { BookFormData } from "@/types/book";

interface Props {
  mode: "create" | "edit";
  id?: string;
}

export default function BookForm({
  mode,
  id,
}: Props) {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<BookFormData>();

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [pdfFile, setPdfFile] =
    useState<File | null>(null);

  useEffect(() => {
    if (mode !== "edit" || !id) return;

    const loadBook = async () => {
      try {
        const res = await getBook(id);

        reset({
          title: res.book.title,
          author: res.book.author,
          category: res.book.category,
          price: res.book.price,
          rating: res.book.rating,
          shortDescription:
            res.book.shortDescription,
          fullDescription:
            res.book.fullDescription,
        });
      } catch {
        toast.error("Book not found.");
      }
    };

    loadBook();
  }, [id, mode, reset]);

  const onSubmit = async (
    data: BookFormData
  ) => {
    try {
      const formData =
        new FormData();

      formData.append(
        "title",
        data.title
      );

      formData.append(
        "author",
        data.author
      );

      formData.append(
        "category",
        data.category
      );

      formData.append(
        "price",
        String(data.price)
      );

      formData.append(
        "rating",
        String(data.rating)
      );

      formData.append(
        "shortDescription",
        data.shortDescription
      );

      formData.append(
        "fullDescription",
        data.fullDescription
      );

      if (imageFile) {
        formData.append(
          "image",
          imageFile
        );
      }

      if (pdfFile) {
        formData.append(
          "pdf",
          pdfFile
        );
      }

      if (mode === "create") {
        const res =
          await createBook(
            formData
          );

        if (res.success) {
          toast.success(
            res.message
          );

          router.push(
            "/books/manage"
          );
        }
      } else {
        const res =
          await updateBook(
            id!,
            formData
          );

        if (res.success) {
          toast.success(
            res.message
          );

          router.push(
            "/books/manage"
          );
        }
      }
    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ||
          "Something went wrong."
      );
    }
  };

 return (
  <section className="min-h-screen bg-[#805725] py-14">

    <div className="mx-auto max-w-5xl px-4">

      <div className="rounded-3xl border border-[#C3955B]/20 bg-[#C3955B] p-8 shadow-2xl lg:p-10">

  
        <div className="mb-10">

            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-[#261311] bg-white shadow-lg">
                 <Image
                   src="https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3N8ZW58MHx8MHx8fDA%3D"
                    alt="BookAbode"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
          </div>

          <h1 className="mt-5 text-4xl font-bold text-white">
            {mode === "create"
              ? "Add New Book"
              : "Edit Book"}
          </h1>

          <p className="mt-3 text-gray-300">
            {mode === "create"
              ? "Publish a new book and share it with readers."
              : "Update your existing book information."}
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-10"
        >

         
          <BookBasicInfo
            register={register}
            errors={errors}
          />

       
          <div>

            <label className="mb-3 block text-sm font-semibold text-[#C3955B]">
              Book Cover
            </label>

            <BookImageUpload
              setImageFile={setImageFile}
            />

            {errors.image && (
              <p className="mt-2 text-sm text-red-400">
                {errors.image.message}
              </p>
            )}

          </div>

    
          <div>

            <label className="mb-3 block text-sm font-semibold text-[#C3955B]">
              Book PDF
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setPdfFile(
                  e.target.files?.[0] || null
                )
              }
              className="w-full rounded-xl border border-[#C3955B]/20 bg-[#3A241C] p-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-[#C3955B] file:px-4 file:py-2 file:font-semibold file:text-[#261311] hover:file:bg-[#D7AA6C]"
            />

            <p className="mt-2 text-sm text-white">
              Upload the complete PDF version of your book.
            </p>

          </div>

        
          <BookDescription
            register={register}
            errors={errors}
          />

          <BookSubmitButton
            loading={isSubmitting}
            mode={mode}
          />

        </form>

      </div>

    </div>

  </section>
);
}