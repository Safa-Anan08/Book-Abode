"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function ProfilePage() {
  const { user, getCurrentUser } = useAuth();

  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPreview(user.image || "");
    }
  }, [user]);

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axiosInstance.put(
        "/auth/profile",
        formData
      );

      if (res.data.success) {
  toast.success("Profile updated");

  setImageFile(null);

  await getCurrentUser();
}
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
    <section className="min-h-screen bg-[#F8F5F0] px-4 py-12 dark:bg-[#1B1B1B]">

      <div className="mx-auto max-w-3xl rounded-3xl border border-[#C3955B]/20 bg-white p-8 shadow-xl dark:border-neutral-700 dark:bg-[#262626]">

        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold text-[#261311] dark:text-white">
            My Profile
          </h1>

          <p className="mt-3 text-[#6B4E3D] dark:text-gray-400">
            Manage your personal information.
          </p>

        </div>

        <div className="flex flex-col items-center">

          <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-[#C3955B] shadow-lg">

  {preview ? (
    <Image
      src={preview}
      alt="Profile"
      fill
      className="object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-[#261311] text-5xl font-bold text-white">
      {(user?.name || "User").charAt(0).toUpperCase()}
    </div>
  )}

</div>

          <label className="mt-5 cursor-pointer rounded-xl bg-[#261311] px-6 py-3 font-semibold text-white transition hover:bg-[#3B211C]">

            Change Photo

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />

          </label>

        </div>

        <div className="mt-10 space-y-6">

          <div>

            <label className="mb-2 block font-semibold text-[#261311] dark:text-white">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-xl border border-[#C3955B]/30 bg-[#FFF8EE] px-4 py-3 outline-none transition focus:border-[#C3955B] dark:border-neutral-700 dark:bg-[#333] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-[#261311] dark:text-white">
              Email
            </label>

            <input
              value={user?.email || ""}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500 dark:border-neutral-700 dark:bg-[#2A2A2A] dark:text-gray-400"
            />

          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full rounded-xl bg-[#C3955B] py-4 text-lg font-bold text-[#261311] transition hover:bg-[#B5864F] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Updating..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </section>
    </ProtectedRoute>
  );

}