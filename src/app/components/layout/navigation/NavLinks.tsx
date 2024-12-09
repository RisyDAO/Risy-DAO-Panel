import { ErrorBoundary } from "../../shared/ErrorBoundary";
import { StatusBadge } from "../../shared/StatusBadge";
import { NavLink } from "./NavLink";
import { type NavLinksProps } from "../../../types/navigation";

function NavLinksContent({ links }: NavLinksProps) {
  return (
    <div className="flex items-center space-x-4">
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          active={link.active}
        />
      ))}
    </div>
  );
}

export function NavLinks(props: NavLinksProps) {
  return (
    <ErrorBoundary
      fallback={
        <StatusBadge
          variant="error"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          }
        >
          <div>
            <h3 className="font-semibold text-inherit">Failed to load navigation links</h3>
            <p className="text-sm opacity-90">
              Please try refreshing the page
            </p>
          </div>
        </StatusBadge>
      }
    >
      <NavLinksContent {...props} />
    </ErrorBoundary>
  );
} 