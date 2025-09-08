import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonAccordian() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-primary/10 p-3 sm:p-4 m-2 sm:m-4 border border-primary/20">
      {/* Left: Image Skeleton */}
      <Skeleton className="w-full sm:w-1/3 h-40 sm:h-56 rounded-xl" />

      {/* Right: Info Skeletons */}
      <div className="flex flex-col justify-between w-full sm:w-2/3 gap-2 sm:gap-3">
        <div>
          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-5 w-full sm:w-3/4" />
        </div>

        <Skeleton className="h-4 w-1/2 mt-4" />
      </div>
    </div>
  )
}