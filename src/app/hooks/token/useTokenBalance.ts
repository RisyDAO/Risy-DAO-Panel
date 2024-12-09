import { useActiveWallet } from "thirdweb/react";
import { useEffect, useState } from "react";
import { ContractFactory } from "../../contracts/factory";
import { type TokenBalance } from "../../types/token";
import { type AsyncState } from "../../types/common";

interface TokenBalanceData {
  balance: string;
  maxBalance: string;
  remainingHodlLimit: string;
}

interface TokenBalanceState extends AsyncState<TokenBalanceData> {
  data: TokenBalanceData;
}

export function useTokenBalance() {
  const [state, setState] = useState<TokenBalanceState>({
    isLoading: true,
    data: {
      balance: "0",
      maxBalance: "0",
      remainingHodlLimit: "0",
    }
  });

  const wallet = useActiveWallet();
  const walletAddress = wallet?.getAccount()?.address;

  useEffect(() => {
    const fetchBalances = async () => {
      if (!walletAddress) {
        setState({
          isLoading: false,
          data: {
            balance: "0",
            maxBalance: "0",
            remainingHodlLimit: "0",
          }
        });
        return;
      }

      try {
        setState(prev => ({ ...prev, isLoading: true }));
        const tokenReader = ContractFactory.getTokenReader();
        
        // Get balance and max balance in parallel
        const [balanceResult, maxBalanceResult] = await Promise.all([
          tokenReader.getBalance(walletAddress),
          tokenReader.getMaxBalance()
        ]);

        // Calculate remaining HODL limit
        const rawHodlLimit = Number(maxBalanceResult.formattedMaxBalance) - Number(balanceResult.formattedBalance);
        const remainingHodlLimit = Math.max(0, rawHodlLimit).toFixed(2);

        setState({
          isLoading: false,
          data: {
            balance: balanceResult.formattedBalance,
            maxBalance: maxBalanceResult.formattedMaxBalance,
            remainingHodlLimit,
          }
        });
      } catch (error) {
        console.error("Error fetching balances:", error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchBalances();
  }, [walletAddress]);

  return {
    balance: state.data.balance,
    maxBalance: state.data.maxBalance,
    remainingHodlLimit: state.data.remainingHodlLimit,
    isBalanceLoading: state.isLoading,
    isMaxBalanceLoading: state.isLoading,
    walletAddress,
  };
} 