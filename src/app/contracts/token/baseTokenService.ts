import { type ThirdwebContract } from "thirdweb";
import { RISY_TOKEN_CONFIG } from "../../config/tokens";
import { formatBalance, toWei } from "../../utils/formatUtils";
import { NULL_ADDRESS } from "../../utils/addressUtils";
import { type TokenBalance } from "../types";

export abstract class BaseTokenService<T extends ThirdwebContract> {
  constructor(public readonly contract: T) {}

  protected formatTokenBalance(balance: bigint): TokenBalance {
    return {
      balance,
      formattedBalance: formatBalance(balance, RISY_TOKEN_CONFIG.decimals)
    };
  }

  protected convertToWei(amount: string): bigint {
    return toWei(amount, RISY_TOKEN_CONFIG.decimals);
  }

  protected getDefaultAddress(address?: string): string {
    return address || NULL_ADDRESS;
  }

  protected validateAmount(amount: string): boolean {
    const numAmount = Number(amount);
    return !isNaN(numAmount) && numAmount > 0;
  }

  protected getDecimals(): number {
    return RISY_TOKEN_CONFIG.decimals;
  }
} 