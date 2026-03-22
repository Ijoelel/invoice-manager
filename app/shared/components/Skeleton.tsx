type SkeletonProps = {
    className?: string;
};

type SkeletonTableProps = {
    rows?: number;
    className?: string;
};

export const Skeleton = ({ className }: SkeletonProps) => {
    return (
        <div
            className={`relative overflow-hidden bg-surface-container-low rounded-md ${className}`}
        >
            <div className="absolute inset-0 animate-pulse" />
        </div>
    );
};

export const SkeletonTable = ({ rows = 5, className }: SkeletonTableProps) => {
    return (
        <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
            {/* header */}
            <div className="flex justify-between mb-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
            </div>

            {/* rows */}
            <div className="space-y-3">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                ))}
            </div>
        </div>
    );
};
