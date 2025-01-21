# System Patterns

## How the System is Built
- The frontend is built using Vite, a modern build tool that supports fast development and optimized builds.
- The backend is powered by PocketBase, a backend-in-a-box solution that provides a ready-to-use database and API services.
- React is used for building the user interface.
- ESLint and Prettier are configured for code quality and consistency.

## Key Technical Decisions
- Use Vite for frontend development due to its fast development server and optimized builds.
- Use PocketBase for the backend to simplify database management and API services.
- Use React for building the user interface due to its component-based architecture and strong ecosystem.
- Configure ESLint and Prettier to enforce code quality and consistency across the project.

## Architecture Patterns
- The frontend communicates with the PocketBase backend using RESTful APIs.
- The application follows a modular architecture with separate folders for components, hooks, pages, services, styles, types, and utilities.
