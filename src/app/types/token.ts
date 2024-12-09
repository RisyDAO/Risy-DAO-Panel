import { type Account } from "thirdweb/wallets";

export interface TokenConfig {
  name: string;
  symbol: string;
  decimals: number;
  icon: string;
}

export interface TokenBalance {
  balance: bigint;
  formattedBalance: string;
}

export interface TokenLimits {
  transferLimit: bigint;
  percentTransferable: bigint;
  maxBalance: bigint;
  timeWindow: bigint;
}

export interface TokenTransferParams {
  to: string;
  amount: string;
  from?: string;
}

export interface TokenTransferOptions {
  account: Account;
  gasLimit?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
} 