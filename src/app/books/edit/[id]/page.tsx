
"use client";

import { useParams } from "next/navigation";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import BookForm from "@/components/books/BookForm";

export default function EditBookPage() {
  const params = useParams();

  return (
    <ProtectedRoute>
      <BookForm
        mode="edit"
        id={params.id as string}
      />
    </ProtectedRoute>
  );
}