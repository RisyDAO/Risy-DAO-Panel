import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Card } from "../shared/Card";
import { LoadingState } from "../shared/loading/LoadingState";
import { BalanceDisplay } from "./balance/BalanceDisplay";
import { TransferLimitDisplay } from "./balance/TransferLimitDisplay";
import { HodlLimitDisplay } from "./balance/HodlLimitDisplay";
import { DisconnectedState } from "../shared/DisconnectedState";
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
    return <DisconnectedState message="Connect your wallet" description="to view your balance" />;
  }

  const showLimits = !isWhitelisted;

  return (
    <LoadingState 
      isLoading={isBalanceLoading || isTransferLimitLoading || isMaxBalanceLoading}
      skeleton={{
        count: showLimits ? 3 : 1,
        height: '5.5rem'
      }}
    >
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
    </LoadingState>
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