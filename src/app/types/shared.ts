import { type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes } from "react";

// Layout Types
export interface LayoutProps {
  children: ReactNode;
}

// Button Types
export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export interface ButtonContentProps {
  isLoading: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

// Input Types
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightElement?: ReactNode;
  helperText?: string | string[];
}

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export interface InputLabelProps {
  label?: string;
}

export interface InputMessageProps {
  error?: string;
  helperText?: string | string[];
}

// Card Types
export interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export interface CardTitleProps {
  title?: string;
}

// StatusBadge Types
export type StatusBadgeVariant = 'success' | 'warning' | 'error' | 'info';

export interface StatusBadgeProps {
  variant?: StatusBadgeVariant;
  icon?: ReactNode;
  children: ReactNode;
}

export interface BadgeContentProps {
  icon?: ReactNode;
  children: ReactNode;
} 