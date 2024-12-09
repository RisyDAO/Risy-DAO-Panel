import { ErrorBoundary } from "./ErrorBoundary";
import { BadgeContent } from "./badge/BadgeContent";
import { getBadgeStyles } from "./badge/BadgeStyles";
import { type StatusBadgeProps } from "../../types/shared";

function StatusBadgeContent({ 
  variant = 'info',
  icon,
  children 
}: StatusBadgeProps) {
  return (
    <div className={`p-3 rounded-md border border-opacity-50 ${getBadgeStyles(variant)}`}>
      <BadgeContent icon={icon}>
        {children}
      </BadgeContent>
    </div>
  );
}

export function StatusBadge(props: StatusBadgeProps) {
  return (
    <ErrorBoundary title="Failed to load status badge">
      <StatusBadgeContent {...props} />
    </ErrorBoundary>
  );
} 