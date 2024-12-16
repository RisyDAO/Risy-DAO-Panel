import { type TradeState } from "../types/trade";

export type TokenTradeAction =
  | { type: "SET_AMOUNT"; payload: string }
  | { type: "SET_ESTIMATED_OUTPUT"; payload: string }
  | { type: "SET_PRICE_IMPACT"; payload: number }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_APPROVED"; payload: boolean }
  | { type: "RESET_STATE" };

export const initialTokenTradeState: TradeState = {
  amount: "",
  estimatedOutput: "0",
  priceImpact: 0,
  error: null,
  isSubmitting: false,
  isApproved: false
};

export function tokenTradeReducer(
  state: TradeState,
  action: TokenTradeAction
): TradeState {
  switch (action.type) {
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_ESTIMATED_OUTPUT":
      return { ...state, estimatedOutput: action.payload };
    case "SET_PRICE_IMPACT":
      return { ...state, priceImpact: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "SET_APPROVED":
      return { ...state, isApproved: action.payload };
    case "RESET_STATE":
      return initialTokenTradeState;
    default:
      return state;
  }
} 