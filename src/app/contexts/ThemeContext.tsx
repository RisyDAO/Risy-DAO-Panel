"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { type ThemeContextValue, type ThemeColors, type ProviderProps } from "../types/theme";

const defaultColors: ThemeColors = {
  primary: '#6366F1',
  secondary: '#3B82F6',
  accent: '#2DD4BF',
  background: '#111827',
  text: '#FFFFFF',
  border: '#374151',
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: ProviderProps) {
  const [mode, setMode] = useState<'dark' | 'light'>('dark');
  const [colors, setColors] = useState<ThemeColors>(defaultColors);

  const toggleTheme = useCallback(() => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const setThemeColors = useCallback((newColors: Partial<ThemeColors>) => {
    setColors(prev => ({ ...prev, ...newColors }));
  }, []);

  const value: ThemeContextValue = {
    mode,
    colors,
    toggleTheme,
    setThemeColors,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={mode}>
        <div style={{ 
          '--color-primary': colors.primary,
          '--color-secondary': colors.secondary,
          '--color-accent': colors.accent,
          '--color-background': colors.background,
          '--color-text': colors.text,
          '--color-border': colors.border,
        } as React.CSSProperties}>
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 