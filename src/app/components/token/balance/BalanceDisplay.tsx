import { ErrorBoundary } from "../../shared/ErrorBoundary";
import { type BalanceDisplayProps } from "../../../types/balance";

function BalanceDisplayContent({ balance, isLoading }: BalanceDisplayProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-7 w-32 bg-gray-700 rounded mb-2"></div>
        <div className="h-5 w-24 bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <h3 className="text-2xl font-bold mb-2">
      {Number(balance).toLocaleString()} RISY
    </h3>
  );
}

export function BalanceDisplay(props: BalanceDisplayProps) {
  return (
    <ErrorBoundary title="Failed to load balance display">
      <BalanceDisplayContent {...props} />
    </ErrorBoundary>
  );
} 