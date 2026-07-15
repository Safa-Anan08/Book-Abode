"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);

      if (res.data.success) {
        toast.success("Registration successful!");

        router.push("/login");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Registration failed."
      );
    }
  };

   const { getCurrentUser } = useAuth();
  

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
          Create Account
        </h1>

        <p className="mt-2 text-[#4D2E22]">
          Join BookAbode and start your reading journey.
        </p>
      </div>
<div className="mt-4 flex w-full justify-center">

  <div
    className="
      flex w-full items-center justify-center
      rounded-xl
      border-2 border-[#261311]
      bg-[#F8E7C9]
      py-2
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
  >

    <GoogleLogin

      width="300"

      onSuccess={async (response) => {

        try {

          const res =
            await axiosInstance.post(
              "/auth/google",
              {
                credential:
                  response.credential,
              }
            );


          if (res.data.success) {

            await getCurrentUser();

            toast.success(
              "Google login successful!"
            );

            router.push("/");

          }


        } catch (error: any) {

          toast.error(
            error.response?.data?.message ||
            "Google login failed"
          );

        }

      }}


      onError={() => {

        toast.error(
          "Google login failed"
        );

      }}

    />

  </div>

</div>
<div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#261311]/20" />
        <span className="text-sm text-[#4D2E22]">
          OR
        </span>
        <div className="h-px flex-1 bg-[#261311]/20" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
  
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl border-2 border-transparent bg-[#F8E7C9] px-4 py-3 text-[#261311] outline-none transition focus:border-[#261311]"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters required",
              },
            })}
          />

          <p className="mt-1 text-sm text-red-700">
            {errors.name?.message}
          </p>
        </div>

  
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
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
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
          {isSubmitting
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

     

      <p className=" mt-5 text-center text-[#4D2E22]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-[#261311] transition hover:underline"
        >
          Login
        </Link>
      </p>

    </div>

  </div>
);
}