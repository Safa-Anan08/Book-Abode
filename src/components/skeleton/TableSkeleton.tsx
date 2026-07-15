interface TableSkeletonProps {
  rows?: number;
}

export default function TableSkeleton({
  rows = 5,
}: TableSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full">
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">
                <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
              </td>

              <td className="p-4">
                <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
              </td>

              <td className="p-4">
                <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
              </td>

              <td className="p-4">
                <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}