"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { type ThemeContextValue, type ThemeMode, type ProviderProps } from "../types/theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: ProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  // Initialize theme from system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(isDark ? 'dark' : 'light');
  }, []);

  // Update HTML class when theme changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const value: ThemeContextValue = {
    mode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`min-h-screen bg-background ${mode} text-text`}>
        {children}
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