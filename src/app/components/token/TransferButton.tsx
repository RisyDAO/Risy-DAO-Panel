import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Button } from "../shared/Button";
import { LoadingSpinner } from "../shared/loading/LoadingSpinner";
import { type TransferButtonProps } from "../../types/transfer";

function TransferButtonContent({
  recipient,
  amount,
  error,
  isSubmitting,
  isBurnAddress,
  isValidAddress,
  walletAddress,
}: TransferButtonProps) {
  // Check if form is valid
  const isFormValid = recipient && 
    amount && 
    isValidAddress && 
    !error && 
    !isSubmitting && 
    walletAddress;

  const getButtonContent = () => {
    if (isSubmitting) {
      return {
        icon: <LoadingSpinner size="sm" />,
        text: "Processing..."
      };
    }

    if (!recipient) {
      return {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
        ),
        text: "Enter Recipient"
      };
    }

    if (!isValidAddress) {
      return {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        ),
        text: "Invalid Address"
      };
    }

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

    if (error) {
      return {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        ),
        text: "Cannot Transfer"
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
      text: isBurnAddress ? `Burn ${amount} RISY` : `Transfer ${amount} RISY`
    };
  };

  const content = getButtonContent();

  return (
    <Button
      type="button"
      disabled={!isFormValid || isSubmitting || !!error || !walletAddress}
      variant={error ? 'secondary' : 'primary'}
      icon={content.icon}
    >
      {content.text}
    </Button>
  );
}

export function TransferButton(props: TransferButtonProps) {
  return (
    <ErrorBoundary title="Failed to load transfer button">
      <TransferButtonContent {...props} />
    </ErrorBoundary>
  );
} 