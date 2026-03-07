import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // Here you would send to error tracking service
    // e.g., Sentry, LogRocket, etc.
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} onReload={this.handleReload} />;
    }

    return this.props.children;
  }
}

// Error Fallback UI Component
function ErrorFallback({ error, onReload }: { error: Error | null; onReload: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertTriangle size={32} className="text-red-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Something went wrong
        </h1>
        
        <p className="text-white/50 mb-6">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/5 border border-red-500/10 text-left">
            <p className="text-xs text-red-400 font-mono break-all">
              {error.message || 'Unknown error'}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onReload}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-colors"
            style={{ fontWeight: 600 }}
          >
            <RefreshCw size={18} />
            Reload Page
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/80 hover:border-white/30 hover:text-white transition-colors"
          >
            <Home size={18} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export const ErrorBoundary = ErrorBoundaryClass;

// Hook for programmatic error handling
export function useErrorHandler() {
  const [, setError] = React.useState<Error | null>(null);

  return React.useCallback((error: Error) => {
    setError(error);
    console.error('Error handled:', error);
  }, []);
}

