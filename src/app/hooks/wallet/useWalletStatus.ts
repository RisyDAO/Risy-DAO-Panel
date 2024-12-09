import { useActiveWallet } from "thirdweb/react";
import { useEffect, useState } from "react";
import { ContractFactory } from "../../contracts/factory";
import { type WalletState } from "../../types/wallet";
import { type AsyncState } from "../../types/common";

interface WalletStatusState extends AsyncState<WalletState> {
  data: WalletState;
}

export function useWalletStatus() {
  const [state, setState] = useState<WalletStatusState>({
    isLoading: true,
    data: {
      isWhitelisted: false,
      isConnected: false,
      chainId: 0,
      address: "",
    }
  });

  const wallet = useActiveWallet();
  const account = wallet?.getAccount();
  const walletAddress = account?.address;
  const network = wallet?.getChain();

  useEffect(() => {
    const checkWalletStatus = async () => {
      if (!walletAddress) {
        setState({
          isLoading: false,
          data: {
            isWhitelisted: false,
            isConnected: false,
            chainId: 0,
            address: "",
          }
        });
        return;
      }

      try {
        setState(prev => ({ ...prev, isLoading: true }));
        const tokenReader = ContractFactory.getTokenReader();
        const whitelistStatus = await tokenReader.isWhitelisted(walletAddress);

        setState({
          isLoading: false,
          data: {
            isWhitelisted: whitelistStatus,
            isConnected: true,
            chainId: network?.id || 0,
            address: walletAddress,
          }
        });
      } catch (error) {
        console.error("Error checking whitelist status:", error);
        setState(prev => ({ 
          ...prev, 
          isLoading: false,
          data: {
            ...prev.data,
            isWhitelisted: false,
          }
        }));
      }
    };

    checkWalletStatus();
  }, [walletAddress, account, network]);

  return {
    isWhitelisted: state.data.isWhitelisted,
    isWhitelistLoading: state.isLoading,
    walletAddress: state.data.address,
    isConnected: state.data.isConnected,
    chainId: state.data.chainId,
  };
} 