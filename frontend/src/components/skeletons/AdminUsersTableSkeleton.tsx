import { Skeleton } from "@/components/ui/skeleton";

export function AdminUsersTableSkeleton() {
  return (
    <div className="w-full space-y-4 mt-10 animate-in fade-in duration-500">
      {/* controls skeleton */}
      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-10 w-full max-w-sm rounded-md" />
        <Skeleton className="h-10 w-45 rounded-md" />
      </div>

      {/* table skeleton */}
      <div className="rounded-md border p-1">
        <div className="h-12 border-b flex items-center px-4 bg-muted/30">
          <Skeleton className="h-4 w-1/4 mr-4" />
          <Skeleton className="h-4 w-1/4 mr-4" />
          <Skeleton className="h-4 w-1/4 mr-4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 border-b flex items-center px-4 last:border-0"
          >
            <div className="w-1/4 mr-4">
              <Skeleton className="h-5 w-3/4" />
            </div>
            <div className="w-1/4 mr-4">
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="w-1/4 mr-4">
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="w-1/4 flex justify-between items-center">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
