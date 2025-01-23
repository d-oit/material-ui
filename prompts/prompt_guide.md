# do Links Collector - Complete Implementation Guide

This guide provides step-by-step prompts to recreate the do Links Collector application, a modern web app for managing and organizing links with offline support and OAuth2 authentication.

## Step 1: Project Initialization

```prompt
Create a new Vite project with React and TypeScript for a links collector application that will:
1. Use Material UI for the interface
2. Support offline functionality as a PWA
3. Use PocketBase for backend services
4. Include OAuth2 authentication

Include these dependencies in package.json:
{
  "dependencies": {
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.11.16",
    "@mui/material": "^5.13.0",
    "@tanstack/react-query": "^4.29.5",
    "pocketbase": "^0.14.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.43.9",
    "react-router-dom": "^6.11.1",
    "yup": "^1.1.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.6",
    "@types/react-dom": "^18.2.4",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.4",
    "vite": "^4.3.5",
    "vite-plugin-pwa": "^0.14.7"
  }
}

Create the following folder structure:
/src
  /components
  /contexts
  /hooks
  /pages
  /services
  /styles
  /types
  /utils
```

## Step 2: PocketBase Setup

```prompt
Set up PocketBase with the following collections:

1. Users Collection:
{
  "name": "users",
  "type": "auth",
  "schema": [
    {
      "name": "email",
      "type": "email",
      "required": true
    },
    {
      "name": "password",
      "type": "text",
      "required": true
    },
    {
      "name": "theme_preference",
      "type": "select",
      "required": false,
      "options": {
        "values": ["system", "light", "dark"]
      }
    }
  ]
}

2. Links Collection:
{
  "name": "links",
  "type": "base",
  "schema": [
    {
      "name": "url",
      "type": "url",
      "required": true
    },
    {
      "name": "title",
      "type": "text",
      "required": true
    },
    {
      "name": "description",
      "type": "text",
      "required": false
    },
    {
      "name": "category",
      "type": "relation",
      "required": false,
      "options": {
        "collectionId": "categories",
        "maxSelect": 1
      }
    },
    {
      "name": "user",
      "type": "relation",
      "required": true,
      "options": {
        "collectionId": "users",
        "cascadeDelete": true,
        "maxSelect": 1
      }
    },
    {
      "name": "status",
      "type": "select",
      "required": true,
      "options": {
        "values": ["active", "archived", "invalid"]
      }
    }
  ],
  "listRule": "@request.auth.id != \"\" && user = @request.auth.id",
  "viewRule": "@request.auth.id != \"\" && user = @request.auth.id",
  "createRule": "@request.auth.id != \"\"",
  "updateRule": "@request.auth.id != \"\" && user = @request.auth.id",
  "deleteRule": "@request.auth.id != \"\" && user = @request.auth.id"
}

3. Security and Error Logging Collections as provided in the schema files.
```

## Step 3: Authentication Implementation

```prompt
Create the authentication system with the following components:

1. AuthContext.tsx:
- Manage authentication state
- Handle OAuth2 login/logout
- Store user preferences
- Implement security logging

2. SignIn.tsx component:
- OAuth2 login buttons for GitHub and Discord
- Error handling
- Loading states
- Redirect to dashboard on success

3. ProtectedRoute.tsx:
- Route guard for authenticated pages
- Redirect to login if not authenticated
- Loading state while checking auth
```

## Step 4: Core Features Implementation

```prompt
Implement the core features for the links collector:

1. Create LinkForm.tsx:
- Form validation with react-hook-form and yup
- URL input with validation
- Title and description fields
- Category selection
- Error handling and loading states

2. Create LinkDetails.tsx:
- Display link information
- Edit functionality
- Delete confirmation
- Category management
- Status updates

3. Implement Dashboard.tsx:
- List all links with Material UI DataGrid
- Filtering and sorting
- Search functionality
- Category filter
- Responsive layout
```

## Step 5: State Management

```prompt
Set up state management using Tanstack Query:

1. Create QueryClientProvider.tsx:
- Configure query client
- Set up default options
- Implement error handling
- Configure caching strategy

2. Create custom hooks:
- useLinks.ts for fetching links
- useCreateLink.ts for creating links
- useUpdateLink.ts for updating links
- useSearchLinks.ts for searching links
- useOfflineSync.ts for offline support
```

## Step 6: PWA Configuration

```prompt
Set up Progressive Web App features:

1. Configure vite.config.ts:
{
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.your-domain\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          }
        ]
      },
      manifest: {
        name: 'do Links Collector',
        short_name: 'Links',
        description: 'Collect and organize your links',
        theme_color: '#1976d2'
      }
    })
  ]
}

2. Implement offline support:
- Create OfflineIndicator.tsx
- Implement offline data synchronization
- Cache management
- Background sync
```

## Step 7: Error Handling

```prompt
Implement comprehensive error handling:

1. Create ErrorBoundary.tsx:
- Catch and display React errors
- Log errors to error_logs collection
- Provide fallback UI
- Reset functionality

2. Create useErrorToast.ts:
- Toast notifications for errors
- Error message formatting
- Automatic dismissal
- Position configuration
```

## Step 8: Security Features

```prompt
Implement security features:

1. Create security logging utilities:
- Log authentication attempts
- Track user actions
- Monitor error patterns
- IP tracking

2. Implement CSRF protection:
- Double-submit cookie pattern
- Token validation
- Header checks

3. Configure rate limiting:
- Authentication endpoints
- API requests
- Error logging
```

## Step 9: Theme Implementation

```prompt
Set up theming support:

1. Create ThemeContext.tsx:
- System/Light/Dark themes
- Theme persistence
- User preference sync
- Material UI theme customization

2. Create ThemeSwitcher.tsx:
- Theme toggle component
- System preference detection
- Smooth transitions
```

## Step 10: Testing Setup

```prompt
Set up testing infrastructure:

1. Configure Jest and React Testing Library:
- Test environment setup
- Mock service worker
- Custom render utilities
- Common test patterns

2. Create test files:
- Component tests
- Hook tests
- Integration tests
- E2E test setup
```

## Final Steps

```prompt
Complete the implementation with:

1. Final configurations:
- Environment variables
- Build optimizations
- Deployment setup
- Documentation

2. Quality assurance:
- Accessibility checks
- Performance testing
- Security audit
- Cross-browser testing
```

Each step should be implemented sequentially, ensuring proper functionality before moving to the next step. The implementation should follow best practices for React development, including:

- TypeScript for type safety
- Component composition
- Custom hooks for reusability
- Proper error handling
- Responsive design
- Accessibility
- Performance optimization
- Security best practices

Remember to:
1. Test thoroughly between steps
2. Document any changes or deviations
3. Follow Material UI best practices
4. Implement proper error handling
5. Consider accessibility throughout
6. Maintain consistent code style
