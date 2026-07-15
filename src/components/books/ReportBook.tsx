"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { reportBook } from "@/services/report.service";

interface Props {
  bookId: string;
}

export default function ReportBook({
  bookId,
}: Props) {
  const [reason, setReason] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submit = async () => {
    if (!reason.trim()) {
      toast.error(
        "Please write a reason."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await reportBook(
        bookId,
        reason
      );

      if (res.success) {
        toast.success(
          "Report submitted."
        );

        setReason("");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 rounded-xl border bg-amber-150 p-6 shadow">

      <h2 className="mb-4 text-xl font-semibold text-red-600">
        Report this Book
      </h2>

      <textarea
        rows={5}
        value={reason}
        onChange={(e) =>
          setReason(e.target.value)
        }
        placeholder="Why are you reporting this book?"
        className="w-full rounded-lg border p-3 outline-none focus:border-red-500"
      />

      <button
        disabled={loading}
        onClick={submit}
        className="mt-4 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading
          ? "Submitting..."
          : "Submit Report"}
      </button>

    </div>
  );
}