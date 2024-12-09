import { ErrorBoundary } from "../../shared/ErrorBoundary";
import { StatusBadge } from "../../shared/StatusBadge";
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
    <div>
      <h3 className="text-2xl font-bold mb-2">
        {Number(balance).toLocaleString()} RISY
      </h3>
      <p className="text-[#9CA3AF]">Current Balance</p>
    </div>
  );
}

export function BalanceDisplay(props: BalanceDisplayProps) {
  return (
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
      <BalanceDisplayContent {...props} />
    </ErrorBoundary>
  );
} 