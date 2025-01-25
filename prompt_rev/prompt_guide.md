# Link Collector Application - Prompt Engineering Guide

## Version History
- v1.0.0 (Initial Release) - January 25, 2025

## 1. System Context and Objectives

### 1.1 Overview
The Link Collector is a modern web application built to help users collect, organize, and manage web links with the following key features:
- Progressive Web App (PWA) capabilities with offline support
- Material-UI based responsive interface
- PocketBase backend integration
- Secure authentication and data management

### 1.2 Core Objectives
- Enable efficient link management with categorization
- Provide seamless offline functionality
- Ensure secure data handling and user privacy
- Deliver responsive and accessible user interface

## 2. Technical Requirements and Constraints

### 2.1 Frontend Stack
```typescript
// Core Technologies
- React 18+ with TypeScript
- Vite as build tool
- Material-UI v6+
- React Query for data management
- React Router for navigation
```

### 2.2 Backend Integration
```typescript
// PocketBase Configuration
const baseUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';
```

### 2.3 PWA Requirements
- Service Worker implementation
- Offline data synchronization
- Push notification support
- App manifest configuration

## 3. Core Functionality Specifications

### 3.1 Link Management
```typescript
interface LinkData {
  url: string;      // Valid URL format
  title: string;    // Max 100 characters
  category: string; // Required categorization
}
```

### 3.2 Data Validation Rules
```typescript
const validationSchema = {
  url: "Required, valid URL format",
  title: "Required, max 100 characters",
  category: "Required, string"
}
```

## 4. Data Models and Relationships

### 4.1 Link Model
```typescript
interface Link {
  id: string;
  url: string;
  title: string;
  category: string;
  created: string;
  updated: string;
  userId: string;
}
```

### 4.2 User Model
```typescript
interface User {
  id: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  }
}
```

## 5. UI/UX Guidelines and Best Practices

### 5.1 Theme Configuration
```typescript
// Theme Options
interface ThemeOptions {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
}
```

### 5.2 Component Patterns
- Use Material-UI components for consistency
- Implement responsive layouts
- Follow accessibility guidelines
- Provide loading and error states

## 6. Integration Requirements

### 6.1 PocketBase Integration
```typescript
class PocketBaseIntegration {
  // Authentication
  auth: {
    login(): Promise<void>;
    logout(): Promise<void>;
  }
  
  // Data Operations
  links: {
    create(data: LinkData): Promise<Link>;
    update(id: string, data: Partial<LinkData>): Promise<Link>;
    delete(id: string): Promise<void>;
  }
}
```

### 6.2 PWA Integration
```typescript
interface OfflineSync {
  queueOperation(operation: QueuedOperation): void;
  syncQueue(): Promise<void>;
  getOfflineStatus(): boolean;
}
```

## 7. Testing and Quality Assurance Criteria

### 7.1 Test Coverage Requirements
```typescript
// Required Test Categories
interface TestCoverage {
  unit: {
    components: boolean;
    hooks: boolean;
    utils: boolean;
  };
  integration: {
    api: boolean;
    offline: boolean;
  };
  e2e: {
    userFlows: boolean;
  }
}
```

### 7.2 Performance Metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Offline functionality response: < 100ms

## 8. Performance and Scalability Targets

### 8.1 Performance Goals
```typescript
interface PerformanceTargets {
  loadTime: '< 2 seconds';
  firstPaint: '< 1 second';
  offlineResponse: '< 100ms';
  synchronization: '< 5 seconds';
}
```

### 8.2 Scalability Considerations
- Efficient data caching
- Lazy loading of components
- Optimized asset delivery
- Rate limiting protection

## 9. Security and Compliance Needs

### 9.1 Security Requirements
```typescript
interface SecurityMeasures {
  authentication: 'JWT-based';
  authorization: 'Role-based';
  dataEncryption: 'In-transit and at-rest';
  inputValidation: 'Server and client-side';
}
```

### 9.2 GDPR Compliance
- User data consent management
- Data retention policies
- Right to be forgotten implementation
- Data export capabilities

## 10. Deployment and Maintenance Guidance

### 10.1 Deployment Process
```typescript
interface DeploymentSteps {
  build: 'npm run build';
  test: 'npm run test';
  deploy: 'continuous deployment via defined pipeline';
}
```

### 10.2 Monitoring Requirements
- Error tracking and logging
- Performance monitoring
- User analytics
- Security audit logging

## Edge Cases and Error Handling

### Error Scenarios
```typescript
interface ErrorHandling {
  networkFailure: 'Offline mode activation';
  authExpired: 'Auto-refresh token';
  validationError: 'User feedback';
  serverError: 'Graceful degradation';
}
```

### Recovery Procedures
- Automatic retry with exponential backoff
- Data conflict resolution
- Session recovery
- Error boundary implementation

## Acceptance Criteria

### Feature Completion
1. Users can add, edit, and delete links
2. Offline functionality works seamlessly
3. Data synchronizes correctly
4. UI is responsive and accessible
5. Security measures are implemented

### Quality Standards
1. Test coverage > 80%
2. No critical security vulnerabilities
3. Accessibility score > 90%
4. Performance metrics met
5. Code quality standards maintained
