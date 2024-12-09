export interface TokenBalanceProps {
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

export interface BalanceDisplayProps {
  balance: string;
  isLoading: boolean;
}

export interface TransferLimitDisplayProps {
  timedTransferLimit: string;
  globalTransferLimit: readonly [bigint, bigint] | null;
  isLoading: boolean;
  resetTime: string;
}

export interface HodlLimitDisplayProps {
  balance: string;
  maxBalance: string;
  remainingHodlLimit: string;
  isLoading: boolean;
}

export interface DisconnectedStateProps {
  message?: string;
} 