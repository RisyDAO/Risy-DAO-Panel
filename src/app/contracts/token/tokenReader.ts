import { ContractReader } from "../types";
import { RISY_TOKEN_CONFIG } from "../../config/tokens";
import { formatBalance } from "../../utils/formatUtils";
import { NULL_ADDRESS } from "../../utils/addressUtils";
import { readContract } from "thirdweb";

export class TokenReader implements ContractReader<typeof import("../../client").risyTokenContract> {
  constructor(public contract: typeof import("../../client").risyTokenContract) {}

  async getBalance(address: string = NULL_ADDRESS) {
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

  async getTransferLimitDetails(address: string = NULL_ADDRESS) {
    const [transferable, percentTransferable] = await readContract({
      contract: this.contract,
      method: "function getTransferLimitDetails(address account) view returns (uint256 transferable, uint256 percentTransferable)",
      params: [address]
    });
    
    return {
      transferable,
      percentTransferable,
      formattedTransferable: formatBalance(transferable, RISY_TOKEN_CONFIG.decimals)
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