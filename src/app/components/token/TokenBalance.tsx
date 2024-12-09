import { Card } from "../shared/Card";
import { StatusBadge } from "../shared/StatusBadge";

interface TokenBalanceProps {
  balance: string;
  timedTransferLimit: string;
  maxBalance: string;
  remainingHodlLimit: string;
  globalTransferLimit: readonly [bigint, bigint] | null;
  isBalanceLoading: boolean;
  isTransferLimitLoading: boolean;
  isMaxBalanceLoading: boolean;
  isWhitelisted: boolean;
  resetTime: string;
  walletAddress?: string;
}

export function TokenBalance({
  balance,
  timedTransferLimit,
  maxBalance,
  remainingHodlLimit,
  globalTransferLimit,
  isBalanceLoading,
  isTransferLimitLoading,
  isMaxBalanceLoading,
  isWhitelisted,
  resetTime,
  walletAddress
}: TokenBalanceProps) {
  // Handle disconnected state
  if (!walletAddress) {
    return (
      <Card title="Token Balance">
        <div className="flex items-center justify-center min-h-[24rem]">
          <div className="text-center space-y-4">
            <div className="p-4 rounded-full bg-[#374151] bg-opacity-50 mx-auto w-fit">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  className="text-[#9CA3AF]"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-[#9CA3AF] font-medium">Connect your wallet</p>
              <p className="text-sm text-[#6B7280]">to view your balance and transfer tokens</p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Only show limits if not whitelisted
  const showLimits = !isWhitelisted;

  return (
    <Card title="Token Balance">
      <div className="space-y-6">
        {/* Balance Section */}
        <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
          <span className="text-[#9CA3AF] text-sm font-medium mb-2 block">
            Available Balance
          </span>
          {isBalanceLoading ? (
            <div className="h-8 w-32 animate-pulse bg-[#374151] rounded mt-2"></div>
          ) : (
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-white">
                {Number(balance).toFixed(2)}
              </span>
              <span className="text-sm text-[#9CA3AF]">RISY</span>
            </div>
          )}
        </div>

        {/* Only show limit sections if not whitelisted */}
        {showLimits && (
          <>
            {/* Timed Transfer Limit Section */}
            <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
              <div className="flex justify-between items-start mb-2">
                <span className="w-full text-[#9CA3AF] text-sm font-medium">
                  Remaining Transfer Limit
                </span>
                {!isTransferLimitLoading && globalTransferLimit && (
                  <span className="w-full text-right text-xs text-[#9CA3AF]">
                    {(Number(globalTransferLimit[1]) / 1e16).toFixed(0)}% per{' '}
                    {(Number(globalTransferLimit[0]) / 3600).toFixed(0)}h
                  </span>
                )}
              </div>
              {isTransferLimitLoading ? (
                <div className="h-7 w-28 animate-pulse bg-[#374151] rounded mt-2"></div>
              ) : (
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
              )}
            </div>

            {/* ICO HODL Limit Section */}
            <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
              <div className="flex justify-between items-start mb-2">
                <span className="w-full text-[#9CA3AF] text-sm font-medium">
                  ICO HODL Limit
                </span>
                <span className="w-full text-right text-xs text-[#9CA3AF]">
                  Max: {Number(maxBalance).toFixed(2)} RISY
                </span>
              </div>
              {isMaxBalanceLoading ? (
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
          </>
        )}
      </div>
    </Card>
  );
} 