import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const NewsSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border h-full flex flex-col">
      <Skeleton className="aspect-[16/9] w-full" />
      <div className="p-6 flex-1 flex flex-col">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex items-center justify-between mt-auto pt-4">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </Card>
  );
};
