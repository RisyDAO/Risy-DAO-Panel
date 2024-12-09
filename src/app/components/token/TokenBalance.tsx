import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Card } from "../shared/Card";
import { BalanceDisplay } from "./balance/BalanceDisplay";
import { TransferLimitDisplay } from "./balance/TransferLimitDisplay";
import { HodlLimitDisplay } from "./balance/HodlLimitDisplay";
import { DisconnectedState } from "./balance/DisconnectedState";
import { useToken } from "../../contexts/TokenContext";
import { useWallet } from "../../contexts/WalletContext";
import { StatusBadge } from "../shared/StatusBadge";

function TokenBalanceContent() {
  const {
    balance,
    timedTransferLimit,
    maxBalance,
    remainingHodlLimit,
    globalTransferLimit,
    isBalanceLoading,
    isTransferLimitLoading,
    isMaxBalanceLoading,
    resetTime,
  } = useToken();

  const { walletAddress, isWhitelisted } = useWallet();

  if (!walletAddress) {
    return <DisconnectedState message="Connect your wallet" />;
  }

  const showLimits = !isWhitelisted;

  return (
    <div className="space-y-6">
      <BalanceDisplay 
        balance={balance} 
        isLoading={isBalanceLoading} 
      />

      {showLimits && (
        <>
          <TransferLimitDisplay
            timedTransferLimit={timedTransferLimit}
            globalTransferLimit={globalTransferLimit}
            isLoading={isTransferLimitLoading}
            resetTime={resetTime}
          />

          <HodlLimitDisplay
            balance={balance}
            maxBalance={maxBalance}
            remainingHodlLimit={remainingHodlLimit}
            isLoading={isMaxBalanceLoading}
          />
        </>
      )}
    </div>
  );
}

export function TokenBalance() {
  return (
    <Card title="Token Balance">
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
              <h3 className="font-semibold text-inherit">Failed to load balance</h3>
              <p className="text-sm opacity-90">
                Please try refreshing the page
              </p>
            </div>
          </StatusBadge>
        }
      >
        <TokenBalanceContent />
      </ErrorBoundary>
    </Card>
  );
} 