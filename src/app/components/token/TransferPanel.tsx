import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Card } from "../shared/Card";
import { TransferButton } from "./TransferButton";
import { TransferNotice } from "./TransferNotice";
import { TransferInput } from "./TransferInput";
import { useToken } from "../../contexts/TokenContext";
import { useWallet } from "../../contexts/WalletContext";
import { ErrorFallback } from "../shared/ErrorFallback";

function TransferPanelContent() {
  const { transfer } = useToken();
  const { walletAddress } = useWallet();
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

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleTransfer(); }} className="space-y-6">
      <div className="space-y-4">
        <TransferInput
          type="recipient"
          value={state.recipient}
          onChange={setRecipient}
          error={errorType === "recipient" ? state.error : undefined}
        />

        <TransferInput
          type="amount"
          value={state.amount}
          onChange={setAmount}
          error={errorType === "amount" ? state.error : undefined}
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

export function TransferPanel() {
  const { transfer: { state } } = useToken();

  return (
    <Card title={state.isBurnAddress ? 'Burn Tokens' : state.isDAOAddress ? 'Transfer to DAO' : 'Transfer Tokens'}>
      <ErrorBoundary title="Failed to load transfer panel">
        <TransferPanelContent />
      </ErrorBoundary>
    </Card>
  );
} 