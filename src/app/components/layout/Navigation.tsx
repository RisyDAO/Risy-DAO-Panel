import Image from "next/image";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "../../client";
import { wallets } from "../../wallets";
import { RISY_TOKEN_CONFIG } from "../../config/tokens";
import { CONTRACTS } from "../../config/contracts";
import { supportedChains } from "../../config/chains";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

function NavLink({ href, children, active = false }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`text-sm font-medium ${
        active 
          ? "text-white" 
          : "text-[#9CA3AF] hover:text-white transition-colors"
      }`}
    >
      {children}
    </a>
  );
}

export function Navigation() {
  return (
    <nav className="border-b border-[#374151] bg-[#1F2937]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Image
            src="./img/logo.png"
            alt="Risy DAO"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="hidden md:flex space-x-4">
            <NavLink href="#dashboard" active>Dashboard</NavLink>
          </div>
        </div>
        
        <ConnectButton
          client={client}
          wallets={wallets}
          chains={supportedChains}
          supportedTokens={{
            [supportedChains[0].id]: [
              {
                address: CONTRACTS.RISY_TOKEN,
                name: RISY_TOKEN_CONFIG.name,
                symbol: RISY_TOKEN_CONFIG.symbol,
                icon: RISY_TOKEN_CONFIG.icon,
              }
            ],
          }}
          theme={darkTheme({
            colors: {
              modalBg: "#111827",
              modalOverlayBg: "rgba(17, 24, 39, 0.8)",
              borderColor: "#374151",
              separatorLine: "#374151",
              tertiaryBg: "#1F2937",
              skeletonBg: "#1F2937",

              primaryText: "#FFFFFF",
              secondaryText: "#9CA3AF",
              accentText: "#818CF8",
              selectedTextColor: "#FFFFFF",
              selectedTextBg: "#374151",

              primaryButtonBg: "linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)",
              primaryButtonText: "#FFFFFF",
              secondaryButtonBg: "#1F2937",
              secondaryButtonText: "#FFFFFF",
              secondaryButtonHoverBg: "linear-gradient(135deg, #374151, #1F2937)",
              accentButtonBg: "linear-gradient(135deg, #3730A3, #4F46E5, #2BB3A0)",
              accentButtonText: "#FFFFFF",

              connectedButtonBg: "#1F2937",
              connectedButtonBgHover: "linear-gradient(135deg, #374151, #1F2937)",

              secondaryIconColor: "#9CA3AF",
              secondaryIconHoverColor: "#A5B4FC",
              secondaryIconHoverBg: "rgba(31, 41, 55, 0.5)",

              danger: "#F87171",
              success: "#34D399",

              tooltipBg: "#1F2937",
              tooltipText: "#FFFFFF",
              inputAutofillBg: "#111827",
              scrollbarBg: "#1F2937",
            },
            fontFamily: "'Poppins Bold', sans-serif"
          })}
          connectModal={{
            size: "compact",
            title: "Sign in to Risy DAO Panel",
            titleIcon: "./img/logo.png",
            showThirdwebBranding: false,
          }}
          appMetadata={{
            name: "Risy DAO Panel",
            description: "Risy DAO Management Panel",
            logoUrl: "./img/logo.png",
            url: typeof window !== "undefined" ? window.location.origin : "",
          }}
        />
      </div>
    </nav>
  );
} 