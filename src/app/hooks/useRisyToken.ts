import { useReadContract, useActiveWallet } from "thirdweb/react";
import { RISY_TOKEN_CONFIG } from "../constants";
import { risyTokenContract } from "../client";
import { useEffect, useState } from "react";

const BUFFER = 0.01; // Buffer for limits

function formatWithBuffer(value: number): string {
  if (isNaN(value) || !isFinite(value)) return "0";
  const formatted = value < BUFFER ? "0" : (value - BUFFER).toFixed(2);
  // Handle scientific notation
  return Number(formatted).toLocaleString('en-US', {
    maximumFractionDigits: 2,
    useGrouping: false
  });
}

function formatBalance(value: bigint | undefined, decimals: number): string {
  if (!value) return "0";
  try {
    return (Number(value) / Math.pow(10, decimals)).toLocaleString('en-US', {
      maximumFractionDigits: 2,
      useGrouping: false
    });
  } catch (e) {
    return "0";
  }
}

export function useRisyToken() {
  const [resetTime, setResetTime] = useState<string>("");
  const wallet = useActiveWallet();
  const walletAddress = wallet?.getAccount()?.address;

  // Get token balance
  const { data: balance, isLoading: isBalanceLoading } = useReadContract({
    contract: risyTokenContract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: walletAddress ? [walletAddress] : ["0x0000000000000000000000000000000000000000"]
  });

  // Get transfer limit details
  const { data: transferLimitDetails, isLoading: isTransferDetailsLoading } = useReadContract({
    contract: risyTokenContract,
    method: "function getTransferLimitDetails(address account) view returns (uint256 transferable, uint256 percentTransferable)",
    params: walletAddress ? [walletAddress] : ["0x0000000000000000000000000000000000000000"]
  });

  // Get global transfer limit if needed
  const { data: globalTransferLimit, isLoading: isTransferLimitLoading } = useReadContract({
    contract: risyTokenContract,
    method: "function getTransferLimit() view returns (uint256, uint256)",
    params: []
  });

  // Get max balance limit
  const { data: maxBalance, isLoading: isMaxBalanceLoading } = useReadContract({
    contract: risyTokenContract,
    method: "function getMaxBalance() view returns (uint256)",
    params: []
  });

  // Get current day from contract
  const { data: currentDay } = useReadContract({
    contract: risyTokenContract,
    method: "function currentDay() view returns (uint256)",
    params: []
  });

  // Calculate time until reset
  useEffect(() => {
    if (!currentDay || !globalTransferLimit?.[0]) return;

    const updateResetTime = () => {
      const timeWindow = Number(globalTransferLimit[0]); // in seconds
      const nextReset = (Number(currentDay) + 1) * timeWindow * 1000; // convert to milliseconds
      const now = Date.now();
      const diff = nextReset - now;

      if (diff <= 0) return;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setResetTime(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateResetTime();
    const interval = setInterval(updateResetTime, 1000);

    return () => clearInterval(interval);
  }, [currentDay, globalTransferLimit]);

  // Format balance with proper decimals
  const formattedBalance = formatBalance(balance, RISY_TOKEN_CONFIG.decimals);

  // Calculate timed transfer limit with buffer
  let formattedTimedTransferLimit = "0";
  
  if (transferLimitDetails?.[0] && Number(transferLimitDetails[0]) > 0) {
    const rawLimit = Number(transferLimitDetails[0]) / Math.pow(10, RISY_TOKEN_CONFIG.decimals);
    formattedTimedTransferLimit = formatWithBuffer(rawLimit);
  } else if (globalTransferLimit && balance) {
    const [, transferLimitPercent] = globalTransferLimit;
    const rawLimit = Number(balance) * (Number(transferLimitPercent) / Math.pow(10, 18));
    formattedTimedTransferLimit = formatWithBuffer(rawLimit / Math.pow(10, RISY_TOKEN_CONFIG.decimals));
  }

  // Calculate remaining ICO HODL limit with buffer
  const formattedMaxBalance = formatBalance(maxBalance, RISY_TOKEN_CONFIG.decimals);
  
  const rawHodlLimit = maxBalance && balance
    ? Math.max(0, Number(formattedMaxBalance) - Number(formattedBalance))
    : 0;

  const remainingHodlLimit = formatWithBuffer(rawHodlLimit);

  return {
    balance: formattedBalance,
    timedTransferLimit: formattedTimedTransferLimit,
    maxBalance: formattedMaxBalance,
    remainingHodlLimit,
    globalTransferLimit,
    isBalanceLoading,
    isTransferLimitLoading: isTransferDetailsLoading || isTransferLimitLoading,
    isMaxBalanceLoading,
    resetTime,
    walletAddress,
  };
}