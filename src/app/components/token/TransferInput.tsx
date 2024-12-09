import { Input } from "../shared/Input";
import { useToken } from "../../contexts/TokenContext";
import { ErrorBoundary } from "../shared/ErrorBoundary";
import { type TransferInputProps } from "../../types/transfer";

function TransferInputContent({
  type,
  value,
  onChange,
  error,
}: TransferInputProps) {
  const { transfer: { state } } = useToken();

  if (type === "recipient") {
    const helperText = value && state.isValidAddress ? [
      `Balance: ${state.recipientBalance} RISY`,
      `HODL Limit Available: ${state.recipientRemainingHodl} RISY`
    ] : undefined;

    return (
      <Input
        label="Recipient Address"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error || undefined}
        placeholder="0x..."
        rightElement={
          <button
            type="button"
            onClick={() => navigator.clipboard.readText().then(text => onChange(text))}
            className="text-text-muted hover:text-text transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
              />
            </svg>
          </button>
        }
        helperText={helperText}
      />
    );
  }

  return (
    <Input
      label="Amount"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error || undefined}
      placeholder="0.0"
      rightElement={<span className="text-text-muted">RISY</span>}
    />
  );
}

export function TransferInput(props: TransferInputProps) {
  return (
    <ErrorBoundary title="Failed to load transfer input">
      <TransferInputContent {...props} />
    </ErrorBoundary>
  );
} 