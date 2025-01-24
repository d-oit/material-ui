import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from './contexts/ThemeContext';
import { lightTheme, darkTheme } from './styles/theme';
import useOfflineSync from './hooks/useOfflineSync';
import { OfflineIndicator } from './components/OfflineIndicator';
import AppRoutes from './routes';
import { useErrorToast } from './hooks/useErrorToast';

const AppWrapper = () => {
  const { theme } = useTheme();
  const { SnackbarComponent } = useErrorToast();

  // Initialize offline sync capabilities
  useOfflineSync();

  return (
    <MuiThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppRoutes />
      <OfflineIndicator />
      <SnackbarComponent />
    </MuiThemeProvider>
  );
};

export default AppWrapper;
