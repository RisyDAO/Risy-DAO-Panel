import { type ReactNode } from "react";

export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
}

export interface ThemeState {
  mode: ThemeMode;
  colors: ThemeColors;
}

export interface ThemeContextValue extends ThemeState {
  toggleTheme: () => void;
  setThemeColors: (colors: Partial<ThemeColors>) => void;
}

export interface ProviderProps {
  children: ReactNode;
} 