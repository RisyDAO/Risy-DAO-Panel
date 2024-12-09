import { useState, useEffect } from "react";
import { useActiveWallet, useReadContract } from "thirdweb/react";
import { risyTokenContract } from "../../client";
import { RISY_TOKEN_CONFIG } from "../../config/tokens";
import { RISY_DAO } from "../../config/contracts";
import { 
  isValidEthereumAddress, 
  isBurnAddress, 
  isDAOAddress,
  NULL_ADDRESS 
} from "../../utils/addressUtils";
import { formatBalance } from "../../utils/formatUtils";
import { ContractFactory } from "../../contracts/factory";

interface TokenTransferProps {
  senderBalance: string;
  timedTransferLimit: string;
  isWhitelisted: boolean;
}

export function useTokenTransfer({ senderBalance, timedTransferLimit, isWhitelisted }: TokenTransferProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wallet = useActiveWallet();
  const account = wallet?.getAccount();

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

  // Format values
  const formattedRecipientBalance = formatBalance(recipientBalance, RISY_TOKEN_CONFIG.decimals);
  const formattedMaxBalance = formatBalance(maxBalance, RISY_TOKEN_CONFIG.decimals);

  // Calculate recipient's remaining HODL limit
  const recipientRemainingHodl = maxBalance 
    ? Number(recipientBalance) === 0
      ? Number(formattedMaxBalance)
      : Math.max(0, Number(formattedMaxBalance) - Number(formattedRecipientBalance))
    : 0;

  // Validate transfer
  useEffect(() => {
    const numAmount = amount ? Number(amount) : 0;
    const numSenderBalance = Number(senderBalance);
    const numTransferLimit = Number(timedTransferLimit);
    const numRecipientHodl = Number(recipientRemainingHodl);

    if (!amount && !recipient) {
      setError(null);
      return;
    }

    if (recipient && !isValidEthereumAddress(recipient)) {
      setError("Invalid recipient address");
      return;
    }

    // HODL limit validation
    if (recipient && !isBurnAddress(recipient) && !isDAOAddress(recipient, RISY_DAO) && amount) {
      if (!isNaN(numAmount) && numAmount > 0) {
        const effectiveHodlLimit = numRecipientHodl === 0 && maxBalance 
          ? Number(formatBalance(maxBalance, RISY_TOKEN_CONFIG.decimals))
          : numRecipientHodl;
          
        if (numAmount > effectiveHodlLimit) {
          setError(`Exceeds recipient's HODL limit (max: ${effectiveHodlLimit.toFixed(2)} RISY)`);
          return;
        }
      }
    }

    // Amount validations
    if (amount) {
      if (isNaN(numAmount) || numAmount <= 0) {
        setError("Invalid amount");
        return;
      }

      if (numAmount > numSenderBalance) {
        setError(`Insufficient balance (max: ${numSenderBalance.toFixed(2)} RISY)`);
        return;
      }

      if (!isDAOAddress(recipient, RISY_DAO) && !isWhitelisted && numAmount > numTransferLimit) {
        setError(`Exceeds transfer limit (max: ${numTransferLimit.toFixed(2)} RISY)`);
        return;
      }
    }

    setError(null);
  }, [amount, recipient, senderBalance, timedTransferLimit, recipientRemainingHodl, isWhitelisted, maxBalance]);

  // Calculate maximum transferable amount
  useEffect(() => {
    if (!isValidEthereumAddress(recipient)) return;

    if (isWhitelisted || isDAOAddress(recipient, RISY_DAO)) {
      setAmount(Number(senderBalance).toFixed(2));
      return;
    }

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
    if (error || !amount || !isValidEthereumAddress(recipient) || !account) return;

    try {
      setIsSubmitting(true);
      const tokenWriter = ContractFactory.getTokenWriter(account);
      
      if (isBurnAddress(recipient)) {
        await tokenWriter.burn(amount);
      } else {
        await tokenWriter.transfer(recipient, amount);
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
    isDAOAddress: recipient ? isDAOAddress(recipient, RISY_DAO) : false,
  };
} 