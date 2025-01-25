import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppWrapper from './App';
import QueryClientProviderWrapper from './contexts/QueryClientProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import registerSW from './registerSW';
import { GlobalStylesComponent } from './styles/global';

// Register service worker
registerSW();

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <GlobalStylesComponent />
      <BrowserRouter>
        <ThemeProvider>
          <QueryClientProviderWrapper>
            <AuthProvider>
              <AppWrapper />
              <ReactQueryDevtools initialIsOpen={false} />
            </AuthProvider>
          </QueryClientProviderWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
