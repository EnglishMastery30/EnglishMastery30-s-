import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Here we would typically log to Sentry or Crashlytics
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-6">
            <div className="w-20 h-20 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-500 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-10 h-10" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h1>
              <p className="text-slate-500 dark:text-slate-400">
                We apologize for the inconvenience. An unexpected error has occurred.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl text-left overflow-x-auto">
                <p className="text-sm font-mono text-slate-700 dark:text-slate-300">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors w-full sm:w-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Reload Page
            </button>
            
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
