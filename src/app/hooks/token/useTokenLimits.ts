import { useActiveWallet } from "thirdweb/react";
import { useEffect, useState } from "react";
import { ContractFactory } from "../../contracts/factory";
import { formatBalance, formatDuration } from "../../utils/formatUtils";
import { RISY_TOKEN_CONFIG } from "@/app/config/tokens";

type TransferLimit = readonly [bigint, bigint];

export function useTokenLimits() {
  const [timedTransferLimit, setTimedTransferLimit] = useState("0");
  const [globalTransferLimit, setGlobalTransferLimit] = useState<TransferLimit | null>(null);
  const [resetTime, setResetTime] = useState<string>("");
  const [isTransferLimitLoading, setIsTransferLimitLoading] = useState(true);

  const wallet = useActiveWallet();
  const walletAddress = wallet?.getAccount()?.address;

  useEffect(() => {
    const fetchLimits = async () => {
      if (!walletAddress) {
        setTimedTransferLimit("0");
        setGlobalTransferLimit(null);
        setIsTransferLimitLoading(false);
        return;
      }

      try {
        setIsTransferLimitLoading(true);
        const tokenReader = ContractFactory.getTokenReader();

        // Get transfer limits and balance in parallel
        const [limitDetails, globalLimit, currentDay, balanceResult] = await Promise.all([
          tokenReader.getTransferLimitDetails(walletAddress),
          tokenReader.getTransferLimit(),
          tokenReader.getCurrentDay(),
          tokenReader.getBalance(walletAddress)
        ]);

        // If transferable is 0, calculate it based on balance and transfer limit percent
        let transferableAmount = limitDetails.transferable;
        if (transferableAmount === 0n && globalLimit?.[1] && balanceResult.balance > 0n) {
          // Calculate: balance * transferLimitPercent / 10^18
          transferableAmount = (balanceResult.balance * globalLimit[1]) / BigInt(10 ** 18);
        }

        setTimedTransferLimit(formatBalance(transferableAmount, RISY_TOKEN_CONFIG.decimals));
        setGlobalTransferLimit(globalLimit as TransferLimit);

        // Set up reset time calculation
        if (currentDay && globalLimit?.[0]) {
          const updateResetTime = () => {
            const timeWindow = Number(globalLimit[0]); // in seconds
            const nextReset = (Number(currentDay) + 1) * timeWindow * 1000; // convert to milliseconds
            const now = Date.now();
            const diff = nextReset - now;

            if (diff <= 0) return;

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setResetTime(formatDuration(hours, minutes, seconds));
          };

          updateResetTime();
          const interval = setInterval(updateResetTime, 1000);

          return () => clearInterval(interval);
        }
      } catch (error) {
        console.error("Error fetching transfer limits:", error);
        // Keep previous values on error
      } finally {
        setIsTransferLimitLoading(false);
      }
    };

    fetchLimits();
  }, [walletAddress]);

  return {
    timedTransferLimit,
    globalTransferLimit,
    isTransferLimitLoading,
    resetTime,
  };
} 