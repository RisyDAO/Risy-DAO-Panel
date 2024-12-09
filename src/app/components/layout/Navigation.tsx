import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Logo } from "./navigation/Logo";
import { NavLinks } from "./navigation/NavLinks";
import { WalletConnect } from "./navigation/WalletConnect";

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
    <ErrorBoundary title="Failed to load navigation">
      <NavigationContent />
    </ErrorBoundary>
  );
} 