### **Ticket 4.1: Enhanced UX/UI for Data Interactions**  
**Role:** Frontend Developer (FE) & UI/UX Designer  

---

#### **Description**  
Improve the user experience by adding **optimistic updates for edits**, **infinite scroll pagination**, and **data prefetching** to create a seamless, responsive interface. Ensure visual consistency and smooth transitions during data interactions.  

---

### **Acceptance Criteria**  
1. **Optimistic Updates:**  
   - Edits to links/categories reflect immediately in the UI, with rollback on error.  
   - Visual feedback (e.g., loading state, success/error indicators) is provided.  

2. **Infinite Scroll:**  
   - Additional links load automatically as the user scrolls.  
   - Loading spinner/skeleton is shown while fetching the next page.  

3. **Prefetching:**  
   - Prefetch the next page of links when the user nears the end of the list.  
   - Prefetch link details on hover for faster navigation.  

4. **UI/UX Design:**  
   - Smooth animations for edits and infinite scroll.  
   - Consistent styling for loading states and error messages.  

---

### **Implementation Steps**  

---

#### **1. Optimistic Updates for Edits**  
**Technical Implementation:**  
```tsx  
// src/hooks/useUpdateLink.ts  
import { useMutation, useQueryClient } from '@tanstack/react-query';  
import pb from '../services/pocketbase';  

export const useUpdateLink = () => {  
  const queryClient = useQueryClient();  
  return useMutation(  
    async ({ id, title }: { id: string; title: string }) => {  
      return pb.collection('links').update(id, { title });  
    },  
    {  
      onMutate: async (variables) => {  
        await queryClient.cancelQueries(['links']);  
        const previousLinks = queryClient.getQueryData(['links']);  
        queryClient.setQueryData(['links'], (old: any) => ({  
          ...old,  
          items: old.items.map((link: any) =>  
            link.id === variables.id ? { ...link, title: variables.title } : link  
          ),  
        }));  
        return { previousLinks };  
      },  
      onError: (err, _, context) => {  
        queryClient.setQueryData(['links'], context?.previousLinks);  
        toast.error('Failed to update link');  
      },  
      onSettled: () => {  
        queryClient.invalidateQueries(['links']);  
      },  
    }  
  );  
};  
```  

**UI/UX Design:**  
- Add a **pulsating border** around the edited item during the update.  
- Show a **checkmark** on success or **error toast** on failure.  

---

#### **2. Infinite Scroll Pagination**  
**Technical Implementation:**  
```tsx  
// src/hooks/useInfiniteLinks.ts  
import { useInfiniteQuery } from '@tanstack/react-query';  
import pb from '../services/pocketbase';  

export const useInfiniteLinks = () => {  
  return useInfiniteQuery(  
    ['links'],  
    async ({ pageParam = 1 }) => {  
      const data = await pb.collection('links').getList(pageParam, 10, {  
        sort: '-created',  
      });  
      return { ...data, nextPage: pageParam + 1 };  
    },  
    {  
      getNextPageParam: (lastPage) => lastPage.nextPage,  
    }  
  );  
};  

// src/components/LinksList.tsx  
import { useInView } from 'react-intersection-observer';  

const LinksList = () => {  
  const { data, fetchNextPage } = useInfiniteLinks();  
  const { ref: scrollTrigger } = useInView({  
    onChange: (inView) => inView && fetchNextPage(),  
  });  

  return (  
    <div>  
      {data?.pages.map((page) =>  
        page.items.map((link) => <LinkItem key={link.id} {...link} />)  
      )}  
      <div ref={scrollTrigger}>  
        <CircularProgress />  
      </div>  
    </div>  
  );  
};  
```  

**UI/UX Design:**  
- Use a **skeleton loader** during initial load.  
- Show a **subtle progress bar** at the bottom when fetching the next page.  

---

#### **3. Prefetching for Smoother UX**  
**Technical Implementation:**  
```tsx  
// Prefetch next page on scroll  
useEffect(() => {  
  if (inView) {  
    queryClient.prefetchQuery(  
      ['links', nextPage],  
      () => pb.collection('links').getList(nextPage, 10)  
    );  
  }  
}, [inView, nextPage]);  

// Prefetch link details on hover  
const LinkItem = ({ id }: { id: string }) => {  
  const queryClient = useQueryClient();  

  return (  
    <div  
      onMouseEnter={() =>  
        queryClient.prefetchQuery(['link', id], () =>  
          pb.collection('links').getOne(id)  
        )  
      }  
    >  
      {/* Link content */}  
    </div>  
  );  
};  
```  

**UI/UX Design:**  
- Add a **hover effect** (e.g., elevation, color shift) to hint at interactivity.  

---

### **UI/UX Specifications**  
1. **Animations:**  
   - **Edit Feedback:** Pulsating border (CSS `@keyframes pulse`).  
   - **Infinite Scroll:** Fade-in effect for new items.  

2. **Loading States:**  
   - **Skeleton Loader:**  
     ```tsx  
     <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 1 }} />  
     ```  
   - **Progress Bar:**  
     ```tsx  
     <LinearProgress sx={{ height: 2, my: 2 }} />  
     ```  

3. **Error States:**  
   - **Toast Notification:**  
     ```tsx  
     <Alert severity="error" sx={{ position: 'fixed', bottom: 16, right: 16 }}>  
       Failed to save changes.  
     </Alert>  
     ```  

---

### **Testing**  
1. **Optimistic Updates:**  
   - Edit a link with network throttling (Slow 3G) to verify UI rollback on error.  
2. **Infinite Scroll:**  
   - Scroll to the bottom of the list; confirm next page loads automatically.  
3. **Prefetching:**  
   - Hover over a link and navigate to its details; verify instant load.  

---

### **Future Enhancements**  
1. **Edge Cases:** Handle concurrent edits or conflicts.  
2. **Advanced Prefetching:** Predict user navigation based on behavior.  
3. **Animation Library:** Integrate Framer Motion for smoother transitions.  

---

This ticket ensures the app feels fast, responsive, and intuitive while maintaining visual polish. Let me know if adjustments are needed!
