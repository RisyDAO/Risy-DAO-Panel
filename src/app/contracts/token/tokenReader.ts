import { ContractReader } from "../types";
import { readContract } from "thirdweb";
import { BaseTokenService } from "./baseTokenService";
import { type TokenLimits } from "../../types/token";

export class TokenReader extends BaseTokenService<typeof import("../../client").risyTokenContract> implements ContractReader<typeof import("../../client").risyTokenContract> {
  async getBalance(address?: string) {
    const balance = await readContract({
      contract: this.contract,
      method: "function balanceOf(address account) view returns (uint256)",
      params: [this.getDefaultAddress(address)]
    });
    
    return this.formatTokenBalance(balance);
  }

  async getTotalSupply() {
    return readContract({
      contract: this.contract,
      method: "function totalSupply() view returns (uint256)",
      params: []
    });
  }

  async getTransferLimitDetails(address?: string): Promise<TokenLimits> {
    const [transferable, percentTransferable] = await readContract({
      contract: this.contract,
      method: "function getTransferLimitDetails(address account) view returns (uint256 transferable, uint256 percentTransferable)",
      params: [this.getDefaultAddress(address)]
    });
    
    return {
      transferLimit: transferable,
      percentTransferable,
      maxBalance: 0n,
      timeWindow: 86400n
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
      formattedMaxBalance: this.formatTokenBalance(maxBalance).formattedBalance
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

  async isWhitelisted(address?: string) {
    return readContract({
      contract: this.contract,
      method: "function isWhiteListed(address account) view returns (bool)",
      params: [this.getDefaultAddress(address)]
    });
  }

  getDecimals(): number {
    return this.getDecimals();
  }
} 