import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Card } from "../shared/Card";
import { TransferButton } from "./TransferButton";
import { TransferNotice } from "./TransferNotice";
import { TransferInput } from "./TransferInput";
import { StatusBadge } from "../shared/StatusBadge";
import { useToken } from "../../contexts/TokenContext";
import { useWallet } from "../../contexts/WalletContext";

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
            : state.error
          }
        </StatusBadge>
      )}

      <TransferButton />
    </form>
  );
}

export function TransferPanel({ walletAddress }: TransferPanelProps) {
  const { transfer: { state } } = useToken();

  return (
    <Card title={state.isBurnAddress ? 'Burn Tokens' : state.isDAOAddress ? 'Transfer to DAO' : 'Transfer Tokens'}>
      <ErrorBoundary
        fallback={
          <StatusBadge
            variant="error"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            }
          >
            <div>
              <h3 className="font-semibold text-inherit">Failed to load transfer panel</h3>
              <p className="text-sm opacity-90">
                Please try refreshing the page
              </p>
            </div>
          </StatusBadge>
        }
      >
        <TransferPanelContent walletAddress={walletAddress} />
      </ErrorBoundary>
    </Card>
  );
} 