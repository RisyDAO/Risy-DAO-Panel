import { useToken } from "../../../contexts/TokenContext";
import { ErrorBoundary } from "../../shared/ErrorBoundary";
import { useWallet } from "../../../contexts/WalletContext";
import { TransactionButtonWrapper } from "../../shared/TransactionButtonWrapper";

interface TradeButtonProps {
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

function TradeButtonContent({
  type,
  amount,
  isApproved,
  className,
  unstyled = true,
  disabled = false,
  payModal,
  onTransactionSent,
  onTransactionConfirmed,
  onError
}: TradeButtonProps) {
  const { trade: { state, prepareTrade, prepareApprove } } = useToken();
  const { walletAddress } = useWallet();

  // Check if form is valid
  const isFormValid = amount && !state.error && !state.isSubmitting && walletAddress;

  const getButtonContent = () => {
    if (!amount) {
      return {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        ),
        text: "Enter Amount"
      };
    }

    if (state.error) {
      return {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        ),
        text: "Cannot Trade"
      };
    }

    if (type === 'sell' && !isApproved) {
      return {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        ),
        text: "Approve RISY"
      };
    }

    return {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M13 10V3L4 14h7v7l9-11h-7z" 
          />
        </svg>
      ),
      text: type === 'buy' ? `Buy ${amount} RISY` : `Sell ${amount} RISY`
    };
  };

  const content = getButtonContent();

  return (
    <TransactionButtonWrapper
      transaction={type === 'sell' && !isApproved ? prepareApprove : prepareTrade}
      onTransactionSent={onTransactionSent}
      onTransactionConfirmed={onTransactionConfirmed}
      onError={onError}
      unstyled={unstyled}
      disabled={disabled || !isFormValid}
      payModal={payModal}
      className={className}
    >
      <div className="flex items-center justify-center space-x-2">
        {content.icon}
        <span className="font-medium">{content.text}</span>
      </div>
    </TransactionButtonWrapper>
  );
}

export function TradeButtonWrapper(props: TradeButtonProps) {
  return (
    <ErrorBoundary title="Failed to load trade button">
      <TradeButtonContent {...props} />
    </ErrorBoundary>
  );
} 