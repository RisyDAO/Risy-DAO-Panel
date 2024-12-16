import { useEffect, useReducer } from "react";
import { useActiveWallet } from "thirdweb/react";
import { ContractFactory } from "../../contracts/factory";
import { type TokenTradeHookResult } from "../../types/trade";
import { handleError, TransactionError, isUserRejectedError } from "../../utils/errorUtils";
import { 
  tokenTradeReducer, 
  initialTokenTradeState 
} from "../../reducers/tokenTradeReducer";
import { type PreparedTransaction } from "thirdweb";

interface TokenTradeProps {
  type: 'buy' | 'sell';
  balance: string;
}

export function useTokenTrade({ 
  type,
  balance 
}: TokenTradeProps): TokenTradeHookResult {
  const [state, dispatch] = useReducer(tokenTradeReducer, initialTokenTradeState);
  const wallet = useActiveWallet();
  const account = wallet?.getAccount();

  // Calculate estimated output and price impact when amount changes
  useEffect(() => {
    if (!state.amount) {
      dispatch({ type: "SET_ESTIMATED_OUTPUT", payload: "0" });
      dispatch({ type: "SET_PRICE_IMPACT", payload: 0 });
      return;
    }

    // TODO: Implement price calculation logic
    const numAmount = Number(state.amount);
    const estimatedOutput = (numAmount * 0.98).toString(); // Placeholder calculation
    const priceImpact = 2; // Placeholder impact

    dispatch({ type: "SET_ESTIMATED_OUTPUT", payload: estimatedOutput });
    dispatch({ type: "SET_PRICE_IMPACT", payload: priceImpact });
  }, [state.amount]);

  // Validate trade
  useEffect(() => {
    const numAmount = state.amount ? Number(state.amount) : 0;
    const numBalance = Number(balance);

    if (!state.amount) {
      dispatch({ type: "SET_ERROR", payload: null });
      return;
    }

    if (isNaN(numAmount) || numAmount <= 0) {
      dispatch({ type: "SET_ERROR", payload: "Invalid amount" });
      return;
    }

    if (type === 'sell' && numAmount > numBalance) {
      dispatch({ type: "SET_ERROR", payload: `Insufficient balance (max: ${numBalance.toFixed(2)} RISY)` });
      return;
    }

    // TODO: Add more validations (slippage, liquidity, etc.)

    dispatch({ type: "SET_ERROR", payload: null });
  }, [state.amount, balance, type]);

  const prepareTrade = async (): Promise<PreparedTransaction> => {
    if (state.error || !state.amount || !account) {
      throw new TransactionError("Invalid trade parameters");
    }

    try {
      const tokenWriter = ContractFactory.getTokenWriter(account);
      
      // Return prepared transaction
      if (type === 'buy') {
        return tokenWriter.prepare("buy", [state.amount]);
      } else {
        return tokenWriter.prepare("sell", [state.amount]);
      }
    } catch (err) {
      if (isUserRejectedError(err)) {
        dispatch({ type: "SET_ERROR", payload: "Transaction was rejected by user" });
      } else {
        const walletError = handleError(err);
        dispatch({ type: "SET_ERROR", payload: walletError.message });
      }
      throw err;
    }
  };

  const prepareApprove = async (): Promise<PreparedTransaction> => {
    if (!account) {
      throw new TransactionError("Wallet not connected");
    }

    try {
      const tokenWriter = ContractFactory.getTokenWriter(account);
      return tokenWriter.prepare("approve", [state.amount]);
    } catch (err) {
      if (isUserRejectedError(err)) {
        dispatch({ type: "SET_ERROR", payload: "Transaction was rejected by user" });
      } else {
        const walletError = handleError(err);
        dispatch({ type: "SET_ERROR", payload: walletError.message });
      }
      throw err;
    }
  };

  return {
    state,
    setAmount: (value: string) => dispatch({ type: "SET_AMOUNT", payload: value }),
    prepareTrade,
    prepareApprove,
  };
} 