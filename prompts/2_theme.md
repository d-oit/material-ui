### **Ticket 2: Implement Theme Switcher**

**Role:** Frontend Developer (FE)

---

#### **Description:**
Implement a theme switcher that allows users to choose between **System**, **Dark**, and **Light** themes. The selected theme preference must be stored in PocketBase and persist across sessions. The UI should dynamically update to reflect the chosen theme, and system preferences should be detected automatically when "System" is selected.

---

#### **Acceptance Criteria:**
1. Theme switcher component is integrated into the app layout (e.g., AppBar or Settings menu).
2. User’s theme preference is stored in PocketBase’s `users` collection.
3. Theme is applied on initial load and persists across page reloads.
4. System theme detection works when "System" is selected.
5. UI components (Material UI) adapt to the selected theme.
6. Error handling for failed PocketBase updates.

---

### **Implementation Steps:**

#### **1. Update PocketBase `users` Collection Schema**
- **Add a `theme` field** to the `users` collection:
  - **Type:** Text
  - **Options:** `system`, `dark`, `light` (default: `system`).
  - **Rules:** Editable by the user (`updateRule: "user.id = @request.auth.id"`).

#### **2. Create a Theme Context and Provider**
```tsx
// src/contexts/ThemeContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import pb from '../services/pocketbase';

type ThemeMode = 'system' | 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light');
  const queryClient = useQueryClient();

  // Fetch user's theme preference
  const { data: user } = useQuery(['currentUser'], () => pb.authStore.model);
  const currentTheme = (user?.theme as ThemeMode) || 'system';

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => {
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', updateSystemTheme);
    updateSystemTheme();
    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  // Update resolved theme based on user preference
  useEffect(() => {
    if (currentTheme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setResolvedTheme(systemDark ? 'dark' : 'light');
    } else {
      setResolvedTheme(currentTheme === 'dark' ? 'dark' : 'light');
    }
  }, [currentTheme]);

  // Mutation to update theme in PocketBase
  const { mutate: updateTheme } = useMutation(
    async (theme: ThemeMode) => {
      await pb.collection('users').update(pb.authStore.model?.id, { theme });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['currentUser']),
    }
  );

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        setTheme: (theme) => updateTheme(theme),
        resolvedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
```

#### **3. Build the Theme Switcher Component**
```tsx
// src/components/ThemeSwitcher.tsx
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ButtonGroup variant="contained" aria-label="Theme switcher">
      <Button
        onClick={() => setTheme('system')}
        color={theme === 'system' ? 'primary' : 'inherit'}
        startIcon={<SettingsBrightnessIcon />}
      >
        System
      </Button>
      <Button
        onClick={() => setTheme('light')}
        color={theme === 'light' ? 'primary' : 'inherit'}
        startIcon={<LightModeIcon />}
      >
        Light
      </Button>
      <Button
        onClick={() => setTheme('dark')}
        color={theme === 'dark' ? 'primary' : 'inherit'}
        startIcon={<DarkModeIcon />}
      >
        Dark
      </Button>
    </ButtonGroup>
  );
};

export default ThemeSwitcher;
```

#### **4. Integrate with Material UI Theme**
Update the theme configuration to dynamically adapt to `resolvedTheme`:
```tsx
// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';
import { useTheme } from '../contexts/ThemeContext';

export const getTheme = (mode: 'dark' | 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: mode === 'dark' ? '#f48fb1' : '#dc004e',
      },
    },
  });
```

#### **5. Update `App.tsx`**
Wrap the app with `ThemeProvider` and apply the dynamic theme:
```tsx
// src/App.tsx
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from './contexts/ThemeContext';
import { getTheme } from './styles/theme';

const AppWrapper = () => {
  const { resolvedTheme } = useTheme();
  const theme = getTheme(resolvedTheme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {/* Rest of your app components */}
    </MuiThemeProvider>
  );
};
```

#### **6. Add Theme Switcher to the Layout**
Place the `ThemeSwitcher` component in the app bar or settings menu:
```tsx
// src/components/AppBar.tsx
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ThemeSwitcher from './ThemeSwitcher';

const CustomAppBar = () => (
  <AppBar position="static">
    <Toolbar>
      <ThemeSwitcher />
    </Toolbar>
  </AppBar>
);
```

---

### **Testing:**
1. Verify the theme switcher toggles between themes and updates the UI.
2. Check that the selected theme is saved to PocketBase’s `users` collection.
3. Test system theme detection by changing OS preferences.
4. Ensure the theme persists after reloading the page.

---

### **Future Enhancements:**
- Add loading states during theme updates.
- Implement error toasts if PocketBase update fails.
- Sync theme preferences across multiple devices.

---

This ticket ensures a seamless and visually consistent user experience by integrating dynamic theme switching with PocketBase persistence. Let me know if you need further adjustments!
