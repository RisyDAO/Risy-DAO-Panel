import { ErrorBoundary } from "../../shared/ErrorBoundary";
import { StatusBadge } from "../../shared/StatusBadge";

function DisconnectedStateContent({ message }: { message: string }) {
  return (
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
          <p className="text-[#9CA3AF] font-medium">{message}</p>
          <p className="text-sm text-[#6B7280]">to view your balance and transfer tokens</p>
        </div>
      </div>
    </div>
  );
}

export function DisconnectedState({ message }: { message: string }) {
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
            <h3 className="font-semibold text-inherit">Failed to load wallet state</h3>
            <p className="text-sm opacity-90">
              Please try refreshing the page
            </p>
          </div>
        </StatusBadge>
      }
    >
      <DisconnectedStateContent message={message} />
    </ErrorBoundary>
  );
} 