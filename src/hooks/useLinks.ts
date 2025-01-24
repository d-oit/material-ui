import { useQuery } from '@tanstack/react-query';
import pb from '../services/pocketbase';

interface UseLinksOptions {
  page: number;
  pageSize: number;
  sort?: string;
  fields?: string[];
}

const useLinks = ({ 
  page = 1, 
  pageSize = 20,
  sort = '-created',
  fields = ['id', 'url', 'title', 'description', 'category']
}: UseLinksOptions) => {
  return useQuery({
    queryKey: ['links', page, pageSize, sort],
    queryFn: async () => {
      return await pb.collection('links').getList(page, pageSize, {
        sort,
        fields: fields.join(','),
      });
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    placeholderData: (previousData: any) => previousData, // Keep previous data while fetching
  });
};

export default useLinks;
