import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Alert } from '@mui/material';
import { logSecurityEvent } from '../utils/logSecurityEvent';
import useCreateLink, { LinkData } from '../hooks/useCreateLink';

const schema = yup.object({
  url: yup.string().url('Invalid URL').required('URL is required'),
  title: yup.string().required('Title is required').max(100, 'Title too long'),
  category: yup.string().required('Category is required'),
});

const LinkForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const createLinkMutation = useCreateLink();
  const { register, handleSubmit, formState: { errors } } = useForm<LinkData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LinkData) => {
    try {
      await createLinkMutation.mutateAsync(data, {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => {
          logSecurityEvent('form_submission_failed', undefined, JSON.stringify(error));
        },
      });
    } catch (error) {
      console.error('Form submission failed:', error);
      logSecurityEvent('form_submission_failed', undefined, JSON.stringify(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="URL"
        error={!!errors.url}
        helperText={errors.url?.message}
        {...register('url')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Title"
        error={!!errors.title}
        helperText={errors.title?.message}
        {...register('title')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Category"
        error={!!errors.category}
        helperText={errors.category?.message}
        {...register('category')}
        fullWidth
        margin="normal"
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={createLinkMutation.isLoading}
        sx={{ mt: 2 }}
      >
        {createLinkMutation.isLoading ? 'Adding...' : 'Add Link'}
      </Button>
      {createLinkMutation.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {createLinkMutation.error instanceof Error 
            ? createLinkMutation.error.message 
            : 'Failed to add link. Please try again.'}
        </Alert>
      )}
    </form>
  );
};

export default LinkForm;
