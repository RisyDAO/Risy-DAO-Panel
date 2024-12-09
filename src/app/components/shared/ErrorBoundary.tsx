"use client";

import { Component, type ReactNode } from "react";
import { StatusBadge } from "./StatusBadge";
import { ErrorFallback } from "./ErrorFallback";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  title?: string;
  message?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <ErrorFallback
          title={this.props.title || "Something went wrong"}
          message={this.props.message || this.state.error?.message || "Please try refreshing the page"}
        />
      );
    }

    return this.props.children;
  }
} 