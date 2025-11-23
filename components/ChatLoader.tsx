import { Skeleton } from "@/components/ui/skeleton";

export function ChatLoader() {
  return (
    <div className="flex-1 p-4 space-y-6 max-w-4xl mx-auto w-full">
      {/* User Message Skeleton */}
      <div className="flex justify-end">
        <div className="flex flex-col items-end gap-1 max-w-[80%]">
          <Skeleton className="h-[52px] w-[200px] rounded-lg" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>

      {/* AI Message Skeleton */}
      <div className="flex justify-start">
        <div className="flex flex-col items-start gap-1 max-w-[80%] w-full md:w-[600px]">
          <div className="rounded-lg border p-4 w-full space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
      </div>

      {/* User Message Skeleton */}
      <div className="flex justify-end">
        <div className="flex flex-col items-end gap-1 max-w-[80%]">
          <Skeleton className="h-[40px] w-[150px] rounded-lg" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>

      {/* AI Message Skeleton */}
      <div className="flex justify-start">
        <div className="flex flex-col items-start gap-1 max-w-[80%] w-full md:w-[600px]">
          <div className="rounded-lg border p-4 w-full space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}
