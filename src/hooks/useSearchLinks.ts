import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import pb from '../services/pocketbase';
import useDebounce from './useDebounce';

interface UseSearchLinksOptions {
  pageSize?: number;
  debounceMs?: number;
  fields?: string[];
}

const useSearchLinks = ({
  pageSize = 20,
  debounceMs = 300,
  fields = ['id', 'title', 'description', 'url']
}: UseSearchLinksOptions = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedTerm = useDebounce(searchTerm, debounceMs);

  // Fetch search results
  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', debouncedTerm, pageSize],
    queryFn: async () => {
      if (!debouncedTerm) return { items: [], totalItems: 0 };
      
      return await pb.collection('links').getList(1, pageSize, {
        filter: `title ~ "${debouncedTerm}" || description ~ "${debouncedTerm}"`,
        fields: fields.join(','),
        sort: '-created',
      });
    },
    staleTime: 2 * 60 * 1000, // Results stay fresh for 2 minutes
    enabled: debouncedTerm.length >= 2, // Only search with 2+ characters
    placeholderData: (previousData: any) => previousData,
  });

  return {
    searchTerm,
    setSearchTerm,
    results: data?.items || [],
    totalResults: data?.totalItems || 0,
    isLoading,
    isError,
  };
};

export default useSearchLinks;
