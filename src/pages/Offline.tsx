import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';

const Offline: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      <h1>Offline Access</h1>
      {isOnline ? (
        <Alert severity="success">You are online.</Alert>
      ) : (
        <Alert severity="error">You are offline.</Alert>
      )}
      {/* Add offline data management logic here */}
    </div>
  );
};

export default Offline;
