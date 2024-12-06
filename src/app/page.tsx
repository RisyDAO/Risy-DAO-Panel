"use client";

import Image from "next/image";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "./client";
import { useState } from "react";
import { wallets } from "./wallets";
import {
  ethereum,
  polygon,
  bsc,
  arbitrum,
  optimism,
  base,
  avalanche,
  fantom,
  cronos,
  
  polygonZkEvm,
  arbitrumNova,
  linea,
  scroll,
  mantaPacific,
  moonbeam,
  gnosis,
  celo,
  
  blast,
  xai,
  degen,
  loot,
  
  palm,
  rari,
  godWoken,
  astriaEvmDusknet,
} from "thirdweb/chains";
import { CONTRACTS, RISY_TOKEN_CONFIG } from "./constants";
import { createWallet } from "thirdweb/wallets";
import { useRisyToken } from "./hooks/useRisyToken";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111827] text-white">
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
            recommendedWallets={[
              createWallet("com.okex.wallet")
            ]}
            chains={[
              polygon,
              ethereum,
              bsc,
              arbitrum,
              optimism,
              base,
              avalanche,
              fantom,
              cronos,
              
              polygonZkEvm,
              arbitrumNova,
              linea,
              scroll,
              mantaPacific,
              moonbeam,
              gnosis,
              celo,
              
              blast,
              xai,
              degen,
              loot,
              
              palm,
              rari,
              godWoken,
              astriaEvmDusknet,
            ]}
            supportedTokens={{
              [polygon.id]: [
                {
                  address: CONTRACTS.RISY_TOKEN,
                  name: RISY_TOKEN_CONFIG.name,
                  symbol: RISY_TOKEN_CONFIG.symbol,
                  icon: RISY_TOKEN_CONFIG.icon,
                },
                {
                  address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
                  name: "Wrapped POL",
                  symbol: "WPOL",
                  icon: "https://assets.coingecko.com/coins/images/4713/small/matic___polygon.jpg",
                },
                {
                  address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
                  name: "USD Coin",
                  symbol: "USDC",
                  icon: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
                },
                {
                  address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                  name: "USD Coin (PoS)",
                  symbol: "USDC.e",
                  icon: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
                },
                {
                  address: "0x553d3D295e0f695B9228246232eDF400ed3560B5",
                  name: "PAX Gold",
                  symbol: "PAXG",
                  icon: "https://assets.coingecko.com/coins/images/9519/small/paxg.PNG",
                },
                {
                  address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
                  name: "Tether USD",
                  symbol: "USDT",
                  icon: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
                },
                {
                  address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
                  name: "Wrapped Ether",
                  symbol: "WETH",
                  icon: "https://assets.coingecko.com/coins/images/2518/small/weth.png",
                },
                {
                  address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
                  name: "Wrapped BTC",
                  symbol: "WBTC",
                  icon: "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
                },
                {
                  address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
                  name: "Dai Stablecoin",
                  symbol: "DAI",
                  icon: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png",
                }
              ],
            }}
            theme={darkTheme({
              colors: {
                // Core backgrounds
                modalBg: "#111827",
                modalOverlayBg: "rgba(17, 24, 39, 0.8)",
                borderColor: "#374151",
                separatorLine: "#374151",
                tertiaryBg: "#1F2937",
                skeletonBg: "#1F2937",

                // Text colors
                primaryText: "#FFFFFF",
                secondaryText: "#9CA3AF",
                accentText: "#818CF8",
                selectedTextColor: "#FFFFFF",
                selectedTextBg: "#374151",

                // Button styles with gradients
                primaryButtonBg: "linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)",
                primaryButtonText: "#FFFFFF",
                secondaryButtonBg: "#1F2937",
                secondaryButtonText: "#FFFFFF",
                secondaryButtonHoverBg: "linear-gradient(135deg, #374151, #1F2937)",
                accentButtonBg: "linear-gradient(135deg, #3730A3, #4F46E5, #2BB3A0)",
                accentButtonText: "#FFFFFF",

                // Connected state
                connectedButtonBg: "#1F2937",
                connectedButtonBgHover: "linear-gradient(135deg, #374151, #1F2937)",

                // Icons and interactions
                secondaryIconColor: "#9CA3AF",
                secondaryIconHoverColor: "#A5B4FC",
                secondaryIconHoverBg: "rgba(31, 41, 55, 0.5)",

                // Status colors
                danger: "#F87171",
                success: "#34D399",

                // UI elements
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

      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <DashboardGrid />
      </div>
    </main>
  );
}

function NavLink({ href, children, active = false }: { 
  href: string; 
  children: React.ReactNode;
  active?: boolean;
}) {
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

function DashboardHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#6366F1] via-[#3B82F6] to-[#2DD4BF] bg-clip-text text-transparent">
        Dashboard
      </h1>
      <div className="p-4 rounded-lg bg-[#1F2937] bg-opacity-50 border border-[#374151]">
        <p className="text-[#9CA3AF] leading-relaxed">
          Manage your wallet and Risy DAO (RISY) tokens. Track your time based transfer limit and remaining amount to the ICO maximum balance.
        </p>
      </div>
    </div>
  );
}

function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TokenBalance />
      <TransferPanel />
    </div>
  );
}

function TokenBalance() {
  const { 
    balance, 
    timedTransferLimit,
    maxBalance,
    remainingHodlLimit,
    globalTransferLimit,
    isBalanceLoading, 
    isTransferLimitLoading,
    isMaxBalanceLoading,
    walletAddress,
    resetTime,
  } = useRisyToken();

  // Handle disconnected state
  if (!walletAddress) {
    return (
      <div className="col-span-1 p-6 rounded-lg border border-[#374151] bg-[#1F2937] bg-opacity-50 transition-all duration-200 hover:bg-opacity-70">
        <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-[#6366F1] to-[#2DD4BF] bg-clip-text text-transparent">
          Token Balance
        </h2>
        <div className="flex items-center justify-center h-32 text-[#9CA3AF] text-sm">
          <div className="text-center space-y-3">
            <div className="p-3 rounded-full bg-[#374151] bg-opacity-50 mx-auto w-fit">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p>Connect your wallet to view balance</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-1 p-6 rounded-lg border border-[#374151] bg-[#1F2937] bg-opacity-50 transition-all duration-200 hover:bg-opacity-70 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-[#6366F1] to-[#2DD4BF] bg-clip-text text-transparent">
        Token Balance
      </h2>
      <div className="space-y-6">
        {/* Balance Section */}
        <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
          <span className="text-[#9CA3AF] text-sm font-medium mb-2 block">
            Available Balance
          </span>
          {isBalanceLoading ? (
            <div className="h-8 w-32 animate-pulse bg-[#374151] rounded mt-2"></div>
          ) : (
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-white">
                {Number(balance).toFixed(2)}
              </span>
              <span className="text-sm text-[#9CA3AF]">RISY</span>
            </div>
          )}
        </div>

        {/* Timed Transfer Limit Section */}
        <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
          <div className="flex justify-between items-start mb-2">
            <span className="w-full text-[#9CA3AF] text-sm font-medium">
              Remaining Transfer Limit
            </span>
            {!isTransferLimitLoading && globalTransferLimit && (
              <span className="w-full text-right text-xs text-[#9CA3AF]">
                {(Number(globalTransferLimit[1]) / 1e16).toFixed(0)}% per{' '}
                {(Number(globalTransferLimit[0]) / 3600).toFixed(0)}h
              </span>
            )}
          </div>
          {isTransferLimitLoading ? (
            <div className="h-7 w-28 animate-pulse bg-[#374151] rounded mt-2"></div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-semibold text-[#34D399]">
                  {Number(timedTransferLimit).toFixed(2)}
                </span>
                <span className="text-sm text-[#9CA3AF]">RISY</span>
              </div>
              {resetTime && (
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <span className="text-xs text-[#9CA3AF]">
                    Resets in {resetTime}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ICO HODL Limit Section */}
        <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
          <div className="flex justify-between items-start mb-2">
            <span className="w-full text-[#9CA3AF] text-sm font-medium">
              ICO HODL Limit
            </span>
            <span className="w-full text-right text-xs text-[#9CA3AF]">
              Max: {Number(maxBalance).toFixed(2)} RISY
            </span>
          </div>
          {isMaxBalanceLoading ? (
            <div className="h-7 w-28 animate-pulse bg-[#374151] rounded mt-2"></div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-semibold text-[#818CF8]">
                  {Number(remainingHodlLimit).toFixed(2)}
                </span>
                <span className="text-sm text-[#9CA3AF]">RISY remaining</span>
              </div>
              <div className="w-full bg-[#374151] rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#6366F1] to-[#2DD4BF] h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(100, (Number(balance) / Number(maxBalance)) * 100)}%` 
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TransferPanel() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement transfer logic
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <div className="col-span-1 p-6 rounded-lg border border-[#374151] bg-[#1F2937] bg-opacity-50 transition-all duration-200 hover:bg-opacity-70 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-[#6366F1] to-[#2DD4BF] bg-clip-text text-transparent">
        Transfer Tokens
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Recipient Input */}
          <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
            <label className="block text-sm text-[#9CA3AF] font-medium mb-2">
              Recipient Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-[#1F2937] border border-[#374151] rounded-md px-4 py-2.5 text-white placeholder-[#4B5563] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
                placeholder="0x..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => navigator.clipboard.readText().then(text => setRecipient(text))}
                  className="text-[#9CA3AF] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
            <label className="block text-sm text-[#9CA3AF] font-medium mb-2">
              Amount
            </label>
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#1F2937] border border-[#374151] rounded-md px-4 py-2.5 text-white placeholder-[#4B5563] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
                placeholder="0.0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-[#9CA3AF]">RISY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !amount || !recipient}
          className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-200 
            ${isSubmitting || !amount || !recipient
              ? 'bg-[#374151] text-[#9CA3AF] cursor-not-allowed'
              : 'bg-gradient-to-r from-[#6366F1] via-[#3B82F6] to-[#2DD4BF] text-white hover:shadow-lg hover:opacity-90'
            }
          `}
        >
          <div className="flex items-center justify-center space-x-2">
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Transfer</span>
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  );
}