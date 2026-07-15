"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

 return (
  <div className="min-h-screen bg-[#e0be93]">
    <div className="lg:flex">
      <AdminSidebar />

      <main className="flex-1 px-4 py-6 lg:p-8">
        {children}
      </main>
    </div>
  </div>
);
}