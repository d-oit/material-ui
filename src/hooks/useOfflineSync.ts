import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const useOfflineSync = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleOnline = () => {
      queryClient.invalidateQueries(['links']);
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [queryClient]);

  return null;
};

export default useOfflineSync;
