import { useMutation, useQueryClient, QueryFilters, InvalidateQueryFilters } from '@tanstack/react-query';
import pb from '../services/pocketbase';
import { toast } from 'react-toastify';
import { RecordModel } from 'pocketbase';

interface Link extends RecordModel {
  id: string;
  title: string;
  // Add other link properties as needed
}

interface LinkList {
  items: Link[];
}

interface UpdateLinkVariables {
  id: string;
  title: string;
}

interface MutationContext {
  previousLinks?: LinkList;
}

export const useUpdateLink = () => {
  const queryClient = useQueryClient();
  return useMutation<Link, Error, UpdateLinkVariables, MutationContext>({
    mutationFn: async ({ id, title }: UpdateLinkVariables) => {
      return pb.collection('links').update<Link>(id, { title });
    },
    onMutate: async (variables: UpdateLinkVariables) => {
      await queryClient.cancelQueries(['links'] as QueryFilters);
      const previousLinks = queryClient.getQueryData<LinkList>(['links']);
      queryClient.setQueryData<LinkList>(['links'], (old) => {
        if (!old) return { items: [] };
        return {
          ...old,
          items: old.items.map((link) =>
            link.id === variables.id ? { ...link, title: variables.title } : link
          ),
        };
      });
      return { previousLinks };
    },
    onError: (_err: Error, _variables: UpdateLinkVariables, context: MutationContext) => {
      if (context?.previousLinks) {
        queryClient.setQueryData(['links'], context.previousLinks);
      }
      toast.error('Failed to update link');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['links'] as InvalidateQueryFilters);
    },
  });
};
