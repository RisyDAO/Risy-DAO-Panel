import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Card } from "../shared/Card";
import { TransferButtonWrapper } from "./transfer/TransferButtonWrapper";
import { TransferNotice } from "./transfer/TransferNotice";
import { TransferInput } from "./transfer/TransferInput";
import { useToken } from "../../contexts/TokenContext";
import { useWallet } from "../../contexts/WalletContext";
import { ErrorFallback } from "../shared/ErrorFallback";
import { StatusBadge } from "../shared/StatusBadge";
import { useState, useEffect } from "react";
import { type TransactionReceipt } from "thirdweb/transaction";

function TransferPanelContent() {
  const { transfer } = useToken();
  const { walletAddress } = useWallet();
  const { state, setRecipient, setAmount } = transfer;
  const [showWalletError, setShowWalletError] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  useEffect(() => {
    if (!walletAddress && (state.recipient || state.amount)) {
      setShowWalletError(true);
    } else {
      setShowWalletError(false);
    }
  }, [walletAddress, state.recipient, state.amount]);

  // Split error messages by type
  const getErrorType = () => {
    if (!state.error) return null;
    if (state.error.includes("recipient") || state.error.includes("address")) return "recipient";
    if (state.error.includes("amount") || state.error.includes("balance") || state.error.includes("limit")) return "amount";
    return "general";
  };

  const errorType = getErrorType();

  const handleTransactionSent = (tx: any) => {
    setTransactionStatus({
      message: "Transaction sent. Waiting for confirmation..."
    });
  };

  const handleTransactionConfirmed = (receipt: TransactionReceipt) => {
    setTransactionStatus({
      success: true,
      message: "Transaction confirmed successfully!"
    });
    
    // Reset form after successful transaction
    setRecipient("");
    setAmount("");
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setTransactionStatus(null);
    }, 5000);
  };

  const handleTransactionError = (error: Error) => {
    setTransactionStatus({
      success: false,
      message: error.message
    });
  };

  const handleCloseStatus = () => {
    setTransactionStatus(null);
  };

  const handleCloseWalletError = () => {
    setShowWalletError(false);
    // Clear form when dismissing wallet error
    setRecipient("");
    setAmount("");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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

      {/* Transaction Status */}
      {transactionStatus?.message && (
        <div className="relative">
          <StatusBadge
            variant={transactionStatus.success ? "success" : transactionStatus.success === false ? "error" : "info"}
            icon={
              transactionStatus.success ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              ) : transactionStatus.success === false ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
              )
            }
          >
            <div className="flex items-center justify-between w-full">
              <p>{transactionStatus.message}</p>
              {transactionStatus.success === false && (
                <button
                  type="button"
                  onClick={handleCloseStatus}
                  className="ml-4 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </StatusBadge>
        </div>
      )}

      {/* General Error */}
      {(showWalletError || errorType === 'general') && (
        <ErrorFallback
          title={showWalletError ? "Wallet Not Connected" : "Transfer Error"}
          message={showWalletError 
            ? "Please connect your wallet to transfer tokens"
            : state.error || "An error occurred while processing your transfer"
          }
          onClose={showWalletError ? handleCloseWalletError : () => setTransactionStatus(null)}
        />
      )}

      <TransferButtonWrapper
        payModal={{
          metadata: {
            name: state.isBurnAddress ? "RISY Token Burn" : "RISY Token Transfer",
            image: "./img/logo.png"
          }
        }}
        onTransactionSent={handleTransactionSent}
        onTransactionConfirmed={handleTransactionConfirmed}
        onError={handleTransactionError}
      />
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