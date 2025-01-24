import React from 'react';
import { Snackbar } from '@mui/material';

interface ErrorToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ open, message, onClose }) => (
  <Snackbar
    open={open}
    message={message}
    onClose={onClose}
    autoHideDuration={6000}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
  />
);

ErrorToast.displayName = 'ErrorToast';
