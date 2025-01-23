import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from './contexts/ThemeContext';
import { lightTheme, darkTheme } from './styles/theme';
import useOfflineSync from './hooks/useOfflineSync';
import { OfflineIndicator } from './components/OfflineIndicator';
import SignIn from './components/SignIn';

const AppWrapper = () => {
  const { theme } = useTheme();

  // Initialize offline sync capabilities
  useOfflineSync();

  return (
    <MuiThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <SignIn />
      <OfflineIndicator />
    </MuiThemeProvider>
  );
};

export default AppWrapper;
