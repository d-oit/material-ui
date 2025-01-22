import { Snackbar } from '@mui/material';
import React, { useState, type FC } from 'react';

interface ErrorToastReturn {
  showError: (message: string) => void;
  SnackbarComponent: FC;
}

export const useErrorToast = (): ErrorToastReturn => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const showError = (msg: string): void => {
    setMessage(msg || 'An unexpected error occurred.');
    setOpen(true);
  };

  const ToastComponent: FC = () => (
    React.createElement(Snackbar, {
      open,
      message,
      onClose: handleClose,
      autoHideDuration: 6000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }
    })
  );

  ToastComponent.displayName = 'ErrorSnackbar';

  return {
    showError,
    SnackbarComponent: ToastComponent
  };
};
