import { ErrorBoundary } from "../../shared/ErrorBoundary";
import { StatusBadge } from "../../shared/StatusBadge";
import { type HodlLimitDisplayProps } from "../../../types/balance";

function HodlLimitDisplayContent({
  balance,
  maxBalance,
  remainingHodlLimit,
  isLoading
}: HodlLimitDisplayProps) {
  return (
    <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
      <div className="flex justify-between items-start mb-2">
        <span className="w-full text-[#9CA3AF] text-sm font-medium">
          ICO HODL Limit
        </span>
        <span className="w-full text-right text-xs text-[#9CA3AF]">
          Max: {Number(maxBalance).toFixed(2)} RISY
        </span>
      </div>
      {isLoading ? (
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
  );
}

export function HodlLimitDisplay(props: HodlLimitDisplayProps) {
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
              <h3 className="font-semibold text-inherit">Failed to load HODL limit</h3>
              <p className="text-sm opacity-90">
                Please try refreshing the page
              </p>
            </div>
          </StatusBadge>
        }
      >
        <HodlLimitDisplayContent {...props} />
      </ErrorBoundary>
    );
  } 