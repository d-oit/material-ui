import { useMutation, UseMutationResult } from '@tanstack/react-query';
import pb from '../services/pocketbase';

export interface LinkData {
  url: string;
  title: string;
  category: string;
}

export interface LinkResponse extends LinkData {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  user_id: string;
}

const createLink = async (linkData: LinkData): Promise<LinkResponse> => {
  if (!pb.authStore.model?.id) {
    throw new Error('User must be authenticated to create links');
  }

  const response = await pb.collection('links').create({
    ...linkData,
    user_id: pb.authStore.model.id
  });
  
  return response as LinkResponse;
};

const useCreateLink = (): UseMutationResult<LinkResponse, Error, LinkData> => {
  return useMutation({
    mutationFn: createLink,
  });
};

export default useCreateLink;
