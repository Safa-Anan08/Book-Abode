"use client";

import Image from "next/image";
import { uploadImage } from "@/services/image.service";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum image size is 5MB.");
      return;
    }

    try {
      setLoading(true);

      const url = await uploadImage(file);

      onChange(url);

      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      {value ? (
        <div className="relative">

          <div className="relative h-72 w-full overflow-hidden rounded-xl border">
            <Image
              src={value}
              alt="Book"
              fill
              className="object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white"
          >
            <X size={18} />
          </button>

        </div>
      ) : (
        <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 transition hover:border-indigo-600">

          <Upload className="mb-3 h-10 w-10 text-indigo-600" />

          <p className="font-medium">
            Click to upload book image
          </p>

          <p className="mt-1 text-sm text-gray-500">
            PNG, JPG, JPEG (Max 5MB)
          </p>

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleUpload}
          />

        </label>
      )}

      {loading && (
        <div className="space-y-2">

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-indigo-600"></div>
          </div>

          <p className="text-center text-sm text-indigo-600">
            Uploading image...
          </p>

        </div>
      )}

    </div>
  );
}