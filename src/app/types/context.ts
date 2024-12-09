import { type Dispatch, type SetStateAction, type ReactNode } from "react";
import { type Account } from "thirdweb/wallets";
import { type TransferResult } from "../contracts/types";

// Token Context Types
export interface TokenState {
  balance: string;
  timedTransferLimit: string;
  maxBalance: string;
  remainingHodlLimit: string;
  globalTransferLimit: readonly [bigint, bigint] | null;
  isBalanceLoading: boolean;
  isTransferLimitLoading: boolean;
  isMaxBalanceLoading: boolean;
  resetTime: string;
}

export interface TokenTransferState {
  recipient: string;
  amount: string;
  error: string | null;
  isSubmitting: boolean;
  recipientBalance: string;
  recipientRemainingHodl: number | string;
  isValidAddress: boolean;
  isRecipientLoading: boolean;
  isBurnAddress: boolean;
  isDAOAddress: boolean;
}

export interface TokenTransferHookResult {
  recipient: string;
  amount: string;
  error: string | null;
  isSubmitting: boolean;
  recipientBalance: string;
  recipientRemainingHodl: number;
  isValidAddress: boolean;
  isRecipientLoading: boolean;
  isBurnAddress: boolean;
  isDAOAddress: boolean;
  setRecipient: (value: string) => void;
  setAmount: (value: string) => void;
  handleTransfer: () => Promise<void>;
}

export interface TokenContextValue extends TokenState {
  transfer: {
    state: TokenTransferState;
    setRecipient: (value: string) => void;
    setAmount: (value: string) => void;
    handleTransfer: () => Promise<void>;
  };
}

// Wallet Context Types
export interface WalletState {
  account?: Account;
  isWhitelisted: boolean;
  isWhitelistLoading: boolean;
  walletAddress?: string;
}

export interface WalletContextValue extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

// Provider Props
export interface ProviderProps {
  children: ReactNode;
} 