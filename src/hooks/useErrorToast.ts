import React from 'react';
import type { ComponentType } from 'react';
import { ErrorToast } from '../components/ErrorToast';

interface ErrorToastReturn {
  showError: (message: string) => void;
  SnackbarComponent: ComponentType<{}>;
}

export const useErrorToast = (): ErrorToastReturn => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const showError = React.useCallback((msg: string): void => {
    setMessage(msg || 'An unexpected error occurred.');
    setOpen(true);
  }, []);

  const SnackbarComponent: ComponentType = () => {
    return React.createElement(ErrorToast, {
      open,
      message,
      onClose: handleClose
    });
  };

  SnackbarComponent.displayName = 'ErrorSnackbar';

  return {
    showError,
    SnackbarComponent
  };
};
