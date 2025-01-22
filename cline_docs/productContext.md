# Product Context

## Purpose of the Project

The **do Links Collector** project is designed to help users collect, organize, and manage web links (URLs) in a centralized and user-friendly way. It solves the problem of link overload by providing a structured system for saving, categorizing, and searching links, making it easier for users to retrieve and manage their saved resources.

---

## Problems It Solves

1. **Link Overload:**
   - Users often save links in browsers, notes, or emails, leading to disorganization and difficulty in finding them later.
   - This project provides a centralized place to store and organize links.

2. **Lack of Categorization:**
   - Without proper categorization, links become cluttered and hard to manage.
   - The project allows users to categorize links using tags or folders (e.g., `link_categories`).

3. **No Advanced Search:**
   - Finding a specific link among hundreds can be time-consuming.
   - The project includes a full-text search feature to quickly find links by title, description, or URL.

4. **No Offline Access:**
   - Users often lose access to saved links when offline.
   - The project is a Progressive Web App (PWA) that supports offline access and synchronization.

5. **No Collaboration:**
   - Sharing and collaborating on links with others is often cumbersome.
   - The project allows users to share links and collaborate on collections (future feature).

6. **No Integration with OAuth2 Providers:**
   - Users may prefer to log in with existing accounts (e.g., GitHub, Discord).
   - The project integrates OAuth2 authentication for seamless login.

---

## How It Should Work

### Core Features:

1. **Link Collection:**
   - Users can save links by entering a URL, title, and description.
   - Links can be categorized using predefined or custom categories (e.g., `link_categories`).

2. **Categorization:**
   - Users can create, edit, and delete categories (e.g., "Work", "Personal", "Research").
   - Links can be assigned to one or more categories.

3. **Advanced Search:**
   - Users can search for links by title, description, or URL using a full-text search feature.
   - Search results are displayed in a user-friendly interface (e.g., Material UI DataGrid).

4. **PWA Offline Support:**
   - Users can access saved links even when offline.
   - Changes made offline are synchronized when the user is back online.

5. **OAuth2 Authentication:**
   - Users can log in using their GitHub or Discord accounts.
   - Authentication is handled by PocketBase, ensuring security and ease of use.

6. **Theme Switcher:**
   - Users can switch between System, Dark, and Light themes.
   - Theme preferences are saved in PocketBase and persist across sessions.

---

### Workflow:

1. **User Authentication:**
   - Users log in via GitHub or Discord using OAuth2.
   - Upon successful login, they are redirected to the main dashboard.

2. **Saving Links:**
   - Users can add links manually or use a browser extension (future feature).
   - Each link includes a URL, title, description, and optional category.

3. **Organizing Links:**
   - Users can create and manage categories (e.g., `link_categories`).
   - Links can be filtered and sorted by category, date, or status (e.g., "done", "invalid").

4. **Searching Links:**
   - Users can search for links using keywords.
   - Search results are displayed in a table or card layout.

5. **Offline Access:**
   - Users can view and manage links offline.
   - Changes are synchronized with the server when the user is back online.

6. **Theme Customization:**
   - Users can switch themes (System, Dark, Light) from the settings menu.
   - Theme preferences are saved and applied automatically on subsequent logins.

---

### User Interface:

1. **Dashboard:**
   - Displays a list of saved links with options to filter, sort, and search.
   - Includes a button to add new links.

2. **Link Details Page:**
   - Shows detailed information about a link (URL, title, description, category).
   - Allows users to edit or delete the link.

3. **Categories Page:**
   - Allows users to create, edit, and delete categories.
   - Displays a list of all categories with associated links.

4. **Settings Page:**
   - Allows users to switch themes and manage account settings.

---

### Technical Workflow:

1. **Frontend:**
   - Built with Vite, React, TypeScript, and Material UI.
   - Uses Tanstack Query for state management and API interactions.
   - Implements PWA features for offline support.

2. **Backend:**
   - Powered by PocketBase for database and authentication.
   - Uses PocketBase collections (`links`, `link_categories`, `users`, `security_logs`) to store data.
   - Handles OAuth2 authentication via GitHub and Discord.
   - Implements rate limiting for authentication endpoints.

3. **Deployment:**
   - Hosted on Netlify for frontend deployment.
   - PocketBase is hosted separately (e.g., on a VPS or cloud service).
   - Enforces HTTPS using Netlify configuration.

---

## Example User Scenarios

1. **Saving a Link:**
   - A user finds an interesting article and saves it to the app with the title "React Best Practices" and the category "Development".

2. **Searching for a Link:**
   - The user searches for "React" and finds all links related to React, including the one saved earlier.

3. **Organizing Links:**
   - The user creates a new category called "Tutorials" and moves relevant links into it.

4. **Offline Access:**
   - The user accesses the app on a flight and views saved links without an internet connection.

5. **Theme Customization:**
   - The user switches to Dark Mode for better readability at night.

---

## Future Enhancements

1. **Browser Extension:**
   - Add a browser extension for saving links directly from the browser.

2. **Collaboration:**
   - Allow users to share links and collaborate on collections.

3. **Analytics:**
   - Provide insights into link usage (e.g., most visited links).

4. **AI-Powered Suggestions:**
   - Use AI to suggest categories or tags based on link content.

5. **Export/Import:**
   - Allow users to export links as JSON or CSV and import them from other services.

---

## Conclusion

The **do Links Collector** project solves the problem of link overload by providing a centralized, organized, and user-friendly system for saving, categorizing, and searching links. It leverages modern technologies like Vite, React, TypeScript, and PocketBase to deliver a seamless and efficient user experience. The recent enhancements include robust input validation, comprehensive CSRF protection, secure API communication, and effective error handling, ensuring compliance with industry security standards to safeguard against common vulnerabilities such as XSS, CSRF, and SQL injection. Let me know if you need further clarification or assistance!
