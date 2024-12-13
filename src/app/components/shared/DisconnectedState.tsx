import { ErrorBoundary } from "./ErrorBoundary";
import { LoadingState } from "./loading/LoadingState";

interface DisconnectedStateProps {
  message: string;
  description?: string;
  isLoading?: boolean;
}

function DisconnectedStateContent({ message, description, isLoading = false }: DisconnectedStateProps) {
  return (
    <LoadingState
      isLoading={isLoading}
      skeleton={{
        count: 1,
        height: '24rem'
      }}
    >
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
            <p className="text-sm text-[#6B7280]">{description}</p>
          </div>
        </div>
      </div>
    </LoadingState>
  );
}

export function DisconnectedState(props: DisconnectedStateProps) {
  return (
    <ErrorBoundary title="Failed to load wallet state">
      <DisconnectedStateContent {...props} />
    </ErrorBoundary>
  );
} 