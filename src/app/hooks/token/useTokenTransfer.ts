import { useEffect, useReducer } from "react";
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
import { type TokenTransferHookResult } from "../../types/context";
import { handleError, TransactionError, isUserRejectedError } from "../../utils/errorUtils";
import { 
  tokenTransferReducer, 
  initialTokenTransferState 
} from "../../reducers/tokenTransferReducer";

interface TokenTransferProps {
  senderBalance: string;
  timedTransferLimit: string;
  isWhitelisted: boolean;
}

export function useTokenTransfer({ 
  senderBalance, 
  timedTransferLimit, 
  isWhitelisted 
}: TokenTransferProps): TokenTransferHookResult {
  const [state, dispatch] = useReducer(tokenTransferReducer, initialTokenTransferState);
  const wallet = useActiveWallet();
  const account = wallet?.getAccount();

  // Get recipient's balance and hodl limit (skip for burn address)
  const { data: recipientBalance, isLoading: isRecipientLoading } = useReadContract({
    contract: risyTokenContract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: isValidEthereumAddress(state.recipient) && !isBurnAddress(state.recipient) 
      ? [state.recipient] 
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
    const numAmount = state.amount ? Number(state.amount) : 0;
    const numSenderBalance = Number(senderBalance);
    const numTransferLimit = Number(timedTransferLimit);
    const numRecipientHodl = Number(recipientRemainingHodl);

    if (!state.amount && !state.recipient) {
      dispatch({ type: "SET_ERROR", payload: null });
      return;
    }

    if (state.recipient && !isValidEthereumAddress(state.recipient)) {
      dispatch({ type: "SET_ERROR", payload: "Invalid recipient address" });
      return;
    }

    // HODL limit validation
    if (state.recipient && !isBurnAddress(state.recipient) && !isDAOAddress(state.recipient, RISY_DAO) && state.amount) {
      if (!isNaN(numAmount) && numAmount > 0) {
        const effectiveHodlLimit = numRecipientHodl === 0 && maxBalance 
          ? Number(formatBalance(maxBalance, RISY_TOKEN_CONFIG.decimals))
          : numRecipientHodl;
          
        if (numAmount > effectiveHodlLimit) {
          dispatch({ type: "SET_ERROR", payload: `Exceeds recipient's HODL limit (max: ${effectiveHodlLimit.toFixed(2)} RISY)` });
          return;
        }
      }
    }

    // Amount validations
    if (state.amount) {
      if (isNaN(numAmount) || numAmount <= 0) {
        dispatch({ type: "SET_ERROR", payload: "Invalid amount" });
        return;
      }

      if (numAmount > numSenderBalance) {
        dispatch({ type: "SET_ERROR", payload: `Insufficient balance (max: ${numSenderBalance.toFixed(2)} RISY)` });
        return;
      }

      if (!isDAOAddress(state.recipient, RISY_DAO) && !isWhitelisted && numAmount > numTransferLimit) {
        dispatch({ type: "SET_ERROR", payload: `Exceeds transfer limit (max: ${numTransferLimit.toFixed(2)} RISY)` });
        return;
      }
    }

    dispatch({ type: "SET_ERROR", payload: null });
  }, [state.amount, state.recipient, senderBalance, timedTransferLimit, recipientRemainingHodl]);

  // Calculate maximum transferable amount
  useEffect(() => {
    if (!isValidEthereumAddress(state.recipient)) return;

    if (isWhitelisted || isDAOAddress(state.recipient, RISY_DAO)) {
      dispatch({ type: "SET_AMOUNT", payload: Number(senderBalance).toFixed(2) });
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

    dispatch({ type: "SET_AMOUNT", payload: maxAmount > 0 ? maxAmount.toFixed(2) : "0" });
  }, [state.recipient, recipientRemainingHodl, timedTransferLimit, senderBalance, isWhitelisted]);

  const handleTransfer = async () => {
    if (state.error || !state.amount || !isValidEthereumAddress(state.recipient) || !account) {
      throw new TransactionError("Invalid transfer parameters");
    }

    try {
      dispatch({ type: "SET_SUBMITTING", payload: true });
      const tokenWriter = ContractFactory.getTokenWriter(account);
      
      if (isBurnAddress(state.recipient)) {
        await tokenWriter.burn(state.amount);
      } else {
        await tokenWriter.transfer(state.recipient, state.amount);
      }
    } catch (err) {
      if (isUserRejectedError(err)) {
        dispatch({ type: "SET_ERROR", payload: "Transaction was rejected by user" });
      } else {
        const walletError = handleError(err);
        dispatch({ type: "SET_ERROR", payload: walletError.message });
      }
      throw err;
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
    }
  };

  return {
    ...state,
    recipientRemainingHodl: Number(recipientRemainingHodl),
    isValidAddress: isValidEthereumAddress(state.recipient),
    isBurnAddress: state.recipient ? isBurnAddress(state.recipient) : false,
    isDAOAddress: state.recipient ? isDAOAddress(state.recipient, RISY_DAO) : false,
    setRecipient: (value: string) => dispatch({ type: "SET_RECIPIENT", payload: value }),
    setAmount: (value: string) => dispatch({ type: "SET_AMOUNT", payload: value }),
    handleTransfer,
  };
} 