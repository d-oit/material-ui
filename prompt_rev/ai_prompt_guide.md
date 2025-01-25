# AI Prompt Engineering Guide for Link Collector Application

## 1. AI Prompt Engineering Principles

### 1.1 Core Prompt Structure
```markdown
ROLE: [Specific role from project guide]
CONTEXT: [Project context and background]
TASK: [Specific task description]
CONSTRAINTS: [Technical and business constraints]
REQUIREMENTS: [Specific requirements and acceptance criteria]
OUTPUT FORMAT: [Expected output format]
ADDITIONAL CONTEXT: [Any relevant technical details]
```

### 1.2 Role-Specific Prompt Templates

#### Technical Architect Prompt Template
```markdown
ROLE: Technical Architect specializing in PWA architecture and secure data management

CONTEXT: Link Collector application requiring offline-first architecture with PocketBase backend

TASK: Design/Review/Implement [specific architectural component]

CONSTRAINTS:
- Must support offline functionality
- Performance requirements (First paint < 1.5s)
- GDPR compliance requirements
- Security requirements for data handling

TECHNICAL REQUIREMENTS:
- React + TypeScript stack
- Material-UI components
- PocketBase integration
- PWA implementation
- Security measures

EXPECTED DELIVERABLES:
- Architectural design documentation
- Technical specifications
- Security considerations
- Performance optimization strategies

EVALUATION CRITERIA:
- Scalability of solution
- Security compliance
- Performance metrics
- Implementation feasibility
```

#### Frontend Developer Prompt Template
```markdown
ROLE: Frontend Developer with React/TypeScript and PWA expertise

CONTEXT: Implementing UI components for Link Collector application

TASK: Develop/Enhance/Debug [specific UI component or feature]

TECHNICAL SPECIFICATIONS:
- React 18+ with TypeScript
- Material-UI v6+
- PWA requirements
- Offline functionality

REQUIREMENTS:
- Component specifications
- Accessibility standards
- Performance targets
- Error handling requirements

ACCEPTANCE CRITERIA:
- Unit test coverage > 80%
- Accessibility compliance
- Performance benchmarks
- Responsive design implementation

ADDITIONAL CONSIDERATIONS:
- Error states
- Loading states
- Offline behavior
- Data synchronization
```

#### Backend Developer Prompt Template
```markdown
ROLE: Backend Developer specializing in PocketBase and API development

CONTEXT: Implementing backend functionality for Link Collector

TASK: Develop/Enhance/Debug [specific backend feature]

TECHNICAL SPECIFICATIONS:
- PocketBase implementation
- Data model requirements
- API endpoint specifications
- Security requirements

REQUIREMENTS:
- Data validation rules
- Error handling specifications
- Performance requirements
- Security measures

CONSIDERATIONS:
- Data privacy
- GDPR compliance
- Rate limiting
- Error logging
```

### 1.3 Task-Specific Prompt Patterns

#### Feature Implementation Prompt
```markdown
CONTEXT: Implementing [feature] in Link Collector application

REQUIREMENTS:
1. Technical Requirements:
   - [Specific technical requirements]
   - Performance criteria
   - Security requirements

2. Functional Requirements:
   - User story implementation
   - Edge cases handling
   - Error scenarios

3. Quality Requirements:
   - Test coverage
   - Documentation
   - Code quality standards

CONSTRAINTS:
- Technical limitations
- Performance requirements
- Security considerations

EXPECTED OUTPUT:
- Implementation approach
- Technical considerations
- Risk assessment
- Testing strategy
```

#### Bug Fix Prompt
```markdown
CONTEXT: Resolving [issue] in Link Collector application

ISSUE DESCRIPTION:
- Current behavior
- Expected behavior
- Impact assessment

TECHNICAL CONTEXT:
- Affected components
- Related dependencies
- Environment details

REQUIREMENTS:
- Root cause analysis
- Fix implementation
- Test cases
- Regression prevention

DELIVERABLES:
- Solution description
- Implementation steps
- Testing approach
- Validation criteria
```

### 1.4 Quality Assurance Prompts

```markdown
ROLE: QA Engineer focusing on comprehensive testing

CONTEXT: Testing [feature/component] of Link Collector

SCOPE:
- Functional testing
- Performance testing
- Security testing
- Accessibility testing

TEST REQUIREMENTS:
1. Functional Testing:
   - User flows
   - Edge cases
   - Error scenarios

2. Performance Testing:
   - Load times
   - Response times
   - Offline behavior

3. Security Testing:
   - Data protection
   - Authentication
   - Authorization

4. Accessibility Testing:
   - WCAG compliance
   - Screen reader compatibility
   - Keyboard navigation

DELIVERABLES:
- Test cases
- Automation scripts
- Test results
- Issue documentation
```

## 2. Best Practices for Prompt Engineering

### 2.1 Clarity and Precision
- Use specific technical terms
- Define clear acceptance criteria
- Specify exact requirements
- Include relevant constraints

### 2.2 Context Provision
- Include technical stack details
- Specify environment requirements
- Reference related documentation
- Provide example scenarios

### 2.3 Output Formatting
- Define expected response structure
- Specify code formatting requirements
- Include documentation requirements
- Detail testing requirements

## 3. Prompt Evaluation Criteria

### 3.1 Technical Accuracy
- Correct technical terminology
- Accurate requirement specification
- Proper constraint definition
- Clear implementation guidance

### 3.2 Completeness
- All requirements covered
- Edge cases considered
- Error scenarios included
- Testing criteria specified

### 3.3 Clarity
- Clear task definition
- Unambiguous requirements
- Specific acceptance criteria
- Detailed output expectations

## 4. Example Prompt Applications

### 4.1 Feature Development
```markdown
TASK: Implement offline link management

CONTEXT: Users need to manage links while offline
- Create new links
- View existing links
- Update link details
- Sync when online

TECHNICAL REQUIREMENTS:
- IndexedDB for offline storage
- Service Worker implementation
- Sync management
- Conflict resolution

ACCEPTANCE CRITERIA:
- Offline creation works
- Sync occurs on reconnection
- Conflicts are handled gracefully
- User feedback is clear
```

### 4.2 Performance Optimization
```markdown
TASK: Optimize application performance

CONTEXT: Improve application load time and responsiveness

FOCUS AREAS:
- Initial load time
- Time to interactive
- Offline functionality
- Resource optimization

TECHNICAL REQUIREMENTS:
- Bundle optimization
- Asset optimization
- Caching strategy
- Loading strategy

METRICS:
- First paint < 1.5s
- TTI < 3.0s
- Offline response < 100ms
```

### 4.3 Security Implementation
```markdown
TASK: Implement security measures

CONTEXT: Ensure application security and data protection

REQUIREMENTS:
- Authentication implementation
- Authorization controls
- Data encryption
- Security logging

TECHNICAL SPECIFICATIONS:
- JWT implementation
- Role-based access
- Data protection
- Audit logging

COMPLIANCE:
- GDPR requirements
- Security best practices
- Data privacy standards
