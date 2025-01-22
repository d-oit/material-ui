import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Button, Alert } from '@mui/material';

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <Alert severity="error" sx={{ m: 2 }}>
    <strong>Something went wrong:</strong> {error.message}
    <Button onClick={resetErrorBoundary} sx={{ ml: 2 }}>Retry</Button>
  </Alert>
);

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ReactErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};
