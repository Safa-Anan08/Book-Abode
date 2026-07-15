"use client";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex justify-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded px-4 py-2 ${
            page === currentPage
              ? "bg-indigo-600 text-white"
              : "border"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}