import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: string | JSX.Element;
  onError?: VoidFunction;
};
type ErrorBoundaryState = { hasError: boolean };

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <>{this.props.fallback || "Um erro inesperado ocorreu."}</>;
    }

    return this.props.children;
  }
}
