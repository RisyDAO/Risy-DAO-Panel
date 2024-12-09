import { ErrorBoundary } from "../ErrorBoundary";
import { LoadingSpinner } from "./LoadingSpinner";
import { Skeleton } from "./Skeleton";

interface LoadingStateProps {
  variant?: 'spinner' | 'skeleton';
  isLoading: boolean;
  skeleton?: {
    count?: number;
    height?: string | number;
    width?: string | number;
  };
  children: React.ReactNode;
}

function LoadingStateContent({
  variant = 'skeleton',
  isLoading,
  skeleton = { count: 1, height: '2rem' },
  children
}: LoadingStateProps) {
  if (!isLoading) return <>{children}</>;

  if (variant === 'spinner') {
    return (
      <div className="flex justify-center items-center p-4">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: skeleton.count || 1 }).map((_, index) => (
        <Skeleton
          key={index}
          height={skeleton.height}
          width={skeleton.width}
          className="w-full"
        />
      ))}
    </div>
  );
}

export function LoadingState(props: LoadingStateProps) {
  return (
    <ErrorBoundary title="Failed to load content">
      <LoadingStateContent {...props} />
    </ErrorBoundary>
  );
} 