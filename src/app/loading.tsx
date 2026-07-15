export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">

      <div className="flex flex-col items-center gap-5">

        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

        <h2 className="text-xl font-semibold">
          Loading...
        </h2>

      </div>

    </div>
  );
}