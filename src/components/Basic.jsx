


import { Skeleton } from "@heroui/react";

export function Basic() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-default-200 p-4 shadow-md space-y-4 bg-content1">
      <Skeleton className="h-48 w-full rounded-xl" />

      <div className="space-y-3">
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </div>

      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}