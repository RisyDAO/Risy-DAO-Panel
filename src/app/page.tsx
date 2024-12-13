"use client";

import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { Layout } from "./components/layout/Layout";
import { TokenBalance } from "./components/token/TokenBalance";
import { TransferPanel } from "./components/token/TransferPanel";
import { StatusBadge } from "./components/shared/StatusBadge";
import { LoadingState } from "./components/shared/loading/LoadingState";
import { useToken } from "./contexts/TokenContext";
import { useWallet } from "./contexts/WalletContext";

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

function WhitelistBanner() {
  const { isWhitelisted, isWhitelistLoading } = useWallet();
  const { walletAddress } = useWallet();

  if (!walletAddress) return null;

  return (
      isWhitelisted && (
        <div className="mb-8">
          <StatusBadge
            variant="success"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
          >
            <div>
              <h3 className="font-semibold text-inherit">Whitelisted Account</h3>
              <p className="text-sm opacity-90">
                Your account is whitelisted. You are exempt from transfer limits and HODL restrictions.
              </p>
            </div>
          </StatusBadge>
        </div>
      )
  );
}

function DashboardContent() {
  const { isTokenLoading } = useToken();

  return (
    <LoadingState
      isLoading={isTokenLoading}
      skeleton={{
        count: 3,
        height: '24rem'
      }}
      direction="a"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TokenBalance />
        <TransferPanel />
      </div>
    </LoadingState>
  );
}

function PageContent() {
  return (
    <Layout>
      <DashboardHeader />
      <WhitelistBanner />
      <DashboardContent />
    </Layout>
  );
}

export default function Home() {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen bg-[#111827] text-white p-4">
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
              <h3 className="font-semibold text-inherit">Failed to load application</h3>
              <p className="text-sm opacity-90">
                Please try refreshing the page
              </p>
            </div>
          </StatusBadge>
        </div>
      }
    >
      <PageContent />
    </ErrorBoundary>
  );
}