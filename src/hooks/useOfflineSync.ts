import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface OfflineSyncOptions {
  queryKeys?: string[];
  syncInterval?: number;
}

const useOfflineSync = ({ 
  queryKeys = ['links'], 
  syncInterval = 5 * 60 * 1000 // 5 minutes
}: OfflineSyncOptions = {}) => {
  const queryClient = useQueryClient();

  // Handle online status change
  const handleOnline = useCallback(async () => {
    try {
      // Get all failed mutations
      const mutations = queryClient.getMutationCache().getAll();
      const failedMutations = mutations.filter(
        mutation => mutation.state.status === 'error'
      );

      // Retry failed mutations with their original variables
      await Promise.all(
        failedMutations.map(mutation => 
          mutation.execute(mutation.state.variables)
        )
      );

      // Selectively invalidate stale queries
      await Promise.all(
        queryKeys.map(key =>
          queryClient.invalidateQueries({
            queryKey: [key],
            // Only invalidate queries older than 5 minutes
            predicate: query => 
              query.state.dataUpdatedAt < Date.now() - 5 * 60 * 1000
          })
        )
      );
    } catch (error) {
      console.error('Error during sync:', error);
    }
  }, [queryClient, queryKeys]);

  // Set up online/offline listeners
  useEffect(() => {
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [handleOnline]);

  // Set up background sync
  useEffect(() => {
    if (!navigator.onLine) return;

    const intervalId = setInterval(async () => {
      // Only sync if online and document is hidden (background)
      if (navigator.onLine && document.hidden) {
        await handleOnline();
      }
    }, syncInterval);

    return () => clearInterval(intervalId);
  }, [handleOnline, syncInterval]);

  // Return sync status and manual sync trigger
  return {
    isOnline: navigator.onLine,
    sync: handleOnline
  };
};

export default useOfflineSync;
