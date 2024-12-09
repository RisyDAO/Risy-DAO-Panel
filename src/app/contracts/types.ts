import { type ThirdwebContract } from "thirdweb";
import { type Account } from "thirdweb/wallets";

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

export interface TransferResult {
  transactionHash: string;
  success: boolean;
}

export interface ContractReader<T extends ThirdwebContract> {
  contract: T;
}

export interface ContractWriter<T extends ThirdwebContract> extends ContractReader<T> {
  account: Account;
} 