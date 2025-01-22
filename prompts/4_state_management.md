### **Ticket 4: Integrate Tanstack Query for State Management**  
**Role:** Frontend Developer (FE)  

---

#### **Description**  
Integrate Tanstack Query (React Query) to manage server-state interactions with PocketBase. Implement caching, pagination, and synchronization for CRUD operations on `links` and `link_categories` collections. Ensure seamless data fetching, error handling, and optimistic updates.  

---

#### **Acceptance Criteria**  
1. Tanstack Query is fully configured with global settings (retries, caching, error handling).  
2. CRUD operations for `links` and `link_categories` use Tanstack Query hooks.  
3. Pagination and sorting are supported in data fetching.  
4. Optimistic updates are implemented for mutations (e.g., adding/deleting links).  
5. Queries are invalidated automatically after mutations to ensure UI consistency.  
6. Error handling displays user-friendly messages for failed requests.  

---

### **Implementation Steps**  

#### **1. Install Dependencies**  
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

#### **2. Configure QueryClient**  
```tsx
// src/services/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});
```

#### **3. Wrap the App with QueryClientProvider**  
```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import { queryClient } from './services/queryClient';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
```

#### **4. Create Custom Hooks for CRUD Operations**  
```tsx
// src/hooks/useLinks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import pb from '../services/pocketbase';

// Fetch all links for the current user
export const useLinks = (page: number = 1, perPage: number = 10) => {
  return useQuery({
    queryKey: ['links', page, perPage],
    queryFn: async () => {
      return pb.collection('links').getList(page, perPage, {
        filter: `user_id = "${pb.authStore.model?.id}"`,
        expand: 'category_id',
      });
    },
  });
};

// Create a new link
export const useCreateLink = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newLink: { url: string; title: string; description: string }) => {
      return pb.collection('links').create({
        ...newLink,
        user_id: pb.authStore.model?.id,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['links']);
      },
    }
  );
};

// Delete a link with optimistic update
export const useDeleteLink = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (linkId: string) => {
      return pb.collection('links').delete(linkId);
    },
    {
      onMutate: async (linkId) => {
        await queryClient.cancelQueries(['links']);
        const previousLinks = queryClient.getQueryData(['links']);
        queryClient.setQueryData(['links'], (old: any) => ({
          ...old,
          items: old.items.filter((link: any) => link.id !== linkId),
        }));
        return { previousLinks };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData(['links'], context?.previousLinks);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['links']);
      },
    }
  );
};
```

#### **5. Integrate with Material UI DataGrid**  
```tsx
// src/components/LinksGrid.tsx
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useLinks, useDeleteLink } from '../hooks/useLinks';

const LinksGrid = () => {
  const { data, isLoading } = useLinks();
  const { mutate: deleteLink } = useDeleteLink();

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'url', headerName: 'URL', flex: 2 },
    { field: 'description', headerName: 'Description', flex: 3 },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <Button onClick={() => deleteLink(params.row.id)}>Delete</Button>
      ),
    },
  ];

  return (
    <DataGrid
      rows={data?.items || []}
      columns={columns}
      loading={isLoading}
      pagination
      pageSize={10}
      rowsPerPageOptions={[10, 20, 50]}
    />
  );
};
```

#### **6. Global Error Handling**  
```tsx
// src/components/ErrorBoundary.tsx
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div>
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <Button onClick={resetErrorBoundary}>Try again</Button>
  </div>
);

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ReactErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};
```

---

### **Testing**  
1. Verify data is fetched and displayed in the `DataGrid` without errors.  
2. Test creating/deleting links and confirm UI updates optimistically.  
3. Check error handling by simulating API failures (e.g., disconnect network).  
4. Validate pagination and sorting behavior.  
5. Ensure cache is invalidated after mutations.  

---

### **Future Enhancements**  
1. Add optimistic updates for edits.  
2. Implement infinite scroll for pagination.  
3. Add prefetching for smoother UX.  

---

This ticket ensures efficient server-state management with Tanstack Query, reducing unnecessary API calls and improving user experience through caching and optimistic updates. Let me know if adjustments are needed!
