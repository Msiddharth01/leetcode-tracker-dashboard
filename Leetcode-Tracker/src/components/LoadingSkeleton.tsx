import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => (
  <div className="space-y-6 animate-slide-up">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="stat-card-gradient rounded-lg border border-border/50 p-5 space-y-3">
          <Skeleton className="h-3 w-20 bg-secondary" />
          <Skeleton className="h-7 w-16 bg-secondary" />
          <Skeleton className="h-3 w-24 bg-secondary" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="rounded-lg border border-border/50 bg-card p-6">
        <Skeleton className="h-48 w-full bg-secondary" />
      </div>
      <div className="rounded-lg border border-border/50 bg-card p-6">
        <Skeleton className="h-48 w-full bg-secondary" />
      </div>
    </div>
    <div className="rounded-lg border border-border/50 bg-card p-6">
      <Skeleton className="h-32 w-full bg-secondary" />
    </div>
  </div>
);

export default LoadingSkeleton;
