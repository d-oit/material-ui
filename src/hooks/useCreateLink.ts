import { useMutation } from '@tanstack/react-query';
import pb from '../services/pocketbase';

interface LinkData {
  url: string;
  title: string;
  description: string;
  category?: string;
}

const useCreateLink = () => {
  return useMutation(async (linkData: LinkData) => {
    return await pb.collection('links').create(linkData);
  });
};

export default useCreateLink;
