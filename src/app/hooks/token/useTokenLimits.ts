import { useActiveWallet } from "thirdweb/react";
import { useEffect, useState } from "react";
import { ContractFactory } from "../../contracts/factory";
import { formatBalance, formatDuration } from "../../utils/formatUtils";
import { RISY_TOKEN_CONFIG } from "@/app/config/tokens";
import { type TokenLimits } from "../../types/token";
import { type AsyncState } from "../../types/common";

type TransferLimit = readonly [bigint, bigint];

interface TokenLimitsData {
  timedTransferLimit: string;
  globalTransferLimit: TransferLimit | null;
  resetTime: string;
}

interface TokenLimitsState extends AsyncState<TokenLimitsData> {
  data: TokenLimitsData;
}

export function useTokenLimits() {
  const [state, setState] = useState<TokenLimitsState>({
    isLoading: true,
    data: {
      timedTransferLimit: "0",
      globalTransferLimit: null,
      resetTime: "",
    }
  });

  const wallet = useActiveWallet();
  const walletAddress = wallet?.getAccount()?.address;

  useEffect(() => {
    const fetchLimits = async () => {
      if (!walletAddress) {
        setState({
          isLoading: false,
          data: {
            timedTransferLimit: "0",
            globalTransferLimit: null,
            resetTime: "",
          }
        });
        return;
      }

      try {
        setState(prev => ({ ...prev, isLoading: true }));
        const tokenReader = ContractFactory.getTokenReader();

        // Get transfer limits and balance in parallel
        const [limitDetails, globalLimit, currentDay, balanceResult] = await Promise.all([
          tokenReader.getTransferLimitDetails(walletAddress),
          tokenReader.getTransferLimit(),
          tokenReader.getCurrentDay(),
          tokenReader.getBalance(walletAddress)
        ]);

        // If transferable is 0, calculate it based on balance and transfer limit percent
        let transferableAmount = limitDetails.transferLimit;
        if (transferableAmount === 0n && globalLimit?.[1] && balanceResult.balance > 0n) {
          // Calculate: balance * transferLimitPercent / 10^18
          transferableAmount = (balanceResult.balance * globalLimit[1]) / BigInt(10 ** 18);
        }

        if(transferableAmount > 0n) {
          transferableAmount = transferableAmount - BigInt(10 ** 16);
        }

        const formattedTransferLimit = formatBalance(transferableAmount, RISY_TOKEN_CONFIG.decimals);

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

            setState(prev => ({
              isLoading: prev.isLoading,
              data: {
                ...prev.data,
                resetTime: formatDuration(hours, minutes, seconds)
              }
            }));
          };

          updateResetTime();
          const interval = setInterval(updateResetTime, 1000);

          setState({
            isLoading: false,
            data: {
              timedTransferLimit: formattedTransferLimit,
              globalTransferLimit: globalLimit as TransferLimit,
              resetTime: "",  // Will be updated by the interval
            }
          });

          return () => clearInterval(interval);
        }

        setState({
          isLoading: false,
          data: {
            timedTransferLimit: formattedTransferLimit,
            globalTransferLimit: globalLimit as TransferLimit,
            resetTime: "",
          }
        });
      } catch (error) {
        console.error("Error fetching transfer limits:", error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchLimits();
  }, [walletAddress]);

  return {
    timedTransferLimit: state.data.timedTransferLimit,
    globalTransferLimit: state.data.globalTransferLimit,
    isTransferLimitLoading: state.isLoading,
    resetTime: state.data.resetTime,
  };
} 