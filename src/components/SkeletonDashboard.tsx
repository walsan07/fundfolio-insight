
import { Card } from '@/components/ui/card';

const SkeletonDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Upload Section Skeleton */}
      <Card className="w-full overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-6 w-6 skeleton rounded-full"></div>
            <div className="h-8 w-48 skeleton rounded"></div>
          </div>
          <div className="h-6 w-3/4 skeleton rounded mb-5"></div>
          <div className="h-10 w-32 skeleton rounded"></div>
        </div>
      </Card>

      {/* Investment Summary Skeleton */}
      <Card className="overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-8 w-48 skeleton rounded"></div>
            <div className="h-5 w-5 skeleton rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <div className="h-5 w-32 skeleton rounded mb-2"></div>
                <div className="h-8 w-40 skeleton rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Gains Summary Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-8 w-48 skeleton rounded"></div>
                <div className="h-5 w-5 skeleton rounded-full"></div>
              </div>
              <div className="space-y-6">
                {[...Array(3)].map((_, j) => (
                  <div key={j}>
                    <div className="h-5 w-32 skeleton rounded mb-2"></div>
                    <div className="h-8 w-40 skeleton rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tax Summary Skeleton */}
      <Card className="overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-8 w-48 skeleton rounded"></div>
            <div className="h-5 w-5 skeleton rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j}>
                    <div className="h-5 w-32 skeleton rounded mb-2"></div>
                    <div className="h-8 w-40 skeleton rounded"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <div className="h-10 w-36 skeleton rounded"></div>
          </div>
        </div>
      </Card>

      {/* Funds List Skeleton */}
      <div className="space-y-6">
        <div className="h-8 w-48 skeleton rounded"></div>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="h-7 w-48 skeleton rounded"></div>
              <div className="h-8 w-8 skeleton rounded-full"></div>
            </div>
            <div className="p-4 space-y-4">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="p-5 rounded-xl border border-border/30">
                  <div className="flex justify-between mb-3">
                    <div>
                      <div className="h-6 w-48 skeleton rounded mb-2"></div>
                      <div className="h-4 w-32 skeleton rounded"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-6 w-32 skeleton rounded mb-2"></div>
                      <div className="h-4 w-24 skeleton rounded"></div>
                    </div>
                  </div>
                  <div className="h-5 w-24 skeleton rounded"></div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkeletonDashboard;
