import { ErrorBoundary } from "../ErrorBoundary";
import { type BadgeContentProps } from "../../../types/shared";

function BadgeContentInner({ icon, children }: BadgeContentProps) {
  return (
    <div className="flex items-start space-x-3">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <div className="flex-grow min-w-0">
        {children}
      </div>
    </div>
  );
}

export function BadgeContent(props: BadgeContentProps) {
  return (
    <ErrorBoundary title="Failed to load badge content">
      <BadgeContentInner {...props} />
    </ErrorBoundary>
  );
} 