import { ErrorBoundary } from "../../shared/ErrorBoundary";
import { LoadingState } from "../../shared/loading/LoadingState";
import { type TransferLimitDisplayProps } from "../../../types/balance";

function TransferLimitDisplayContent({
  timedTransferLimit,
  globalTransferLimit,
  isLoading,
  resetTime
}: TransferLimitDisplayProps) {
  return (
    <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
      <div className="flex justify-between items-start mb-2">
        <span className="w-full text-[#9CA3AF] text-sm font-medium">
          Remaining Transfer Limit
        </span>
        {!isLoading && globalTransferLimit && (
          <span className="w-full text-right text-xs text-[#9CA3AF]">
            {(Number(globalTransferLimit[1]) / 1e16).toFixed(0)}% per{' '}
            {(Number(globalTransferLimit[0]) / 3600).toFixed(0)}h
          </span>
        )}
      </div>
      <LoadingState 
        isLoading={isLoading}
        skeleton={{
          count: 2,
          height: '1.5rem'
        }}
      >
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-semibold text-[#34D399]">
              {Number(timedTransferLimit).toFixed(2)}
            </span>
            <span className="text-sm text-[#9CA3AF]">RISY</span>
          </div>
          {resetTime && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span className="text-xs text-[#9CA3AF]">
                Resets in {resetTime}
              </span>
            </div>
          )}
        </div>
      </LoadingState>
    </div>
  );
}

export function TransferLimitDisplay(props: TransferLimitDisplayProps) {
  return (
    <ErrorBoundary title="Failed to load transfer limit display">
      <TransferLimitDisplayContent {...props} />
    </ErrorBoundary>
  );
} 