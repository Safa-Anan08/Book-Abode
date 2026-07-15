import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-20 text-center">

      <div className="mb-6 text-7xl">
        📚
      </div>

      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        {description}
      </p>

      {buttonText && buttonLink && (
        <Link
          href={buttonLink}
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          {buttonText}
        </Link>
      )}

    </div>
  );
}