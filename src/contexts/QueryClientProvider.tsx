import React, { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useErrorToast } from '../hooks/useErrorToast';
import { createQueryClient } from '../services/queryClient';

interface QueryClientProviderWrapperProps {
  children: ReactNode;
}

const QueryClientProviderWrapper: React.FC<QueryClientProviderWrapperProps> = ({ children }) => {
  const { showError } = useErrorToast();
  const queryClient = createQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryClientProviderWrapper;
