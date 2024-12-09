import { useTokenBalance } from "./useTokenBalance";
import { useTokenLimits } from "./useTokenLimits";
import { useWalletStatus } from "../wallet/useWalletStatus";
import { useTokenTransfer } from "./useTokenTransfer";

export function useRisyToken() {
  const {
    balance,
    maxBalance,
    remainingHodlLimit,
    isBalanceLoading,
    isMaxBalanceLoading,
    walletAddress,
  } = useTokenBalance();

  const {
    timedTransferLimit,
    globalTransferLimit,
    isTransferLimitLoading,
    resetTime,
  } = useTokenLimits();

  const {
    isWhitelisted,
    isWhitelistLoading,
  } = useWalletStatus();

  const transfer = useTokenTransfer({
    senderBalance: balance,
    timedTransferLimit,
    isWhitelisted: isWhitelisted || false,
  });

  console.log('useRisyToken state:', {
    balance,
    maxBalance,
    remainingHodlLimit,
    timedTransferLimit,
    globalTransferLimit,
    isWhitelisted,
    walletAddress
  });

  return {
    // Balance and limits
    balance,
    maxBalance,
    remainingHodlLimit,
    timedTransferLimit,
    globalTransferLimit,
    
    // Loading states
    isBalanceLoading,
    isMaxBalanceLoading,
    isTransferLimitLoading,
    isWhitelistLoading,
    
    // Wallet status
    isWhitelisted,
    walletAddress,
    
    // Time tracking
    resetTime,
    
    // Transfer functionality
    transfer,
  };
} 