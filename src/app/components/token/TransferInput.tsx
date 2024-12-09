import { Input } from "../shared/Input";
import { StatusBadge } from "../shared/StatusBadge";
import { type TransferInputProps } from "../../types/transfer";
import { ErrorBoundary } from "../shared/ErrorBoundary";

function TransferInputContent({
  type,
  value,
  onChange,
  error,
  balance,
  hodlLimit,
  isValidAddress,
  walletAddress
}: TransferInputProps) {
  // Convert error to string | undefined for the Input component
  const inputError = error ? error : undefined;

  if (type === "recipient") {
    return (
      <Input
        label="Recipient Address"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={inputError}
        placeholder="0x..."
        rightElement={
          <button
            type="button"
            onClick={() => navigator.clipboard.readText().then(text => onChange(text))}
            className="text-[#9CA3AF] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
              />
            </svg>
          </button>
        }
        helperText={value && walletAddress && isValidAddress ? `
          Balance: ${Number(balance).toFixed(2)} RISY
          HODL Limit Available: ${Number(hodlLimit).toFixed(2)} RISY
        ` : undefined}
      />
    );
  }

  return (
    <Input
      label="Amount"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={inputError}
      placeholder="0.0"
      rightElement={<span className="text-[#9CA3AF]">RISY</span>}
    />
  );
}

export function TransferInput(props: TransferInputProps) {
  return (
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
            <h3 className="font-semibold text-inherit">Failed to load input</h3>
            <p className="text-sm opacity-90">
              Please try refreshing the page
            </p>
          </div>
        </StatusBadge>
      }
    >
      <TransferInputContent {...props} />
    </ErrorBoundary>
  );
} 