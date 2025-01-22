import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import pb from '../services/pocketbase'; // PocketBase client

const useSearchLinks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch search results
  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', debouncedTerm],
    queryFn: async () => {
      const results = await pb.collection('links').getFullList({
        filter: `title ~ '${debouncedTerm}' || description ~ '${debouncedTerm}'`,
      });
      return results;
    }
  });

  return {
    searchTerm,
    setSearchTerm,
    data,
    isLoading,
    isError,
  };
};

export default useSearchLinks;
