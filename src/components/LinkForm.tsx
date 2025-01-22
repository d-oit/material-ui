import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Alert } from '@mui/material';
import { logSecurityEvent } from '../utils/logSecurityEvent';

const schema = yup.object({
  url: yup.string().url('Invalid URL').required('URL is required'),
  title: yup.string().max(100, 'Title too long'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const LinkForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { url: string; title?: string; email: string }) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Form submitted successfully:', data);
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
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      {errors && <Alert severity="error">An unexpected error occurred. Please try again.</Alert>}
    </form>
  );
};

export default LinkForm;
