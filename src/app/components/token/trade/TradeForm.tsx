import { ErrorBoundary } from "../../shared/ErrorBoundary";
import { TradeInput } from './TradeInput';
import { TradeSummary } from './TradeSummary';
import { TradeButtonWrapper } from './TradeButtonWrapper';
import { useToken } from '../../../contexts/TokenContext';
import { useState } from 'react';
import { StatusBadge } from "../../shared/StatusBadge";
import { type TransactionReceipt } from "thirdweb/transaction";

function TradeFormContent({ type }: { type: 'buy' | 'sell' }) {
  const { trade: { state, setAmount } } = useToken();
  const [transactionStatus, setTransactionStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

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

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <TradeInput
        type={type}
        amount={state.amount}
        onChange={setAmount}
        estimatedOutput={state.estimatedOutput}
      />
      
      <TradeSummary
        type={type}
        amount={state.amount}
        estimatedOutput={state.estimatedOutput}
        priceImpact={state.priceImpact}
      />

      {/* Transaction Status */}
      {transactionStatus?.message && (
        <StatusBadge
          variant={transactionStatus.success ? "success" : transactionStatus.success === false ? "error" : "info"}
          icon={
            transactionStatus.success ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
      )}
      
      <TradeButtonWrapper
        type={type}
        amount={state.amount}
        isApproved={state.isApproved}
        payModal={{
          metadata: {
            name: `${type === 'buy' ? 'Buy' : 'Sell'} RISY Token`,
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

export function TradeForm(props: { type: 'buy' | 'sell' }) {
  return (
    <ErrorBoundary title="Failed to load trade form">
      <TradeFormContent {...props} />
    </ErrorBoundary>
  );
} 