"use client";

import { createContext, useContext, useCallback } from "react";
import { useTokenBalance } from "../hooks/token/useTokenBalance";
import { useTokenLimits } from "../hooks/token/useTokenLimits";
import { useTokenTransfer } from "../hooks/token/useTokenTransfer";
import { useRisyToken } from "../hooks/token/useRisyToken";
import { type TokenContextValue, type ProviderProps } from "../types/context";
import { useWallet } from "./WalletContext";

const TokenContext = createContext<TokenContextValue | undefined>(undefined);

export function TokenProvider({ children }: ProviderProps) {
  const { walletAddress, isWhitelisted } = useWallet();

  // Get token configuration and metadata
  const {
    config,
    totalSupply,
    decimals,
    isLoading: isTokenLoading
  } = useRisyToken();

  // Get token balances and limits
  const {
    balance,
    maxBalance,
    remainingHodlLimit,
    isBalanceLoading,
    isMaxBalanceLoading,
  } = useTokenBalance();

  const {
    timedTransferLimit,
    globalTransferLimit,
    isTransferLimitLoading,
    resetTime,
  } = useTokenLimits();

  // Set up transfer functionality
  const transferHook = useTokenTransfer({
    senderBalance: balance,
    timedTransferLimit,
    isWhitelisted,
  });

  const value: TokenContextValue = {
    // Token metadata
    config,
    totalSupply,
    decimals,
    isTokenLoading,

    // Balance and limits
    balance,
    maxBalance,
    remainingHodlLimit,
    timedTransferLimit,
    globalTransferLimit,
    resetTime,

    // Loading states
    isBalanceLoading,
    isMaxBalanceLoading,
    isTransferLimitLoading,

    // Transfer functionality
    transfer: {
      state: {
        recipient: transferHook.recipient,
        amount: transferHook.amount,
        error: transferHook.error,
        isSubmitting: transferHook.isSubmitting,
        recipientBalance: transferHook.recipientBalance,
        recipientRemainingHodl: transferHook.recipientRemainingHodl,
        isValidAddress: transferHook.isValidAddress,
        isRecipientLoading: transferHook.isRecipientLoading,
        isBurnAddress: transferHook.isBurnAddress,
        isDAOAddress: transferHook.isDAOAddress,
      },
      setRecipient: transferHook.setRecipient,
      setAmount: transferHook.setAmount,
      handleTransfer: transferHook.handleTransfer,
    },
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
} 