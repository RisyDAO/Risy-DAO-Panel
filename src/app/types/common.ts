import { type ReactNode } from "react";

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data?: T;
}

export interface ErrorState {
  error: string;
  code?: number;
  details?: string;
}

export interface ComponentBaseProps {
  className?: string;
  children?: ReactNode;
}

export type Status = 'idle' | 'loading' | 'success' | 'error'; 