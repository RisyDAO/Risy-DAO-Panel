import { useReadContract, useActiveWallet } from "thirdweb/react";
import { RISY_TOKEN_CONFIG } from "../constants";
import { risyTokenContract } from "../client";

export function useRisyToken() {
  const wallet = useActiveWallet();
  const walletAddress = wallet?.getAccount()?.address;

  // Get token balance using ERC20 interface
  const { data: balance, isLoading: isBalanceLoading } = useReadContract({
    contract: risyTokenContract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: walletAddress ? [walletAddress] : ["0x0000000000000000000000000000000000000000"]
  });

  // Format balance with proper decimals
  const formattedBalance = balance 
    ? (Number(balance) / Math.pow(10, RISY_TOKEN_CONFIG.decimals)).toString()
    : "0";

  return {
    balance: formattedBalance,
    isBalanceLoading,
    walletAddress,
  };
}