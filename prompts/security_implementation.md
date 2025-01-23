# Security Implementation Guide

This guide provides detailed instructions for implementing security features in the do Links Collector application.

## 1. Authentication Security

### OAuth2 Configuration

```typescript
// src/services/pocketbase.ts

import PocketBase from 'pocketbase';

export const pb = new PocketBase('YOUR_POCKETBASE_URL');

interface AuthConfig {
  provider: 'github' | 'discord';
  redirectUrl?: string;
}

export const authService = {
  async authenticate({ provider, redirectUrl }: AuthConfig) {
    try {
      const authData = await pb.collection('users').authWithOAuth2({
        provider,
        createData: {
          theme_preference: 'system',
        },
      });
      
      await logSecurityEvent('login', {
        provider,
        userId: authData.record.id,
      });
      
      return authData;
    } catch (error) {
      await logSecurityEvent('login_failed', {
        provider,
        error: error.message,
      });
      throw error;
    }
  }
};
```

### Rate Limiting Implementation

```typescript
// PocketBase hooks configuration

export default {
  'auth.*': {
    async invoke({ e }) {
      const ip = e.http.remoteIP;
      const now = new Date();
      
      // Check rate limit (10 attempts per minute)
      const attempts = await checkRateLimit(ip, now);
      if (attempts > 10) {
        throw new Error('Too many login attempts. Please try again later.');
      }
      
      // Record attempt
      await recordAttempt(ip, now);
    }
  }
};
```

## 2. CSRF Protection

### Double Submit Cookie Pattern

```typescript
// src/services/api.ts

import { pb } from './pocketbase';

// Add CSRF token to requests
pb.beforeSend = function (url, options) {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    options.headers = {
      ...options.headers,
      'X-CSRF-Token': csrfToken,
    };
  }
  return { url, options };
};

// Verify CSRF token on responses
pb.afterSend = function (response, data) {
  const serverToken = response.headers.get('X-CSRF-Token');
  if (serverToken && !verifyCsrfToken(serverToken)) {
    throw new Error('Invalid CSRF token');
  }
  return data;
};
```

## 3. Security Logging

### Security Event Logger

```typescript
// src/utils/logSecurityEvent.ts

import { pb } from '../services/pocketbase';

interface SecurityLogData {
  action: string;
  details?: Record<string, any>;
}

export async function logSecurityEvent(
  action: string,
  details?: Record<string, any>
) {
  try {
    await pb.collection('security_logs').create({
      action,
      user_id: pb.authStore.model?.id,
      ip_address: 'client-side',
      timestamp: new Date().toISOString(),
      details: JSON.stringify(details),
    });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
}
```

### Error Logger

```typescript
// src/utils/logError.ts

import { pb } from '../services/pocketbase';

interface ErrorLogData {
  error: Error;
  metadata?: Record<string, any>;
}

export async function logError({ error, metadata }: ErrorLogData) {
  try {
    await pb.collection('error_logs').create({
      user_id: pb.authStore.model?.id,
      error_message: error.message,
      stack_trace: error.stack,
      timestamp: new Date().toISOString(),
      metadata: JSON.stringify(metadata),
    });
  } catch (logError) {
    console.error('Failed to log error:', logError);
  }
}
```

## 4. Input Validation

### Form Validation Schema

```typescript
// src/schemas/linkSchema.ts

import * as yup from 'yup';

export const linkSchema = yup.object({
  url: yup
    .string()
    .url('Must be a valid URL')
    .matches(
      /^https?:\/\//,
      'URL must start with http:// or https://'
    )
    .required('URL is required'),
  title: yup
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters')
    .required('Title is required'),
  description: yup
    .string()
    .max(500, 'Description must be at most 500 characters'),
}).required();
```

## 5. Protected Routes

### Route Protection Component

```typescript
// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
```

## 6. Data Sanitization

### Sanitization Utility

```typescript
// src/utils/sanitize.ts

import DOMPurify from 'dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML allowed
    ALLOWED_ATTR: [], // No attributes allowed
  });
}

export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid URL protocol');
    }
    return parsed.toString();
  } catch (error) {
    throw new Error('Invalid URL');
  }
}
```

## 7. Error Boundary

### Global Error Boundary

```typescript
// src/components/ErrorBoundary.tsx

import React from 'react';
import { logError } from '../utils/logError';
import { Box, Typography, Button } from '@mui/material';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logError({
      error,
      metadata: {
        componentStack: info.componentStack,
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Something went wrong
          </Typography>
          <Button
            variant="contained"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
```

## Best Practices

1. **Authentication**
   - Always use HTTPS
   - Implement rate limiting
   - Log all authentication attempts
   - Use secure session management

2. **Data Validation**
   - Validate all inputs
   - Sanitize user input
   - Use TypeScript for type safety
   - Implement proper error handling

3. **Security Logging**
   - Log security-relevant events
   - Include necessary context
   - Don't log sensitive data
   - Implement proper error handling

4. **Error Handling**
   - Use error boundaries
   - Log errors properly
   - Show user-friendly messages
   - Handle edge cases

5. **CSRF Protection**
   - Use double submit cookie pattern
   - Validate all tokens
   - Implement proper error handling
   - Log security violations

Remember:
- Security should be implemented at all layers
- Always validate and sanitize user input
- Log security events and errors
- Handle errors gracefully
- Keep dependencies updated
- Follow security best practices
