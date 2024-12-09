import { ContractReader } from "../types";
import { RISY_TOKEN_CONFIG } from "../../config/tokens";
import { formatBalance } from "../../utils/formatUtils";
import { NULL_ADDRESS } from "../../utils/addressUtils";
import { readContract } from "thirdweb";
import { type TokenBalance, type TokenLimits } from "../../types/token";

export class TokenReader implements ContractReader<typeof import("../../client").risyTokenContract> {
  constructor(public contract: typeof import("../../client").risyTokenContract) {}

  async getBalance(address: string = NULL_ADDRESS): Promise<TokenBalance> {
    const balance = await readContract({
      contract: this.contract,
      method: "function balanceOf(address account) view returns (uint256)",
      params: [address]
    });
    
    return {
      balance,
      formattedBalance: formatBalance(balance, RISY_TOKEN_CONFIG.decimals)
    };
  }

  async getTotalSupply(): Promise<bigint> {
    return readContract({
      contract: this.contract,
      method: "function totalSupply() view returns (uint256)",
      params: []
    });
  }

  async getDecimals(): Promise<number> {
    return readContract({
      contract: this.contract,
      method: "function decimals() view returns (uint8)",
      params: []
    });
  }

  async getTransferLimitDetails(address: string = NULL_ADDRESS): Promise<TokenLimits> {
    const [transferable, percentTransferable] = await readContract({
      contract: this.contract,
      method: "function getTransferLimitDetails(address account) view returns (uint256 transferable, uint256 percentTransferable)",
      params: [address]
    });
    
    return {
      transferLimit: transferable,
      percentTransferable,
      maxBalance: 0n, // Will be set by separate call
      timeWindow: 86400n // Default 1 day in seconds
    };
  }

  async getMaxBalance() {
    const maxBalance = await readContract({
      contract: this.contract,
      method: "function getMaxBalance() view returns (uint256)",
      params: []
    });
    
    return {
      maxBalance,
      formattedMaxBalance: formatBalance(maxBalance, RISY_TOKEN_CONFIG.decimals)
    };
  }

  async getCurrentDay() {
    return readContract({
      contract: this.contract,
      method: "function currentDay() view returns (uint256)",
      params: []
    });
  }

  async getTransferLimit() {
    return readContract({
      contract: this.contract,
      method: "function getTransferLimit() view returns (uint256, uint256)",
      params: []
    });
  }

  async isWhitelisted(address: string = NULL_ADDRESS) {
    return readContract({
      contract: this.contract,
      method: "function isWhiteListed(address account) view returns (bool)",
      params: [address]
    });
  }
} 