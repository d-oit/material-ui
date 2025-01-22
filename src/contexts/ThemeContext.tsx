import React, { createContext, useState, useEffect, ReactNode } from 'react';
import pb from '../services/pocketbase';

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
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
