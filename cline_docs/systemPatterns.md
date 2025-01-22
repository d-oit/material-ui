# System Patterns

## Error Handling

### Frontend Error Handling

1. **Toast Notifications**
   - Using `Material-UI Snackbar` for user-friendly error notifications
   - Positioned at bottom-right of screen
   - Auto-dismisses after 6 seconds
   - Managed through `useErrorToast` custom hook

2. **API Error Handling**
   - Centralized through Tanstack Query client
   - Retry logic: 1 attempt for failed queries
   - Stale time: 5 minutes for cached data
   - Error messages extracted and standardized via `getErrorMessage` utility
   - Errors logged to console in development
   - Integration with error notification system

3. **React Error Boundaries**
   - Global error boundary for catching React component errors
   - User-friendly fallback UI
   - Prevents entire app crashes
   - Option to retry failed components

### Backend Error Logging

1. **PocketBase Error Collection**
   - All server-side errors logged to `error_logs` collection
   - Structured error data:
     - User ID (if available)
     - Error message
     - Stack trace
     - Timestamp
     - Request metadata (path, method, status)

2. **Error Monitoring**
   - Critical errors (status >= 500) trigger alerts
   - Alerts configured through PocketBase hooks
   - Console logging for development environment
   - Future integration with external monitoring services planned

## Best Practices

1. **Error Message Standardization**
   - User-friendly messages for display
   - Technical details logged but not shown to users
   - Consistent error message format
   - Support for different error types (Error objects, strings)

2. **Error Recovery**
   - Automatic retry for failed API requests
   - Manual retry options for component errors
   - Clear user feedback for all error states
   - Graceful degradation when possible

3. **Debugging Support**
   - Comprehensive error logging
   - Stack traces preserved for debugging
   - Request context captured for API errors
   - Environment-specific error handling
