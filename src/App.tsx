import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from './contexts/ThemeContext';
import { getTheme } from './styles/theme';
import { useOfflineSync } from './hooks/useOfflineSync';
import { OfflineIndicator } from './components/OfflineIndicator';

const AppWrapper = () => {
  const { resolvedTheme } = useTheme();
  const theme = getTheme(resolvedTheme);

  // Initialize offline sync capabilities
  useOfflineSync({
    onSuccess: () => {
      console.log('Successfully synced data');
    },
    onError: (error) => {
      console.error('Error syncing data:', error);
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {/* Rest of your app components */}
      <OfflineIndicator />
    </MuiThemeProvider>
  );
};

export default AppWrapper;
