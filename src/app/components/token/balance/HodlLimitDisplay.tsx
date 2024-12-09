import { ErrorBoundary } from "../../shared/ErrorBoundary";
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
    <ErrorBoundary title="Failed to load HODL limit display">
      <HodlLimitDisplayContent {...props} />
    </ErrorBoundary>
  );
} 