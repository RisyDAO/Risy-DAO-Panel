import { ErrorBoundary } from "../../shared/ErrorBoundary";
import { LoadingState } from "../../shared/loading/LoadingState";
import { type BalanceDisplayProps } from "../../../types/balance";

function BalanceDisplayContent({ balance, isLoading }: BalanceDisplayProps) {
  return (
    <LoadingState 
      isLoading={isLoading}
      skeleton={{
        count: 2,
        height: '1rem'
      }}
    >
      <h3 className="text-2xl font-bold mb-2">
        {Number(balance).toLocaleString()} RISY
      </h3>
    </LoadingState>
  );
}

export function BalanceDisplay(props: BalanceDisplayProps) {
  return (
    <ErrorBoundary title="Failed to load balance display">
      <BalanceDisplayContent {...props} />
    </ErrorBoundary>
  );
} 