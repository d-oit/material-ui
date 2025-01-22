import { GlobalStyles } from '@mui/material';

export const globalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      body: {
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
      '.hover-scale': {
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.02)' },
      },
    })}
  />
);
