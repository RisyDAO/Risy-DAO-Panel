import { Card } from "../shared/Card";
import { Input } from "../shared/Input";
import { Button } from "../shared/Button";
import { StatusBadge } from "../shared/StatusBadge";
import { TransferButton } from "./TransferButton";
import { TransferNotice } from "./TransferNotice";
import { TransferInput } from "./TransferInput";
import { type TransferFormProps } from "../../types/transfer";

export function TransferPanel({
  recipient,
  setRecipient,
  amount,
  setAmount,
  error,
  isSubmitting,
  handleTransfer,
  recipientBalance,
  recipientRemainingHodl,
  isValidAddress,
  isRecipientLoading,
  isBurnAddress,
  isDAOAddress,
  walletAddress
}: TransferFormProps) {
  // Determine if we should show wallet connection error
  const showWalletError = !walletAddress && (recipient || amount);

  // Split error messages by type
  const getErrorType = () => {
    if (!error) return null;
    if (error.includes("recipient") || error.includes("address")) return "recipient";
    if (error.includes("amount") || error.includes("balance") || error.includes("limit")) return "amount";
    return "general";
  };

  const errorType = getErrorType();

  // Convert error to string or undefined for the Input component
  const getInputError = (type: 'recipient' | 'amount'): string | undefined => {
    if (errorType === type && error) {
      return error;
    }
    return undefined;
  };

  return (
    <Card title={isBurnAddress ? 'Burn Tokens' : isDAOAddress ? 'Transfer to DAO' : 'Transfer Tokens'}>
      <form onSubmit={(e) => { e.preventDefault(); handleTransfer(); }} className="space-y-6">
        <div className="space-y-4">
          <TransferInput
            type="recipient"
            value={recipient}
            onChange={setRecipient}
            error={getInputError('recipient')}
            balance={recipientBalance}
            hodlLimit={recipientRemainingHodl}
            isValidAddress={isValidAddress}
            walletAddress={walletAddress}
          />

          <TransferInput
            type="amount"
            value={amount}
            onChange={setAmount}
            error={getInputError('amount')}
          />
        </div>

        <TransferNotice 
          isBurnAddress={isBurnAddress} 
          isDAOAddress={isDAOAddress} 
        />

        {/* General Error */}
        {(showWalletError || errorType === 'general') && (
          <StatusBadge
            variant="error"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            }
          >
            {showWalletError 
              ? "Please connect your wallet to transfer tokens"
              : error
            }
          </StatusBadge>
        )}

        <TransferButton
          recipient={recipient}
          amount={amount}
          error={error}
          isSubmitting={isSubmitting}
          walletAddress={walletAddress}
          isBurnAddress={isBurnAddress}
          isValidAddress={isValidAddress}
        />
      </form>
    </Card>
  );
} 