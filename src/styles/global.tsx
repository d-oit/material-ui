import React from 'react';
import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

const globalStyles = {
  body: {
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  '.hover-scale': {
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
};

export const GlobalStylesComponent: React.FC = () => (
  <MuiGlobalStyles styles={globalStyles} /> // Directly pass the object
);

export { globalStyles };
