"use client";

import { createContext, useContext, useCallback } from "react";
import { useActiveWallet } from "thirdweb/react";
import { useWalletStatus } from "../hooks/wallet/useWalletStatus";
import { type WalletContextValue, type ProviderProps } from "../types/context";

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: ProviderProps) {
  const wallet = useActiveWallet();
  const account = wallet?.getAccount();
  const walletAddress = account?.address;

  const {
    isWhitelisted,
    isWhitelistLoading,
  } = useWalletStatus();

  const connect = useCallback(async () => {
    try {
      // Implement connect logic
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      // Implement disconnect logic
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  }, []);

  const value: WalletContextValue = {
    account,
    walletAddress,
    isWhitelisted,
    isWhitelistLoading,
    connect,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
} 