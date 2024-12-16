"use client";

import { createContext, useContext } from "react";
import { useTokenBalance } from "../hooks/token/useTokenBalance";
import { useTokenLimits } from "../hooks/token/useTokenLimits";
import { useTokenTransfer } from "../hooks/token/useTokenTransfer";
import { useTokenTrade } from "../hooks/token/useTokenTrade";
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

  // Set up transfer functionality with prepare support
  const transferHook = useTokenTransfer({
    senderBalance: balance,
    timedTransferLimit,
    isWhitelisted,
  });

  // Set up trade functionality
  const tradeHook = useTokenTrade({
    type: 'buy', // Default type, will be overridden by component
    balance,
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

    // Transfer functionality with prepare support
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
      prepareTransfer: transferHook.prepareTransfer,
    },

    // Trade functionality
    trade: {
      state: tradeHook.state,
      setAmount: tradeHook.setAmount,
      prepareTrade: tradeHook.prepareTrade,
      prepareApprove: tradeHook.prepareApprove,
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