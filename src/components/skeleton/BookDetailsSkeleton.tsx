export default function BookDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">

        <div className="h-[500px] animate-pulse rounded-xl bg-gray-200" />

        <div className="space-y-5">

          <div className="h-8 w-1/3 animate-pulse rounded bg-gray-200" />

          <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />

          <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />

          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />

          <div className="space-y-3">
            <div className="h-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
          </div>

        </div>

      </div>
    </div>
  );
}