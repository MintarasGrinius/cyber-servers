// src/pages/ServersPage.tsx
import { Skeleton } from "@/components/ui/Skeleton";

const ServersTableSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex md:flex-nowrap flex-wrap items-center gap-4">
        <Skeleton className="flex-1 min-w-[300px] h-9" />
        <Skeleton className="flex-1 min-w-[300px] h-9" />
      </div>
      <Skeleton className="w-full flex-1" />
    </div>
  );
};

export default ServersTableSkeleton;
