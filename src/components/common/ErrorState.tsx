import Link from "next/link";

interface ErrorStateProps {
  title?: string;
  message?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again later.",
  buttonText = "Go Home",
  buttonLink = "/",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 text-7xl">⚠️</div>

      <h2 className="text-3xl font-bold">{title}</h2>

      <p className="mt-3 max-w-md text-gray-500">
        {message}
      </p>

      <Link
        href={buttonLink}
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        {buttonText}
      </Link>
    </div>
  );
}