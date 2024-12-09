import { useActiveWallet } from "thirdweb/react";
import { useEffect, useState } from "react";
import { ContractFactory } from "../../contracts/factory";

export function useWalletStatus() {
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [isWhitelistLoading, setIsWhitelistLoading] = useState(true);

  const wallet = useActiveWallet();
  const walletAddress = wallet?.getAccount()?.address;

  useEffect(() => {
    const checkWhitelistStatus = async () => {
      if (!walletAddress) {
        setIsWhitelisted(false);
        setIsWhitelistLoading(false);
        return;
      }

      try {
        setIsWhitelistLoading(true);
        const tokenReader = ContractFactory.getTokenReader();
        const whitelistStatus = await tokenReader.isWhitelisted(walletAddress);
        setIsWhitelisted(whitelistStatus);
      } catch (error) {
        console.error("Error checking whitelist status:", error);
        setIsWhitelisted(false);
      } finally {
        setIsWhitelistLoading(false);
      }
    };

    checkWhitelistStatus();
  }, [walletAddress]);

  return {
    isWhitelisted,
    isWhitelistLoading,
    walletAddress,
  };
} 