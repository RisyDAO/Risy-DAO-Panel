import { StatusBadge } from "../shared/StatusBadge";
import { type TransferNoticeProps } from "../../types/transfer";

export function TransferNotice({ isBurnAddress, isDAOAddress }: TransferNoticeProps) {
  if (!isBurnAddress && !isDAOAddress) return null;

  const icon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
  );

  if (isBurnAddress) {
    return (
      <StatusBadge variant="info" icon={icon}>
        Sending tokens to the null address (0x0) will burn them permanently. This action cannot be undone.
      </StatusBadge>
    );
  }

  return (
    <StatusBadge variant="info" icon={icon}>
      Transferring to the DAO address. This transfer is exempt from time-based transfer limits.
    </StatusBadge>
  );
} 