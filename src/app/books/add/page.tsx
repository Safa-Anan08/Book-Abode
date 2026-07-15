
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import BookForm from "@/components/books/BookForm";

export default function AddBookPage() {
  return (
    <ProtectedRoute>
      <BookForm mode="create" />
    </ProtectedRoute>
  );
}