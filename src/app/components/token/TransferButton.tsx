import { Button } from "../shared/Button";
import { type TransferButtonProps } from "../../types/transfer";

export function TransferButton({
  recipient,
  amount,
  error,
  isSubmitting,
  walletAddress,
  isBurnAddress,
  isValidAddress
}: TransferButtonProps) {
  const getButtonContent = () => {
    if (!walletAddress) {
      return {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
        ),
        text: "Connect Wallet"
      };
    }

    if (!recipient) {
      return {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
        ),
        text: "Enter Recipient"
      };
    }

    if (!isValidAddress) {
      return {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        ),
        text: "Invalid Address"
      };
    }

    // ... rest of the button content logic ...

    return {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      text: isBurnAddress ? `Burn ${amount} RISY` : `Transfer ${amount} RISY`
    };
  };

  const content = getButtonContent();

  return (
    <Button
      type="submit"
      disabled={isSubmitting || !amount || !recipient || !!error || !walletAddress}
      isLoading={isSubmitting}
    >
      {content.icon}
      <span>{content.text}</span>
    </Button>
  );
} 