import { useState, useEffect } from "react";
import { prepareContractCall } from "thirdweb";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import { risyTokenContract } from "../client";
import { RISY_TOKEN_CONFIG } from "../constants";

// Helper function to validate Ethereum address
function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

const BUFFER = 0.01; // Buffer for limits

function calculateWithBuffer(value: number): number {
  if (isNaN(value) || !isFinite(value)) return 0;
  return Math.max(0, value - BUFFER);
}

function formatBalance(value: bigint | undefined, decimals: number): string {
  if (!value) return "0";
  try {
    return (Number(value) / Math.pow(10, decimals)).toLocaleString('en-US', {
      maximumFractionDigits: 2,
      useGrouping: false
    });
  } catch (e) {
    return "0";
  }
}

export function useRisyTransfer(senderBalance: string, timedTransferLimit: string) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get recipient's balance and hodl limit
  const { data: recipientBalance, isLoading: isRecipientLoading } = useReadContract({
    contract: risyTokenContract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: isValidEthereumAddress(recipient) ? [recipient] : ["0x0000000000000000000000000000000000000000"]
  });

  // Get max balance limit
  const { data: maxBalance } = useReadContract({
    contract: risyTokenContract,
    method: "function getMaxBalance() view returns (uint256)",
    params: []
  });

  const { mutate: sendTransaction } = useSendTransaction();

  // Format values
  const formattedRecipientBalance = formatBalance(recipientBalance, RISY_TOKEN_CONFIG.decimals);
  const formattedMaxBalance = formatBalance(maxBalance, RISY_TOKEN_CONFIG.decimals);

  const recipientRemainingHodl = maxBalance && recipientBalance
    ? Math.max(0, Number(formattedMaxBalance) - Number(formattedRecipientBalance))
    : 0;

  // Validate transfer with buffer considerations
  useEffect(() => {
    // Create stable values first
    const numAmount = amount ? Number(amount) : 0;
    const numSenderBalance = Number(senderBalance);
    const numTransferLimit = Number(timedTransferLimit);
    const numRecipientHodl = Number(recipientRemainingHodl);

    if (!amount && !recipient) {
      setError(null);
      return;
    }

    // Only validate recipient if there's an address entered
    if (recipient) {
      if (!isValidEthereumAddress(recipient)) {
        setError("Invalid recipient address");
        return;
      }

      // Only check recipient's HODL limit if we have a valid address and amount
      if (amount) {
        const availableHodl = calculateWithBuffer(numRecipientHodl);
        if (!isNaN(numAmount) && numAmount > 0 && numAmount > availableHodl) {
          setError(`Exceeds recipient's HODL limit (max: ${availableHodl.toFixed(2)} RISY)`);
          return;
        }
      }
    }

    // Amount validations (independent of recipient)
    if (amount) {
      if (isNaN(numAmount) || numAmount <= 0) {
        setError("Invalid amount");
        return;
      }

      const availableBalance = calculateWithBuffer(numSenderBalance);
      if (numAmount > availableBalance) {
        setError(`Insufficient balance (max: ${availableBalance.toFixed(2)} RISY)`);
        return;
      }

      const availableTransferLimit = calculateWithBuffer(numTransferLimit);
      if (numAmount > availableTransferLimit) {
        setError(`Exceeds transfer limit (max: ${availableTransferLimit.toFixed(2)} RISY)`);
        return;
      }
    }

    setError(null);
  }, [amount, recipient, senderBalance, timedTransferLimit, recipientRemainingHodl]); // Stable dependency array

  // Calculate maximum transferable amount
  useEffect(() => {
    if (!isValidEthereumAddress(recipient)) return;

    // Create stable values
    const numTransferLimit = Number(timedTransferLimit);
    const numSenderBalance = Number(senderBalance);
    const numRecipientHodl = Number(recipientRemainingHodl);

    const maxAmount = Math.min(
      calculateWithBuffer(numTransferLimit),
      calculateWithBuffer(numSenderBalance),
      calculateWithBuffer(numRecipientHodl)
    );

    setAmount(maxAmount > 0 ? maxAmount.toFixed(2) : "0");
  }, [recipient, recipientRemainingHodl, timedTransferLimit, senderBalance]); // Stable dependency array

  const handleTransfer = async () => {
    if (error || !amount || !isValidEthereumAddress(recipient)) return;

    try {
      setIsSubmitting(true);
      const amountInWei = BigInt(Math.floor(Number(amount) * Math.pow(10, RISY_TOKEN_CONFIG.decimals)));
      
      const transaction = prepareContractCall({
        contract: risyTokenContract,
        method: "function transfer(address to, uint256 value) returns (bool)",
        params: [recipient, amountInWei],
      });

      await sendTransaction(transaction);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transfer failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    recipient,
    setRecipient,
    amount,
    setAmount,
    error,
    isSubmitting,
    handleTransfer,
    recipientBalance: formattedRecipientBalance,
    recipientRemainingHodl,
    isValidAddress: isValidEthereumAddress(recipient),
    isRecipientLoading,
  };
} 