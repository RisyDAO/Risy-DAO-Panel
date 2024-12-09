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
    <ErrorBoundary
      fallback={
        <div className="p-3 rounded-md border border-opacity-50 bg-red-900 bg-opacity-20 border-red-500 text-red-400">
          <BadgeContent
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            }
          >
            <div>
              <h3 className="font-semibold text-inherit">Failed to load status badge</h3>
              <p className="text-sm opacity-90">
                Please try refreshing the page
              </p>
            </div>
          </BadgeContent>
        </div>
      }
    >
      <StatusBadgeContent {...props} />
    </ErrorBoundary>
  );
} 