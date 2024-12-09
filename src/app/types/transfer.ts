export interface TransferFormProps {
  recipient: string;
  setRecipient: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  error: string | null;
  isSubmitting: boolean;
  handleTransfer: () => void;
  recipientBalance: string;
  recipientRemainingHodl: number;
  isValidAddress: boolean;
  isRecipientLoading: boolean;
  isBurnAddress: boolean;
  isDAOAddress: boolean;
  walletAddress?: string;
}

export interface TransferInputProps {
  type: 'recipient' | 'amount';
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  balance?: string;
  hodlLimit?: number;
  isValidAddress?: boolean;
  walletAddress?: string;
}

export interface TransferButtonProps {
  recipient: string;
  amount: string;
  error: string | null;
  isSubmitting: boolean;
  walletAddress?: string;
  isBurnAddress: boolean;
  isValidAddress: boolean;
}

export interface TransferNoticeProps {
  isBurnAddress: boolean;
  isDAOAddress: boolean;
} 