import { type PreparedTransaction } from "thirdweb";
import { type TransactionReceipt } from "thirdweb/transaction";
import { type ReactNode } from "react";

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

// New interfaces for TransactionButton integration
export interface TransactionButtonWrapperProps {
  className?: string;
  unstyled?: boolean;
  disabled?: boolean;
  payModal?: {
    metadata?: {
      name?: string;
      image?: string;
    }
  };
  onTransactionSent?: (tx: any) => void;
  onTransactionConfirmed?: (receipt: TransactionReceipt) => void;
  onError?: (error: Error) => void;
  transaction: () => Promise<PreparedTransaction>;
  children: ReactNode;
}

export interface TransferButtonWrapperProps extends Omit<TransactionButtonWrapperProps, 'transaction' | 'children'> {
  // Any additional props specific to transfer button
} 