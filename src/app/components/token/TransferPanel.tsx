import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Card } from "../shared/Card";
import { TransferButton } from "./TransferButton";
import { TransferNotice } from "./TransferNotice";
import { TransferInput } from "./TransferInput";
import { useToken } from "../../contexts/TokenContext";
import { useWallet } from "../../contexts/WalletContext";
import { ErrorFallback } from "../shared/ErrorFallback";

interface TransferPanelProps {
  walletAddress?: string;
}

function TransferPanelContent({ walletAddress }: TransferPanelProps) {
  const { transfer } = useToken();
  const { state, setRecipient, setAmount, handleTransfer } = transfer;

  // Determine if we should show wallet connection error
  const showWalletError = !walletAddress && (state.recipient || state.amount);

  // Split error messages by type
  const getErrorType = () => {
    if (!state.error) return null;
    if (state.error.includes("recipient") || state.error.includes("address")) return "recipient";
    if (state.error.includes("amount") || state.error.includes("balance") || state.error.includes("limit")) return "amount";
    return "general";
  };

  const errorType = getErrorType();

  // Convert error to string or undefined for the Input component
  const getInputError = (type: 'recipient' | 'amount'): string | undefined => {
    if (errorType === type && state.error) {
      return state.error;
    }
    return undefined;
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleTransfer(); }} className="space-y-6">
      <div className="space-y-4">
        <TransferInput
          type="recipient"
          value={state.recipient}
          onChange={setRecipient}
          error={getInputError('recipient')}
          balance={state.recipientBalance}
          hodlLimit={Number(state.recipientRemainingHodl)}
          isValidAddress={state.isValidAddress}
          walletAddress={walletAddress}
        />

        <TransferInput
          type="amount"
          value={state.amount}
          onChange={setAmount}
          error={getInputError('amount')}
        />
      </div>

      <TransferNotice />

      {/* General Error */}
      {(showWalletError || errorType === 'general') && (
        <ErrorFallback
          title={showWalletError ? "Wallet Not Connected" : "Transfer Error"}
          message={showWalletError 
            ? "Please connect your wallet to transfer tokens"
            : state.error || "An error occurred while processing your transfer"
          }
        />
      )}

      <TransferButton />
    </form>
  );
}

export function TransferPanel({ walletAddress }: TransferPanelProps) {
  const { transfer: { state } } = useToken();

  return (
    <Card title={state.isBurnAddress ? 'Burn Tokens' : state.isDAOAddress ? 'Transfer to DAO' : 'Transfer Tokens'}>
      <ErrorBoundary title="Failed to load transfer panel">
        <TransferPanelContent walletAddress={walletAddress} />
      </ErrorBoundary>
    </Card>
  );
} 