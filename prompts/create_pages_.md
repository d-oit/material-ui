### **Ticket: UI/UX Design System & Page Layout Implementation**  
**Role:** UI/UX Designer & Frontend Developer  

---

#### **Description**  
Define and implement a cohesive design system (colors, typography, spacing, effects) and layout for all application pages, ensuring consistency, accessibility, and alignment with Material UI best practices.  

---

### **Design System Specifications**  

#### **1. Color Palette**  
| Role                | Light Mode                                | Dark Mode                                 |  
|---------------------|-------------------------------------------|-------------------------------------------|  
| **Primary**         | `#1976D2` (Material Blue 700)             | `#90CAF9` (Material Blue 200)             |  
| **Secondary**       | `#DC004E` (Material Pink 500)             | `#F48FB1` (Material Pink 200)             |  
| **Background**      | `#FFFFFF`                                 | `#121212`                                 |  
| **Surface**         | `#F5F5F5`                                 | `#1E1E1E`                                 |  
| **Text Primary**    | `rgba(0, 0, 0, 0.87)`                    | `rgba(255, 255, 255, 0.87)`              |  
| **Text Secondary**  | `rgba(0, 0, 0, 0.6)`                     | `rgba(255, 255, 255, 0.6)`               |  
| **Accent**          | `#4CAF50` (Success), `#FF5252` (Error)    | `#81C784` (Success), `#FF8A80` (Error)    |  

#### **2. Typography**  
- **Font Family:** `'Roboto', sans-serif` (Material UI default).  
- **Scale:**  
  - H1: `2.5rem` (Bold)  
  - H2: `2rem` (Medium)  
  - Body: `1rem` (Regular)  
  - Caption: `0.875rem` (Regular, 60% opacity).  

#### **3. Spacing & Grid**  
- **Base Unit:** `8px` (Material UI standard).  
- **Layout Grid:** 12-column responsive grid with breakpoints:  
  - Mobile: `0–600px`  
  - Tablet: `600–960px`  
  - Desktop: `960px+`.  

#### **4. Effects & Transitions**  
- **Elevation:** Use Material UI `sx` shadows (e.g., `theme.shadows[2]` for cards).  
- **Hover Effects:**  
  - Buttons: 10% opacity overlay + elevation increase.  
  - Cards: Smooth scale-up (CSS `transform: scale(1.02)`).  
- **Transitions:**  
  - Default: `transition: all 0.3s ease-in-out`.  
  - Theme Toggle: Cross-fade animation for background/text.  

---

### **Page Layouts**  

#### **1. Dashboard (Main Links Grid)**  
- **Layout:**  
  - **AppBar:** Fixed top bar with search, theme switcher, and user avatar.  
  - **Content:**  
    - **DataGrid:** Responsive MUI `DataGrid` with infinite scroll.  
    - **FAB:** Floating "+" button (bottom-right) to add new links.  
  - **Mobile:** Stacked list with collapsible side navigation.  
- **Key Interactions:**  
  - **Hover:** Highlight row with `background-color: rgba(25, 118, 210, 0.08)`.  
  - **Edit/Done:** Pulsating border during optimistic updates.  

![Dashboard Layout](https://i.imgur.com/4QkGZ7L.png)  

---

#### **2. Link Details Page**  
- **Layout:**  
  - **Header:** Back button + link title.  
  - **Body:**  
    - **URL Preview:** Card with favicon, title, and Open button.  
    - **Metadata:** Tags, category, and description.  
  - **Actions:** Edit/Delete buttons with confirmation dialogs.  
- **Effects:**  
  - **Loading:** Skeleton loader for metadata.  
  - **Error:** Shake animation on invalid URL.  

---

#### **3. Categories Management Page**  
- **Layout:**  
  - **Grid:** Masonry layout for categories (MUI `Masonry`).  
  - **Add Category:** Inline text field with instant creation.  
- **Interactions:**  
  - **Drag & Drop:** Reorder categories (react-beautiful-dnd).  
  - **Delete:** Slide-out animation.  

---

#### **4. Settings Page**  
- **Layout:**  
  - **Tabs:** Account, Theme, Security.  
  - **Theme Switcher:** Toggle between System/Dark/Light with live preview.  
- **Accessibility:**  
  - Focus rings for keyboard navigation.  
  - ARIA labels for screen readers.  

---

#### **5. Sign-In Page**  
- **Layout:**  
  - **Centered Card:** Material UI `Card` with OAuth2 buttons.  
  - **Visuals:** Subtle gradient background (`linear-gradient(45deg, #1976D2 30%, #DC004E 90%)`).  
- **Micro-Interactions:**  
  - Button ripple effect.  
  - Loading spinner on OAuth2 login.  

---

#### **6. Empty States & Errors**  
- **Empty Links Grid:**  
  - Illustration + "Add your first link" CTA.  
  - Animated floating "+" button.  
- **404 Page:**  
  - Full-screen illustration with return button.  
  - Parallax scroll effect.  

---

### **Implementation Steps**  

#### **1. Theme Configuration**  
```tsx  
// src/styles/theme.ts  
import { createTheme } from '@mui/material/styles';  

export const lightTheme = createTheme({  
  palette: {  
    mode: 'light',  
    primary: { main: '#1976D2' },  
    secondary: { main: '#DC004E' },  
    background: { default: '#FFFFFF', paper: '#F5F5F5' },  
  },  
});  

export const darkTheme = createTheme({  
  palette: {  
    mode: 'dark',  
    primary: { main: '#90CAF9' },  
    secondary: { main: '#F48FB1' },  
    background: { default: '#121212', paper: '#1E1E1E' },  
  },  
});  
```  

#### **2. Global Styles**  
```tsx  
// src/styles/global.ts  
import { GlobalStyles } from '@mui/material';  

export const globalStyles = (  
  <GlobalStyles  
    styles={(theme) => ({  
      body: {  
        transition: 'background-color 0.3s ease, color 0.3s ease',  
      },  
      '.hover-scale': {  
        transition: 'transform 0.2s',  
        '&:hover': { transform: 'scale(1.02)' },  
      },  
    })}  
  />  
);  
```  

#### **3. Responsive Layout Components**  
```tsx  
// src/components/ResponsiveContainer.tsx  
import { Container, useMediaQuery } from '@mui/material';  

export const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => {  
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));  
  return <Container maxWidth={isMobile ? 'sm' : 'lg'}>{children}</Container>;  
};  
```  

---

### **Deliverables**  
1. **Figma/Sketch File:** High-fidelity mockups for all pages.  
2. **Style Guide:** PDF with color codes, typography, and component specs.  
3. **Annotated Screenshots:** Interaction notes for developers.  

---

### **Testing**  
1. **Cross-Browser:** Chrome, Firefox, Safari.  
2. **Responsive Testing:** Chrome DevTools device emulator.  
3. **Animation Smoothness:** 60 FPS check in Chrome Performance tab.  

---

This ticket ensures a polished, accessible, and performant UI that aligns with the project’s technical architecture. Let me know if you need refinements!
