# Component Patterns Guide

This guide outlines the recommended patterns and best practices for creating components in the do Links Collector application.

## Component Structure

### 1. Basic Component Template

```typescript
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useErrorToast } from '../hooks/useErrorToast';

interface ComponentProps {
  // Props definition
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hook calls at the top
  const showError = useErrorToast();

  // Event handlers
  const handleAction = () => {
    try {
      // Handle action
    } catch (error) {
      showError(error);
    }
  };

  // Render
  return (
    <Box>
      <Typography>Content</Typography>
    </Box>
  );
}
```

### 2. Form Component Pattern

```typescript
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button } from '@mui/material';

interface FormData {
  // Form fields type definition
}

const schema = yup.object({
  // Validation schema
}).required();

export function FormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Handle submission
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </Box>
  );
}
```

### 3. List Component Pattern

```typescript
import React from 'react';
import { List, ListItem, CircularProgress } from '@mui/material';

interface ListProps<T> {
  data: T[];
  isLoading: boolean;
  onItemClick?: (item: T) => void;
}

export function ListComponent<T>({ data, isLoading, onItemClick }: ListProps<T>) {
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {data.map((item) => (
        <ListItem
          key={item.id}
          onClick={() => onItemClick?.(item)}
        >
          {/* Item content */}
        </ListItem>
      ))}
    </List>
  );
}
```

## Common Patterns

### 1. Error Handling

```typescript
// Always use the error toast hook for consistent error handling
const showError = useErrorToast();

try {
  // Risky operation
} catch (error) {
  showError(error);
}
```

### 2. Loading States

```typescript
// Use Material UI's loading components
import { Skeleton, CircularProgress } from '@mui/material';

// For inline loading
{isLoading ? <CircularProgress size={24} /> : content}

// For content loading
{isLoading ? (
  <Skeleton variant="rectangular" height={200} />
) : (
  <ActualContent />
)}
```

### 3. Empty States

```typescript
import { Box, Typography } from '@mui/material';
import { EmptyState } from '../components/EmptyState';

// When no data is available
{data.length === 0 ? (
  <EmptyState
    message="No items found"
    action={<Button>Add Item</Button>}
  />
) : (
  // Render data
)}
```

### 4. Responsive Design

```typescript
import { useTheme, useMediaQuery } from '@mui/material';

// Use responsive design patterns
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

// In JSX
<Box
  sx={{
    padding: { xs: 2, sm: 3, md: 4 },
    flexDirection: { xs: 'column', sm: 'row' }
  }}
>
  {/* Content */}
</Box>
```

### 5. Theme Integration

```typescript
import { useTheme } from '@mui/material/styles';

// Access theme in components
const theme = useTheme();

// Use theme values in styles
<Box
  sx={{
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
  }}
>
  {/* Content */}
</Box>
```

## Best Practices

1. **Component Organization**
   - One component per file
   - Clear, descriptive file names
   - Group related components in folders
   - Export from index files

2. **Props Management**
   - Use TypeScript interfaces for props
   - Document complex props
   - Provide default values when appropriate
   - Use prop destructuring

3. **State Management**
   - Use appropriate hooks (useState, useReducer)
   - Keep state close to where it's used
   - Avoid redundant state
   - Use context for global state

4. **Performance**
   - Memoize callbacks with useCallback
   - Memoize expensive calculations with useMemo
   - Use virtualization for long lists
   - Lazy load components when appropriate

5. **Accessibility**
   - Use semantic HTML
   - Include ARIA labels
   - Support keyboard navigation
   - Test with screen readers

6. **Testing**
   - Write unit tests for components
   - Test user interactions
   - Test error states
   - Test loading states

## Example Usage

### Creating a New Feature

1. Plan the component structure
2. Create necessary TypeScript interfaces
3. Implement the component following patterns
4. Add error handling
5. Add loading states
6. Add tests
7. Document the component

### Modifying Existing Components

1. Maintain consistent patterns
2. Update types if needed
3. Update tests
4. Test edge cases
5. Document changes

Remember:
- Keep components focused and single-responsibility
- Use TypeScript for better maintainability
- Follow Material UI patterns
- Implement proper error handling
- Consider accessibility
- Write tests for new functionality
