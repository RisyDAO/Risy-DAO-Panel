import { useToken } from "../../contexts/TokenContext";
import { TransferButton } from "./TransferButton";
import { ErrorBoundary } from "../shared/ErrorBoundary";
import { useWallet } from "../../contexts/WalletContext";
import { type TransferButtonWrapperProps } from "../../types/transaction";
import { TransactionButtonWrapper } from "../shared/TransactionButtonWrapper";

function TransferButtonContent({ 
  className,
  unstyled = true,
  disabled = false,
  payModal,
  onTransactionSent,
  onTransactionConfirmed,
  onError
}: TransferButtonWrapperProps) {
  const { transfer: { state, prepareTransfer } } = useToken();
  const { walletAddress } = useWallet();
  const { 
    recipient, 
    amount, 
    error, 
    isSubmitting,
    isValidAddress,
    isBurnAddress 
  } = state;

  // Check if form is valid
  const isFormValid = recipient && 
    amount && 
    isValidAddress && 
    !error && 
    !isSubmitting && 
    walletAddress;

  // Only show TransactionButton if all validations pass
  const showTransactionButton = isFormValid;

  // Use TransferButton for invalid states
  if (!showTransactionButton) {
    return (
      <TransferButton
        recipient={recipient}
        amount={amount}
        error={error}
        isSubmitting={isSubmitting}
        isBurnAddress={isBurnAddress}
        isValidAddress={isValidAddress}
        walletAddress={walletAddress}
        className={className}
      />
    );
  }

  return (
    <TransactionButtonWrapper
      transaction={prepareTransfer}
      onTransactionSent={onTransactionSent}
      onTransactionConfirmed={onTransactionConfirmed}
      onError={onError}
      unstyled={unstyled}
      disabled={disabled || !isFormValid}
      payModal={payModal}
      className={className}
    >
      <div className="flex items-center justify-center space-x-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M13 10V3L4 14h7v7l9-11h-7z" 
          />
        </svg>
        <span className="font-medium">
          {isBurnAddress ? `Burn ${amount} RISY` : `Transfer ${amount} RISY`}
        </span>
      </div>
    </TransactionButtonWrapper>
  );
}

export function TransferButtonWrapper(props: TransferButtonWrapperProps) {
  return (
    <ErrorBoundary title="Failed to load transfer button">
      <TransferButtonContent {...props} />
    </ErrorBoundary>
  );
} 