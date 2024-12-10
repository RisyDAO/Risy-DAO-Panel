import { TransactionButton } from "thirdweb/react";
import { ErrorBoundary } from "./ErrorBoundary";
import { getButtonStyles } from "./button/ButtonStyles";
import { type TransactionButtonWrapperProps } from "../../types/transaction";
import { risyDaoTheme } from "../../config/theme";

function TransactionButtonContent({ 
  className,
  unstyled = true,
  disabled = false,
  payModal,
  onTransactionSent,
  onTransactionConfirmed,
  onError,
  transaction,
  children
}: TransactionButtonWrapperProps) {
  // Use shared button styles
  const defaultClassName = `
    ${getButtonStyles('primary', disabled)}
    w-full flex items-center justify-center space-x-2
  `;

  return (
    <TransactionButton
      transaction={transaction}
      onTransactionSent={onTransactionSent}
      onTransactionConfirmed={onTransactionConfirmed}
      onError={onError}
      unstyled={unstyled}
      disabled={disabled}
      payModal={{
        ...payModal,
        theme: risyDaoTheme
      }}
      className={className || defaultClassName}
    >
      {children}
    </TransactionButton>
  );
}

export function TransactionButtonWrapper(props: TransactionButtonWrapperProps) {
  return (
    <ErrorBoundary title="Failed to load transaction button">
      <TransactionButtonContent {...props} />
    </ErrorBoundary>
  );
} 