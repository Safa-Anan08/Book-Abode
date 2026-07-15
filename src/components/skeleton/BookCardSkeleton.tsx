export default function BookCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#C3955B]/20 bg-[#261311] shadow-lg">

      <div className="h-64 w-full animate-pulse bg-[#3B241C]" />

      <div className="space-y-4 p-5">

        <div className="h-6 w-3/4 animate-pulse rounded bg-[#4A3127]" />

        <div className="h-4 w-1/2 animate-pulse rounded bg-[#4A3127]" />

        <div className="h-4 w-full animate-pulse rounded bg-[#4A3127]" />

        <div className="h-4 w-5/6 animate-pulse rounded bg-[#4A3127]" />

        <div className="flex justify-between">

          <div className="h-5 w-16 animate-pulse rounded bg-[#4A3127]" />

          <div className="h-5 w-12 animate-pulse rounded bg-[#4A3127]" />

        </div>

        <div className="h-11 w-full animate-pulse rounded-xl bg-[#C3955B]/30" />

      </div>
    </div>
  );
}