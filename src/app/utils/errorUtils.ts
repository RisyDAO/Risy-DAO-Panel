import { type WalletError } from "../types/wallet";

export class AppError extends Error {
  code: number;
  details?: string;

  constructor(message: string, code: number = 500, details?: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
  }
}

export class WalletConnectionError extends AppError {
  constructor(message: string, details?: string) {
    super(message, 401, details);
    this.name = 'WalletConnectionError';
  }
}

export class TransactionError extends AppError {
  constructor(message: string, details?: string) {
    super(message, 400, details);
    this.name = 'TransactionError';
  }
}

export function handleError(error: unknown): WalletError {
  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      code: 500,
      message: error.message,
    };
  }

  return {
    code: (error as AppError).code || 500,
    message: (error as AppError).message || 'An unexpected error occurred',
  };
}

export function isUserRejectedError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.toLowerCase().includes('user rejected') ||
           error.message.toLowerCase().includes('user denied');
  }
  return false;
} 