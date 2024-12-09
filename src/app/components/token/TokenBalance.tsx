import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Card } from "../shared/Card";
import { BalanceDisplay } from "./balance/BalanceDisplay";
import { TransferLimitDisplay } from "./balance/TransferLimitDisplay";
import { HodlLimitDisplay } from "./balance/HodlLimitDisplay";
import { DisconnectedState } from "./balance/DisconnectedState";
import { useToken } from "../../contexts/TokenContext";
import { useWallet } from "../../contexts/WalletContext";

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
      <ErrorBoundary title="Failed to load balance information">
        <TokenBalanceContent />
      </ErrorBoundary>
    </Card>
  );
} 