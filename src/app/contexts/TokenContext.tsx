"use client";

import { createContext, useContext, useCallback } from "react";
import { useTokenBalance } from "../hooks/token/useTokenBalance";
import { useTokenLimits } from "../hooks/token/useTokenLimits";
import { useTokenTransfer } from "../hooks/token/useTokenTransfer";
import { type TokenContextValue, type TokenTransferState, type ProviderProps, type TokenTransferHookResult } from "../types/context";
import { useWallet } from "./WalletContext";

const TokenContext = createContext<TokenContextValue | undefined>(undefined);

export function TokenProvider({ children }: ProviderProps) {
  const { walletAddress, isWhitelisted } = useWallet();

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
  const transferHook: TokenTransferHookResult = useTokenTransfer({
    senderBalance: balance,
    timedTransferLimit,
    isWhitelisted,
  });

  // Transform transfer state to match TokenContextValue
  const transfer: TokenContextValue['transfer'] = {
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
  };

  const value: TokenContextValue = {
    // Token state
    balance,
    timedTransferLimit,
    maxBalance,
    remainingHodlLimit,
    globalTransferLimit,
    isBalanceLoading,
    isTransferLimitLoading,
    isMaxBalanceLoading,
    resetTime,

    // Transfer functionality
    transfer,
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