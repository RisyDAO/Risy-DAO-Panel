import { type ReactNode } from "react";

export type ThemeMode = 'dark' | 'light';

export interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export interface ProviderProps {
  children: ReactNode;
} 