import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import QueryClientProviderWrapper from './contexts/QueryClientProvider';
import { ThemeProvider } from './contexts/ThemeContext';

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <QueryClientProviderWrapper>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProviderWrapper>
      </ThemeProvider>
    </React.StrictMode>
  );
}
