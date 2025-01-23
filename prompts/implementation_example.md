# Implementation Example: Adding Link Creation Feature

This example demonstrates how to use the prompt guide to implement a specific feature - the link creation functionality.

## Example Implementation Flow

1. First, ensure you have completed Steps 1 and 2 from the prompt guide for project setup and PocketBase configuration.

2. Create the link creation feature using these specific prompts:

### 1. Create Link Type Definition

```prompt
Create a TypeScript interface for the Link type in src/types/index.ts:

interface Link {
  id: string;
  url: string;
  title: string;
  description?: string;
  category?: string;
  user: string;
  status: 'active' | 'archived' | 'invalid';
  created: string;
  updated: string;
}

Also create a type for creating a new link:

type CreateLinkInput = Omit<Link, 'id' | 'created' | 'updated'>;
```

### 2. Implement API Service

```prompt
Create a link service in src/services/api.ts that handles link operations:

import PocketBase from 'pocketbase';

export const pb = new PocketBase('YOUR_POCKETBASE_URL');

export const linkService = {
  async createLink(data: CreateLinkInput) {
    try {
      const response = await pb.collection('links').create(data);
      return response;
    } catch (error) {
      throw new Error('Failed to create link: ' + error.message);
    }
  },
  
  // Add other link-related methods
};
```

### 3. Create Custom Hook

```prompt
Create a custom hook for link creation in src/hooks/useCreateLink.ts:

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { linkService } from '../services/api';
import { useErrorToast } from './useErrorToast';

export function useCreateLink() {
  const queryClient = useQueryClient();
  const showError = useErrorToast();

  return useMutation(
    (data: CreateLinkInput) => linkService.createLink(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['links']);
      },
      onError: (error: Error) => {
        showError(error);
      }
    }
  );
}
```

### 4. Implement Link Form Component

```prompt
Create a link form component in src/components/LinkForm.tsx using Material UI and react-hook-form:

import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { useCreateLink } from '../hooks/useCreateLink';

export function LinkForm() {
  const { register, handleSubmit, reset } = useForm<CreateLinkInput>();
  const createLink = useCreateLink();

  const onSubmit = async (data: CreateLinkInput) => {
    try {
      await createLink.mutateAsync(data);
      reset();
    } catch (error) {
      console.error('Failed to create link:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <TextField
        {...register('url')}
        label="URL"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        {...register('title')}
        label="Title"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        {...register('description')}
        label="Description"
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />
      <Button 
        type="submit" 
        variant="contained" 
        disabled={createLink.isLoading}
        sx={{ mt: 2 }}
      >
        Add Link
      </Button>
    </Box>
  );
}
```

### 5. Add Form Validation

```prompt
Add Yup validation to the LinkForm component:

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  url: yup.string().url('Must be a valid URL').required('URL is required'),
  title: yup.string().required('Title is required'),
  description: yup.string(),
}).required();

export function LinkForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateLinkInput>({
    resolver: yupResolver(schema)
  });
  
  // ... rest of the component
}
```

## Expected Results

After implementing these prompts, you should have:

1. A type-safe link creation system
2. Form validation with error messages
3. API integration with error handling
4. Optimistic updates in the UI
5. Loading and error states

## Testing the Implementation

```prompt
Create a test file in test/LinkForm.test.tsx:

import { render, screen, fireEvent } from '@testing-library/react';
import { LinkForm } from '../src/components/LinkForm';

describe('LinkForm', () => {
  it('submits valid form data', async () => {
    render(<LinkForm />);
    
    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Example Link' }
    });
    
    fireEvent.click(screen.getByText(/add link/i));
    
    // Add assertions
  });
});
```

This example demonstrates how to:
1. Break down the implementation into manageable steps
2. Use TypeScript for type safety
3. Implement proper error handling
4. Follow Material UI patterns
5. Create reusable components
6. Add proper validation
7. Include tests

Follow similar patterns when implementing other features from the main prompt guide.
