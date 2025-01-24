import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import pb from '../services/pocketbase';
import { lightTheme, darkTheme } from '../styles/theme';

interface ThemeContextProps {
  theme: string;
  isDarkMode: boolean;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  isDarkMode: false,
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const user = pb.authStore.model;
    if (user?.theme) {
      setTheme(user.theme);
    }
  }, []);

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    const user = pb.authStore.model;
    if (user) {
      pb.collection('users').update(user.id, { theme: newTheme });
    }
  };

  const isDarkMode = theme === 'dark';
  const muiTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setTheme: updateTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
