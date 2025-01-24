import React, { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useErrorToast } from '../hooks/useErrorToast';
import { createQueryClient } from '../services/queryClient';

interface QueryClientProviderWrapperProps {
  children: ReactNode;
}

const QueryClientProviderWrapper: React.FC<QueryClientProviderWrapperProps> = ({ children }) => {
  const { showError, SnackbarComponent } = useErrorToast();
  const queryClient = createQueryClient(showError);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <SnackbarComponent />
    </QueryClientProvider>
  );
};

export default QueryClientProviderWrapper;
