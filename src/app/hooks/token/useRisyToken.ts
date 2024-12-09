import { useActiveWallet } from "thirdweb/react";
import { useEffect, useState } from "react";
import { ContractFactory } from "../../contracts/factory";
import { type TokenConfig } from "../../types/token";
import { type AsyncState } from "../../types/common";
import { RISY_TOKEN_CONFIG } from "../../config/tokens";

interface TokenMetadata {
  config: TokenConfig;
  totalSupply: string;
  decimals: number;
}

interface RisyTokenState extends AsyncState<TokenMetadata> {
  data: TokenMetadata;
}

export function useRisyToken() {
  const [state, setState] = useState<RisyTokenState>({
    isLoading: true,
    data: {
      config: RISY_TOKEN_CONFIG,
      totalSupply: "0",
      decimals: RISY_TOKEN_CONFIG.decimals,
    }
  });

  const wallet = useActiveWallet();
  const account = wallet?.getAccount();

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        const tokenReader = ContractFactory.getTokenReader();

        const [totalSupply, decimals] = await Promise.all([
          tokenReader.getTotalSupply(),
          tokenReader.getDecimals(),
        ]);

        setState({
          isLoading: false,
          data: {
            config: RISY_TOKEN_CONFIG,
            totalSupply: totalSupply.toString(),
            decimals,
          }
        });
      } catch (error) {
        console.error("Error fetching token info:", error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchTokenInfo();
  }, [account]);

  return {
    config: state.data.config,
    totalSupply: state.data.totalSupply,
    decimals: state.data.decimals,
    isLoading: state.isLoading,
  };
} 