import { AlertCircle, XCircle, RefreshCw, WifiOff } from 'lucide-react';

interface ErrorAlertProps {
  error?: {
    status?: number | string;
    data?: {
      message?: string;
      success?: boolean;
    };
  };
  onRetry?: () => void;
  className?: string;
}

export default function ErrorAlert({ error, onRetry, className = '' }: ErrorAlertProps) {
  if (!error) return null;

  const { status, data } = error;
  const message = data?.message || 'An unexpected error occurred';

  const getErrorIcon = () => {
    switch (status) {
      case 429:
        return <RefreshCw className="w-5 h-5" />;
      case 503:
      case 'FETCH_ERROR':
        return <WifiOff className="w-5 h-5" />;
      case 401:
      case 403:
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getErrorStyles = () => {
    switch (status) {
      case 429:
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 503:
      case 'FETCH_ERROR':
        return 'bg-orange-50 border-orange-200 text-orange-900';
      case 401:
      case 403:
        return 'bg-red-50 border-red-200 text-red-900';
      case 500:
        return 'bg-red-50 border-red-200 text-red-900';
      default:
        return 'bg-red-50 border-red-200 text-red-900';
    }
  };

  const getErrorTitle = () => {
    switch (status) {
      case 429:
        return 'Rate Limit Exceeded';
      case 503:
      case 'FETCH_ERROR':
        return 'Connection Error';
      case 401:
        return 'Authentication Required';
      case 403:
        return 'Access Denied';
      case 500:
        return 'Server Error';
      default:
        return 'Error';
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getErrorStyles()} ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getErrorIcon()}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{getErrorTitle()}</h4>
          <p className="text-sm opacity-90">{message}</p>

          {/* Additional info for specific errors */}
          {status === 429 && (
            <p className="text-xs mt-2 opacity-75">
              Admin users are exempt from rate limiting. Please log in as an admin or wait a moment before trying again.
            </p>
          )}

          {status === 503 && (
            <p className="text-xs mt-2 opacity-75">
              Please check:
              <ul className="list-disc list-inside mt-1 ml-2">
                <li>Your internet connection is working</li>
                <li>The server URL is correct: {process.env.NEXT_PUBLIC_API_URL}</li>
                <li>The backend server is running</li>
              </ul>
            </p>
          )}
        </div>

        {/* Retry button for recoverable errors */}
        {(status === 503 || status === 429 || status === 500) && onRetry && (
          <button
            onClick={onRetry}
            className="flex-shrink-0 px-3 py-1 text-sm font-medium border border-current rounded hover:bg-white/10 "
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
