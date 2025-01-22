# Technical Context

## Technologies Used
- **Frontend:**
  - Vite
  - React
  - TypeScript
  - Material UI
  - React Hook Form
  - Yup
  - Tanstack Query

- **Backend:**
  - PocketBase

- **Deployment:**
  - Netlify

## Development Setup
- **Frontend:**
  - Vite for fast development and build optimization.
  - React for building user interfaces.
  - TypeScript for type safety and better development experience.
  - Material UI for a consistent and responsive user interface.
  - React Hook Form and Yup for input validation.
  - Tanstack Query for state management and API interactions.

- **Backend:**
  - PocketBase for database and authentication.
  - PocketBase collections for data storage and management.
  - OAuth2 authentication via GitHub and Discord.
  - Rate limiting for authentication endpoints.

- **Deployment:**
  - Netlify for frontend deployment.
  - PocketBase hosted separately (e.g., on a VPS or cloud service).
  - HTTPS enforcement using Netlify configuration.

## Technical Constraints
- **Security:**
  - Input validation using React Hook Form and Yup.
  - CSRF protection with double-submit cookies.
  - HTTPS enforcement using Netlify configuration.
  - Rate limiting for authentication endpoints.
  - Structured logging for better traceability and debugging.

- **Performance:**
  - Use of Vite for fast development and build optimization.
  - Efficient use of Tanstack Query for state management and API interactions.
  - Optimized deployment on Netlify for performance and scalability.

- **Scalability:**
  - Modular and scalable architecture with separate frontend and backend.
  - Use of collections in PocketBase for data storage and management.
  - Integration of PWA features for offline support.
