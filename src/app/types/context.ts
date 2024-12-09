import { type ReactNode } from "react";
import { type Account } from "thirdweb/wallets";
import { type TokenConfig } from "./token";

// Wallet Context Types
export interface WalletContextValue {
  account?: Account;
  walletAddress?: string;
  isWhitelisted: boolean;
  isWhitelistLoading: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

// Token Context Types
export interface TokenState {
  config: TokenConfig;
  totalSupply: string;
  decimals: number;
  balance: string;
  timedTransferLimit: string;
  maxBalance: string;
  remainingHodlLimit: string;
  globalTransferLimit: readonly [bigint, bigint] | null;
  resetTime: string;
  isTokenLoading: boolean;
  isBalanceLoading: boolean;
  isTransferLimitLoading: boolean;
  isMaxBalanceLoading: boolean;
}

export interface TokenTransferState {
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
}

export interface TokenTransferHookResult extends TokenTransferState {
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

// Provider Props
export interface ProviderProps {
  children: ReactNode;
} 