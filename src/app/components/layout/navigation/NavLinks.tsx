import { ErrorBoundary } from "../../shared/ErrorBoundary";
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
    <ErrorBoundary title="Failed to load navigation links">
      <NavLinksContent {...props} />
    </ErrorBoundary>
  );
} 