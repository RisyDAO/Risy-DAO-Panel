import { useState, useEffect } from "react";
import { prepareContractCall } from "thirdweb";
import { useReadContract, useSendTransaction, useActiveWallet } from "thirdweb/react";
import { risyTokenContract } from "../client";
import { RISY_TOKEN_CONFIG, RISY_DAO } from "../constants";

// Helper function to validate Ethereum address
function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
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

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

function isBurnAddress(address: string): boolean {
  return address.toLowerCase() === NULL_ADDRESS.toLowerCase();
}

function isDAOAddress(address: string): boolean {
  return address.toLowerCase() === RISY_DAO.toLowerCase();
}

export function useRisyTransfer(senderBalance: string, timedTransferLimit: string) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get wallet address
  const wallet = useActiveWallet();
  const walletAddress = wallet?.getAccount()?.address;

  // Get recipient's balance and hodl limit (skip for burn address)
  const { data: recipientBalance, isLoading: isRecipientLoading } = useReadContract({
    contract: risyTokenContract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: isValidEthereumAddress(recipient) && !isBurnAddress(recipient) 
      ? [recipient] 
      : [NULL_ADDRESS]
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

  // Get whitelist status
  const { data: isWhitelisted } = useReadContract({
    contract: risyTokenContract,
    method: "function isWhiteListed(address account) view returns (bool)",
    params: walletAddress ? [walletAddress] : ["0x0000000000000000000000000000000000000000"]
  });

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

      // Skip HODL limit check for burn address and DAO
      if (!isBurnAddress(recipient) && !isDAOAddress(recipient) && amount) {
        if (!isNaN(numAmount) && numAmount > 0 && numAmount > numRecipientHodl) {
          setError(`Exceeds recipient's HODL limit (max: ${numRecipientHodl.toFixed(2)} RISY)`);
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

      if (numAmount > numSenderBalance) {
        setError(`Insufficient balance (max: ${numSenderBalance.toFixed(2)} RISY)`);
        return;
      }

      // Skip transfer limit check if recipient is DAO or sender is whitelisted
      if (!isDAOAddress(recipient) && !isWhitelisted) {
        if (numAmount > numTransferLimit) {
          setError(`Exceeds transfer limit (max: ${numTransferLimit.toFixed(2)} RISY)`);
          return;
        }
      }
    }

    setError(null);
  }, [amount, recipient, senderBalance, timedTransferLimit, recipientRemainingHodl, isWhitelisted]);

  // Calculate maximum transferable amount
  useEffect(() => {
    if (!isValidEthereumAddress(recipient)) return;

    // If whitelisted or transferring to DAO, use full balance as max amount
    if (isWhitelisted || isDAOAddress(recipient)) {
      setAmount(Number(senderBalance).toFixed(2));
      return;
    }

    // Create stable values
    const numTransferLimit = Number(timedTransferLimit);
    const numSenderBalance = Number(senderBalance);
    const numRecipientHodl = Number(recipientRemainingHodl);

    const maxAmount = Math.min(
      numTransferLimit,
      numSenderBalance,
      numRecipientHodl
    );

    setAmount(maxAmount > 0 ? maxAmount.toFixed(2) : "0");
  }, [recipient, recipientRemainingHodl, timedTransferLimit, senderBalance, isWhitelisted]);

  const handleTransfer = async () => {
    if (error || !amount || !isValidEthereumAddress(recipient)) return;

    try {
      setIsSubmitting(true);
      const amountInWei = BigInt(Math.floor(Number(amount) * Math.pow(10, RISY_TOKEN_CONFIG.decimals)));
      
      // Use burn function for null address
      if (isBurnAddress(recipient)) {
        const transaction = prepareContractCall({
          contract: risyTokenContract,
          method: "function burn(uint256 value)",
          params: [amountInWei],
        });
        await sendTransaction(transaction);
      } else {
        const transaction = prepareContractCall({
          contract: risyTokenContract,
          method: "function transfer(address to, uint256 value) returns (bool)",
          params: [recipient, amountInWei],
        });
        await sendTransaction(transaction);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction failed");
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
    isBurnAddress: recipient ? isBurnAddress(recipient) : false,
    isDAOAddress: recipient ? isDAOAddress(recipient) : false,
  };
} 