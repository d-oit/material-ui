import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';

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
 * Create a query client with optimized configuration for performance and reliability
 */
export const createQueryClient = (onError?: (message: string) => void): QueryClient => {
  const queryCache = new QueryCache({
    onError: (error) => {
      const message = getErrorMessage(error);
      console.error('Query error:', message);
      onError?.(message);
    }
  });

  const mutationCache = new MutationCache({
    onError: (error) => {
      const message = getErrorMessage(error);
      console.error('Mutation error:', message);
      onError?.(message);
    }
  });

  return new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: 'always'
      },
      mutations: {
        retry: 3,
        retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000)
      }
    }
  });
};
