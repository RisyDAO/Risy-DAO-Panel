import { Card } from "../shared/Card";
import { Input } from "../shared/Input";
import { Button } from "../shared/Button";
import { StatusBadge } from "../shared/StatusBadge";

interface TransferPanelProps {
  recipient: string;
  setRecipient: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  error: string | null;
  isSubmitting: boolean;
  handleTransfer: () => void;
  recipientBalance: string;
  recipientRemainingHodl: number;
  isValidAddress: boolean;
  isRecipientLoading: boolean;
  isBurnAddress: boolean;
  isDAOAddress: boolean;
  walletAddress?: string;
}

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
}: TransferPanelProps) {
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

  // Button states and content
  const getButtonContent = () => {
    if (!walletAddress) {
      return (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
          <span>Connect Wallet</span>
        </>
      );
    }

    if (!recipient) {
      return (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <span>Enter Recipient</span>
        </>
      );
    }

    if (!isValidAddress) {
      return (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span>Invalid Address</span>
        </>
      );
    }

    if (!amount) {
      return (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span>Enter Amount</span>
        </>
      );
    }

    if (error) {
      return (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span>Cannot Transfer</span>
        </>
      );
    }

    if (isBurnAddress) {
      return (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" 
            />
          </svg>
          <span>Burn {amount} RISY</span>
        </>
      );
    }

    return (
      <>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Transfer {amount} RISY</span>
      </>
    );
  };

  return (
    <Card title={isBurnAddress ? 'Burn Tokens' : isDAOAddress ? 'Transfer to DAO' : 'Transfer Tokens'}>
      <form onSubmit={(e) => { e.preventDefault(); handleTransfer(); }} className="space-y-6">
        <div className="space-y-4">
          {/* Recipient Input */}
          <Input
            label="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            error={errorType === 'recipient' ? error : undefined}
            placeholder="0x..."
            rightElement={
              <button
                type="button"
                onClick={() => navigator.clipboard.readText().then(text => setRecipient(text))}
                className="text-[#9CA3AF] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </button>
            }
            helperText={recipient && walletAddress && isValidAddress ? `
              Balance: ${Number(recipientBalance).toFixed(2)} RISY
              HODL Limit Available: ${Number(recipientRemainingHodl).toFixed(2)} RISY
            ` : undefined}
          />

          {/* Amount Input */}
          <Input
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={errorType === 'amount' ? error : undefined}
            placeholder="0.0"
            rightElement={<span className="text-[#9CA3AF]">RISY</span>}
          />
        </div>

        {/* Notices */}
        {isBurnAddress && (
          <StatusBadge
            variant="info"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            }
          >
            Sending tokens to the null address (0x0) will burn them permanently. This action cannot be undone.
          </StatusBadge>
        )}

        {isDAOAddress && (
          <StatusBadge
            variant="info"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            }
          >
            Transferring to the DAO address. This transfer is exempt from time-based transfer limits.
          </StatusBadge>
        )}

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

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || !amount || !recipient || !!error || !walletAddress}
          isLoading={isSubmitting}
        >
          {getButtonContent()}
        </Button>
      </form>
    </Card>
  );
} 