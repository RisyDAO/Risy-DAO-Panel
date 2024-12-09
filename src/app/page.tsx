"use client";

import { Layout } from "./components/layout/Layout";
import { TokenBalance } from "./components/token/TokenBalance";
import { TransferPanel } from "./components/token/TransferPanel";
import { useRisyToken } from "./hooks/token/useRisyToken";
import { StatusBadge } from "./components/shared/StatusBadge";

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

function WhitelistBanner({ isWhitelisted, isWhitelistLoading, walletAddress }: { 
  isWhitelisted: boolean;
  isWhitelistLoading: boolean;
  walletAddress?: string;
}) {
  if (!walletAddress || isWhitelistLoading || !isWhitelisted) return null;

  return (
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
  );
}

function DashboardGrid() {
  const {
    balance,
    timedTransferLimit,
    maxBalance,
    remainingHodlLimit,
    globalTransferLimit,
    isBalanceLoading,
    isTransferLimitLoading,
    isMaxBalanceLoading,
    isWhitelisted,
    isWhitelistLoading,
    resetTime,
    walletAddress,
    transfer
  } = useRisyToken();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TokenBalance
        balance={balance}
        timedTransferLimit={timedTransferLimit}
        maxBalance={maxBalance}
        remainingHodlLimit={remainingHodlLimit}
        globalTransferLimit={globalTransferLimit}
        isBalanceLoading={isBalanceLoading}
        isTransferLimitLoading={isTransferLimitLoading}
        isMaxBalanceLoading={isMaxBalanceLoading}
        isWhitelisted={isWhitelisted || false}
        resetTime={resetTime}
        walletAddress={walletAddress}
      />
      <TransferPanel
        recipient={transfer.recipient}
        setRecipient={transfer.setRecipient}
        amount={transfer.amount}
        setAmount={transfer.setAmount}
        error={transfer.error}
        isSubmitting={transfer.isSubmitting}
        handleTransfer={transfer.handleTransfer}
        recipientBalance={transfer.recipientBalance}
        recipientRemainingHodl={Number(transfer.recipientRemainingHodl)}
        isValidAddress={transfer.isValidAddress}
        isRecipientLoading={transfer.isRecipientLoading}
        isBurnAddress={transfer.isBurnAddress}
        isDAOAddress={transfer.isDAOAddress}
        walletAddress={walletAddress}
      />
    </div>
  );
}

export default function Home() {
  const { isWhitelisted, isWhitelistLoading, walletAddress } = useRisyToken();

  return (
    <Layout>
      <DashboardHeader />
      <WhitelistBanner 
        isWhitelisted={isWhitelisted || false}
        isWhitelistLoading={isWhitelistLoading}
        walletAddress={walletAddress}
      />
      <DashboardGrid />
    </Layout>
  );
}