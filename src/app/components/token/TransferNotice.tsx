import { ErrorBoundary } from "../shared/ErrorBoundary";
import { StatusBadge } from "../shared/StatusBadge";
import { LoadingState } from "../shared/loading/LoadingState";
import { useToken } from "../../contexts/TokenContext";

function TransferNoticeContent() {
  const { transfer: { state } } = useToken();
  const { isBurnAddress, isDAOAddress, isRecipientLoading } = state;

  if (!isBurnAddress && !isDAOAddress) return null;

  const icon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
  );

  return (
    <LoadingState
      isLoading={isRecipientLoading}
      skeleton={{
        count: 1,
        height: '5rem'
      }}
    >
      {isBurnAddress ? (
        <StatusBadge variant="warning" icon={icon}>
          <div>
            <h3 className="font-semibold text-inherit">Token Burn Notice</h3>
            <p className="text-sm opacity-90">
              Sending tokens to the null address (0x0) will burn them permanently. This action cannot be undone.
            </p>
          </div>
        </StatusBadge>
      ) : (
        <StatusBadge variant="info" icon={icon}>
          <div>
            <h3 className="font-semibold text-inherit">DAO Transfer Notice</h3>
            <p className="text-sm opacity-90">
              Transferring to the DAO address. This transfer is exempt from time-based transfer limits.
            </p>
          </div>
        </StatusBadge>
      )}
    </LoadingState>
  );
}

export function TransferNotice() {
  return (
    <ErrorBoundary title="Failed to load transfer notice">
      <TransferNoticeContent />
    </ErrorBoundary>
  );
} 