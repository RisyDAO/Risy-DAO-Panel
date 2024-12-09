import { ErrorBoundary } from "../shared/ErrorBoundary";
import { StatusBadge } from "../shared/StatusBadge";
import { Logo } from "./navigation/Logo";
import { NavLinks } from "./navigation/NavLinks";
import { WalletConnect } from "./navigation/WalletConnect";
import { type NavigationProps } from "../../types/navigation";

function NavigationContent() {
  const links = [
    { href: "#dashboard", label: "Dashboard", active: true }
  ];

  return (
    <nav className="border-b border-[#374151] bg-[#1F2937]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Logo
            src="./img/logo.png"
            alt="Risy DAO"
          />
          <NavLinks links={links} />
        </div>
        
        <WalletConnect />
      </div>
    </nav>
  );
}

export function Navigation() {
  return (
    <ErrorBoundary
      fallback={
        <div className="border-b border-[#374151] bg-[#1F2937] p-4">
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
              <h3 className="font-semibold text-inherit">Failed to load navigation</h3>
              <p className="text-sm opacity-90">
                Please try refreshing the page
              </p>
            </div>
          </StatusBadge>
        </div>
      }
    >
      <NavigationContent />
    </ErrorBoundary>
  );
} 