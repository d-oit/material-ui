import { QueryClient } from '@tanstack/react-query';
import { useErrorToast } from '../hooks/useErrorToast';

/**
 * Extract error message from various error types
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};

/**
 * Create a query client with error handling
 */
export const createQueryClient = (showError: (message: string) => void): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
        onError: (error) => {
          const message = getErrorMessage(error);
          console.error('Query error:', message);
          showError(message);
        },
      },
      mutations: {
        onError: (error) => {
          const message = getErrorMessage(error);
          console.error('Mutation error:', message);
          showError(message);
        },
      },
    },
  });
};

// Create a default instance that uses the useErrorToast hook
const { showError } = useErrorToast();
export const queryClient = createQueryClient(showError);
