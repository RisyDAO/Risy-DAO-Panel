import { useActiveWallet } from "thirdweb/react";
import { useEffect, useState } from "react";
import { ContractFactory } from "../../contracts/factory";

export function useTokenBalance() {
  const [balance, setBalance] = useState("0");
  const [maxBalance, setMaxBalance] = useState("0");
  const [remainingHodlLimit, setRemainingHodlLimit] = useState("0");
  const [isBalanceLoading, setIsBalanceLoading] = useState(true);
  const [isMaxBalanceLoading, setIsMaxBalanceLoading] = useState(true);

  const wallet = useActiveWallet();
  const walletAddress = wallet?.getAccount()?.address;

  useEffect(() => {
    const fetchBalances = async () => {
      if (!walletAddress) {
        setBalance("0");
        setMaxBalance("0");
        setRemainingHodlLimit("0");
        setIsBalanceLoading(false);
        setIsMaxBalanceLoading(false);
        return;
      }

      try {
        setIsBalanceLoading(true);
        setIsMaxBalanceLoading(true);

        const tokenReader = ContractFactory.getTokenReader();
        
        // Get balance and max balance in parallel
        const [balanceResult, maxBalanceResult] = await Promise.all([
          tokenReader.getBalance(walletAddress),
          tokenReader.getMaxBalance()
        ]);

        setBalance(balanceResult.formattedBalance);
        setMaxBalance(maxBalanceResult.formattedMaxBalance);

        // Calculate remaining HODL limit
        const rawHodlLimit = Number(maxBalanceResult.formattedMaxBalance) - Number(balanceResult.formattedBalance);
        setRemainingHodlLimit(Math.max(0, rawHodlLimit).toFixed(2));

      } catch (error) {
        console.error("Error fetching balances:", error);
        // Keep previous values on error
      } finally {
        setIsBalanceLoading(false);
        setIsMaxBalanceLoading(false);
      }
    };

    fetchBalances();
  }, [walletAddress]);

  return {
    balance,
    maxBalance,
    remainingHodlLimit,
    isBalanceLoading,
    isMaxBalanceLoading,
    walletAddress,
  };
} 