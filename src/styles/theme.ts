import { createTheme } from '@mui/material/styles';
import { useTheme } from '../contexts/ThemeContext';

export const getTheme = (mode: 'dark' | 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: mode === 'dark' ? '#f48fb1' : '#dc004e',
      },
    },
  });
