import { ErrorBoundary } from "../ErrorBoundary";

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

function SkeletonContent({ 
  variant = 'rectangular',
  width,
  height,
  className = ''
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-surface-dark";
  
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-md"
  };

  const styles = {
    width: width,
    height: height
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={styles}
    />
  );
}

export function Skeleton(props: SkeletonProps) {
  return (
    <ErrorBoundary title="Failed to load skeleton">
      <SkeletonContent {...props} />
    </ErrorBoundary>
  );
} 