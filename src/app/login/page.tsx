"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { getCurrentUser } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);

      if (res.data.success) {
        await getCurrentUser();

        toast.success("Login successful!");

        router.push("/");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Login failed."
      );
    }
  };

  const handleDemoLogin = () => {
    setValue("email", "demo@bookabode.com");
    setValue("password", "123456");
  };

return (
  <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#261311] px-4 py-12">

    <div className="w-full max-w-md rounded-3xl border border-[#C3955B]/30 bg-[#C3955B] p-8 shadow-2xl">

   
      <div className="mb-8 text-center">

        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-[#261311] bg-white shadow-lg">
           <Image
              src="https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3N8ZW58MHx8MHx8fDA%3D"
              alt="BookAbode"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
        </div>

        <h1 className="text-4xl font-bold text-[#261311]">
          Welcome Back
        </h1>

        <p className="mt-2 text-[#4D2E22]">
          Login to continue exploring your favorite books.
        </p>

      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

   
        <div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border-2 border-transparent bg-[#F8E7C9] px-4 py-3 text-[#261311] outline-none transition focus:border-[#261311]"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <p className="mt-1 text-sm text-red-700">
            {errors.email?.message}
          </p>
        </div>


        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border-2 border-transparent bg-[#F8E7C9] px-4 py-3 text-[#261311] outline-none transition focus:border-[#261311]"
            {...register("password", {
              required: "Password is required",
            })}
          />

          <p className="mt-1 text-sm text-red-700">
            {errors.password?.message}
          </p>
        </div>

   
        <button
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[#261311] py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#3A1D14] hover:shadow-xl"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>


        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full rounded-xl border-2 border-[#261311] py-3 font-semibold text-[#261311] transition-all duration-300 hover:bg-[#261311] hover:text-white"
        >
          Demo Login
        </button>

      </form>

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#261311]/20" />
        <span className="text-sm text-[#4D2E22]">
          OR
        </span>
        <div className="h-px flex-1 bg-[#261311]/20" />
      </div>

      <p className="text-center text-[#4D2E22]">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-[#261311] transition hover:underline"
        >
          Register
        </Link>
      </p>

    </div>

  </div>
);
}