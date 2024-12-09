import { type Account } from "thirdweb/wallets";

export interface WalletInfo {
  address: string;
  account: Account;
  chainId: number;
  isConnected: boolean;
}

export interface WalletState {
  isWhitelisted: boolean;
  isConnected: boolean;
  chainId: number;
  address: string;
}

export interface WalletBalance {
  token: string;
  balance: string;
  symbol: string;
  decimals: number;
}

export interface WalletError {
  code: number;
  message: string;
  details?: string;
}

export interface WalletConnectionOptions {
  chainId?: number;
  switchChain?: boolean;
  silent?: boolean;
} 