### **Ticket 1: Set Up Project Structure**

**Role:** Frontend Developer (FE)

---

#### **Description:**
Set up the initial project structure using the [Material UI Vite + TypeScript template](https://github.com/mui/material-ui/tree/master/examples/material-ui-vite-ts) as the foundation. Integrate PocketBase OAuth2 authentication (GitHub) using the [Material UI SignIn template](https://github.com/mui/material-ui/blob/v6.4.1/docs/data/material/getting-started/templates/sign-in/SignIn.tsx). Ensure the project is configured with best practices for scalability, maintainability, and performance.

---

#### **Acceptance Criteria:**
1. Project is initialized using the Material UI Vite + TypeScript template.
2. Material UI is integrated with a custom theme.
3. PocketBase SDK is configured and OAuth2 authentication (GitHub) is implemented.
4. Environment variable for PocketBase URL is set up.
5. Basic folder structure is organized for scalability.
6. Code is linted and formatted using ESLint and Prettier.

---

#### **Implementation Steps:**

1. **Clone the Material UI Vite + TypeScript Template:**
Important: Check first if the folder material-ui exists
   ```bash
   git clone https://github.com/mui/material-ui.git
   cd material-ui/examples/material-ui-vite-ts
   npm install
   ```

2. **Install PocketBase SDK and Additional Dependencies:**
   ```bash
   npm install pocketbase @tanstack/react-query
   ```

3. **Configure ESLint and Prettier:**
Important: Only create if  not exists
   - Create `.eslintrc.json`:
     ```json
     {
       "extends": [
         "eslint:recommended",
         "plugin:react/recommended",
         "plugin:@typescript-eslint/recommended",
         "plugin:prettier/recommended"
       ],
       "parser": "@typescript-eslint/parser",
       "plugins": ["react", "@typescript-eslint", "prettier"],
       "rules": {
         "prettier/prettier": "error",
         "react/react-in-jsx-scope": "off"
       },
       "settings": {
         "react": {
           "version": "detect"
         }
       }
     }
     ```
   - Create `.prettierrc`:
     ```json
     {
       "semi": true,
       "singleQuote": true,
       "trailingComma": "es5",
       "printWidth": 80,
       "tabWidth": 2
     }
     ```

4. **Set Up Folder Structure:**
   ```
   src/
   ├── assets/            # Static assets (images, icons, etc.)
   ├── components/        # Reusable components
   ├── hooks/             # Custom hooks
   ├── pages/             # Page components
   ├── services/          # API services and PocketBase client
   ├── styles/            # Global styles and theme
   ├── types/             # TypeScript types
   ├── utils/             # Utility functions
   ├── App.tsx            # Main application component
   ├── main.tsx           # Entry point
   └── vite-env.d.ts      # Vite environment types
   ```

5. **Configure PocketBase Client:**
   - Create `src/services/pocketbase.ts`:
     ```typescript
     import PocketBase from 'pocketbase';

     const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

     export default pb;
     ```

6. **Set Up Environment Variables:**
   - Create `.env`:
     ```
     VITE_POCKETBASE_URL=http://127.0.0.1:8090
     ```
   - Add `.env` to `.gitignore`.

7. **Integrate Material UI Theme:**
   - Update `src/styles/theme.ts` (if it doesn’t exist, create it):
     ```typescript
     import { createTheme } from '@mui/material/styles';

     const theme = createTheme({
       palette: {
         primary: {
           main: '#1976d2',
         },
         secondary: {
           main: '#dc004e',
         },
       },
     });

     export default theme;
     ```

8. **Implement OAuth2 Authentication:**
   - Create `src/components/SignIn.tsx` (based on the Material UI SignIn template):
     ```tsx
     import { useState } from 'react';
     import { Button, Container, Typography } from '@mui/material';
     import { GitHub } from '@mui/icons-material';
     import pb from '../services/pocketbase';

     const SignIn = () => {
       const [isLoading, setIsLoading] = useState(false);

       const handleGitHubLogin = async () => {
         setIsLoading(true);
         try {
           await pb.collection('users').authWithOAuth2({ provider: 'github' });
           window.location.href = '/';
         } catch (error) {
           console.error('Login failed:', error);
         } finally {
           setIsLoading(false);
         }
       };

       return (
         <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
           <Typography variant="h4" gutterBottom>
             Welcome to do Links Collector
           </Typography>
           <Button
             variant="contained"
             startIcon={<GitHub />}
             onClick={handleGitHubLogin}
             disabled={isLoading}
           >
             Sign in with GitHub
           </Button>
         </Container>
       );
     };

     export default SignIn;
     ```

9. **Update `App.tsx`:**
   ```tsx
   import { ThemeProvider } from '@mui/material/styles';
   import CssBaseline from '@mui/material/CssBaseline';
   import theme from './styles/theme';
   import SignIn from './components/SignIn';

   const App = () => {
     return (
       <ThemeProvider theme={theme}>
         <CssBaseline />
         <SignIn />
       </ThemeProvider>
     );
   };

   export default App;
   ```

10. **Run the Project:**
    ```bash
    npm run dev
    ```

---

#### **Testing:**
- Verify the project runs without errors.
- Test GitHub OAuth2 login flow.
- Ensure the PocketBase URL environment variable is correctly loaded.
- Check that ESLint and Prettier are working.

---

#### **Future Enhancements:**
- Add error handling for failed OAuth2 login.
- Implement a loading state during authentication.
- Add a logout button and user profile display.

---

This ticket provides a complete implementation plan for setting up the project structure and integrating PocketBase OAuth2 authentication using the specified templates. Let me know if you need further assistance!
