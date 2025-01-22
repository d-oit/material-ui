import { useQuery } from '@tanstack/react-query';
import pb from '../services/pocketbase';

const useLinks = (page: number, pageSize: number) => {
  return useQuery(['links', page, pageSize], async () => {
    return await pb.collection('links').getList(page, pageSize, {
      sort: '-created',
    });
  });
};

export default useLinks;
