import { type TokenTransferState } from "../types/context";

export type TokenTransferAction =
  | { type: "SET_RECIPIENT"; payload: string }
  | { type: "SET_AMOUNT"; payload: string }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_RECIPIENT_BALANCE"; payload: string }
  | { type: "SET_RECIPIENT_HODL"; payload: number }
  | { type: "RESET_STATE" };

export const initialTokenTransferState: TokenTransferState = {
  recipient: "",
  amount: "",
  error: null,
  isSubmitting: false,
  recipientBalance: "0",
  recipientRemainingHodl: 0,
  isValidAddress: false,
  isRecipientLoading: false,
  isBurnAddress: false,
  isDAOAddress: false
};

export function tokenTransferReducer(
  state: TokenTransferState,
  action: TokenTransferAction
): TokenTransferState {
  switch (action.type) {
    case "SET_RECIPIENT":
      return { ...state, recipient: action.payload };
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "SET_RECIPIENT_BALANCE":
      return { ...state, recipientBalance: action.payload };
    case "SET_RECIPIENT_HODL":
      return { ...state, recipientRemainingHodl: action.payload };
    case "RESET_STATE":
      return initialTokenTransferState;
    default:
      return state;
  }
} 