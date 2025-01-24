import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppWrapper from './App';
import QueryClientProviderWrapper from './contexts/QueryClientProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import registerSW from './registerSW';

// Register service worker
registerSW();

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProviderWrapper>
            <AppWrapper />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProviderWrapper>
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
