"use client";

import { useState } from "react";

interface Props {
  setImageFile: React.Dispatch<
    React.SetStateAction<File | null>
  >;
}

export default function BookImageUpload({
  setImageFile,
}: Props) {
  const [preview, setPreview] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  return (
    <div className="space-y-4">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-56 w-40 rounded-xl border object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
      />

      <p className="text-sm text-gray-300">
        Upload a JPG, PNG or WEBP book cover.
      </p>
    </div>
  );
}