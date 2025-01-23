# Testing Guide

This guide provides comprehensive instructions for implementing tests in the do Links Collector application.

## Testing Setup

### 1. Configuration

```typescript
// jest.config.js

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testMatch: ['**/*.test.ts?(x)'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
};

// test/setupTests.ts

import '@testing-library/jest-dom';
import { server } from './server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### 2. Test Utils

```typescript
// test/utils.tsx

import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../src/theme';

function render(ui: React.ReactElement, options = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { render };
```

## Component Testing

### 1. Form Component Tests

```typescript
// src/components/LinkForm.test.tsx

import { render, screen, fireEvent, waitFor } from '../test/utils';
import { LinkForm } from './LinkForm';
import { server } from '../test/server';
import { rest } from 'msw';

describe('LinkForm', () => {
  it('submits form with valid data', async () => {
    const onSuccess = jest.fn();
    render(<LinkForm onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://example.com' },
    });
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Example Site' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('shows validation errors', async () => {
    render(<LinkForm onSuccess={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(/url is required/i)).toBeInTheDocument();
    });
  });

  it('handles API errors', async () => {
    server.use(
      rest.post('/api/links', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Server error' })
        );
      })
    );

    render(<LinkForm onSuccess={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
  });
});
```

### 2. List Component Tests

```typescript
// src/components/LinkList.test.tsx

import { render, screen } from '../test/utils';
import { LinkList } from './LinkList';
import { Link } from '../types';

const mockLinks: Link[] = [
  {
    id: '1',
    url: 'https://example.com',
    title: 'Example',
    status: 'active',
    user: 'user1',
    created: '2023-01-01',
    updated: '2023-01-01',
  },
];

describe('LinkList', () => {
  it('renders links', () => {
    render(<LinkList links={mockLinks} />);
    expect(screen.getByText('Example')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<LinkList links={[]} isLoading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<LinkList links={[]} />);
    expect(screen.getByText(/no links found/i)).toBeInTheDocument();
  });
});
```

## Hook Testing

### 1. Custom Hook Tests

```typescript
// src/hooks/useLinks.test.ts

import { renderHook, waitFor } from '@testing-library/react';
import { useLinks } from './useLinks';
import { wrapper } from '../test/utils';

describe('useLinks', () => {
  it('fetches links', async () => {
    const { result } = renderHook(() => useLinks(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
  });

  it('handles errors', async () => {
    server.use(
      rest.get('/api/links', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useLinks(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
```

### 2. Auth Hook Tests

```typescript
// src/hooks/useAuth.test.ts

import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';
import { wrapper } from '../test/utils';

describe('useAuth', () => {
  it('handles login', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('github');
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  it('handles logout', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

## Integration Testing

### 1. Protected Routes

```typescript
// test/integration/ProtectedRoute.test.tsx

import { render, screen } from '../utils';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../../src/App';

describe('Protected Routes', () => {
  it('redirects to login when not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('allows access when authenticated', async () => {
    const { user } = userEvent.setup();
    
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    await user.click(screen.getByText(/sign in with github/i));

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
```

### 2. API Integration

```typescript
// test/integration/api.test.ts

import { pb } from '../../src/services/pocketbase';

describe('API Integration', () => {
  beforeEach(() => {
    pb.authStore.clear();
  });

  it('handles authentication flow', async () => {
    const auth = await pb.collection('users').authWithOAuth2({
      provider: 'github',
    });

    expect(auth.record).toBeDefined();
    expect(pb.authStore.isValid).toBe(true);
  });

  it('handles link creation', async () => {
    // Authenticate first
    await authenticateUser();

    const link = await pb.collection('links').create({
      url: 'https://example.com',
      title: 'Example',
      status: 'active',
    });

    expect(link.id).toBeDefined();
  });
});
```

## Best Practices

1. **Test Organization**
   - Group related tests together
   - Use clear test descriptions
   - Follow AAA pattern (Arrange, Act, Assert)
   - Keep tests focused and simple

2. **Test Coverage**
   - Test happy paths and error cases
   - Test edge cases
   - Test user interactions
   - Test loading states

3. **Mock Data**
   - Use consistent mock data
   - Create mock factories
   - Mock external services
   - Use MSW for API mocking

4. **Performance**
   - Clean up after tests
   - Avoid unnecessary renders
   - Mock heavy computations
   - Use test isolation

5. **Maintainability**
   - Keep tests DRY
   - Use testing utilities
   - Document complex tests
   - Follow naming conventions

Remember:
- Write tests as you develop
- Keep tests simple and focused
- Test user interactions
- Mock external dependencies
- Maintain test coverage
- Document test requirements
