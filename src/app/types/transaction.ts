export interface TransactionParams {
  to: string;
  from: string;
  value: string;
  data?: string;
  nonce?: number;
  gasLimit?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
}

export interface TransactionResult {
  hash: string;
  success: boolean;
  error?: string;
  receipt?: {
    status: boolean;
    blockNumber: number;
    gasUsed: string;
  };
}

export interface TransactionStatus {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string;
} 