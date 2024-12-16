import { type PreparedTransaction } from "thirdweb";

export interface TradeState {
  amount: string;
  estimatedOutput: string;
  priceImpact: number;
  error: string | null;
  isSubmitting: boolean;
  allowance: string;
  isAllowanceLoading: boolean;
}

export interface TokenTradeHookResult {
  state: TradeState;
  setAmount: (value: string) => void;
  prepareTrade: () => Promise<PreparedTransaction>;
  prepareApprove: () => Promise<PreparedTransaction>;
}

export interface TradeFormProps {
  type: 'buy' | 'sell';
}

export interface TradeInputProps {
  type: 'buy' | 'sell';
  amount: string;
  onChange: (value: string) => void;
  estimatedOutput: string;
}

export interface TradeSummaryProps {
  type: 'buy' | 'sell';
  amount: string;
  estimatedOutput: string;
  priceImpact: number;
}

export interface TradeButtonProps {
  type: 'buy' | 'sell';
  amount: string;
  isApproved: boolean;
  className?: string;
  unstyled?: boolean;
  disabled?: boolean;
  payModal?: {
    metadata: {
      name: string;
      image: string;
    };
  };
  onTransactionSent?: (tx: any) => void;
  onTransactionConfirmed?: (receipt: any) => void;
  onError?: (error: Error) => void;
} 