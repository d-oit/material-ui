### **Ticket 6: Implement GDPR Compliance**  
**Role:** Frontend Developer (FE) & Backend Developer (BE)  

---

#### **Description**  
Ensure the application complies with GDPR regulations by implementing data minimization, user consent management, data erasure workflows, and activity logging. Users must explicitly consent to data collection, request data deletion, and have all data processing activities logged.  

---

### **Acceptance Criteria**  
1. **User Consent:**  
   - A consent banner is displayed on first visit, requiring explicit agreement before data collection.  
   - Consent status is stored in PocketBase and enforced across sessions.  

2. **Data Erasure:**  
   - Users can request account and data deletion via the UI.  
   - All user data (links, categories, preferences) is permanently deleted upon request.  

3. **Activity Logging:**  
   - PocketBase logs data processing activities (create, read, update, delete) in a `gdpr_logs` collection.  
   - Logs include user ID, action type, timestamp, and affected data.  

4. **Data Minimization:**  
   - Only collect essential data (e.g., no unnecessary form fields).  

---

### **Implementation Steps**  

#### **1. Frontend: Consent Banner**  
```tsx  
// src/components/GDPRBanner.tsx  
import { useEffect, useState } from 'react';  
import { Button, Snackbar, Alert } from '@mui/material';  
import pb from '../services/pocketbase';  

const GDPRBanner = () => {  
  const [showBanner, setShowBanner] = useState(false);  

  useEffect(() => {  
    const user = pb.authStore.model;  
    if (!user?.gdpr_consent) setShowBanner(true);  
  }, []);  

  const handleConsent = async (consent: boolean) => {  
    await pb.collection('users').update(pb.authStore.model?.id, { gdpr_consent: consent });  
    setShowBanner(false);  
  };  

  return (  
    <Snackbar open={showBanner} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>  
      <Alert severity="info" sx={{ width: '100%' }}>  
        We use cookies to improve your experience.  
        <Button onClick={() => handleConsent(true)}>Accept</Button>  
        <Button onClick={() => handleConsent(false)}>Decline</Button>  
      </Alert>  
    </Snackbar>  
  );  
};  
```  

#### **2. Frontend: Data Deletion Workflow**  
```tsx  
// src/components/SettingsPage.tsx  
import { useMutation } from '@tanstack/react-query';  
import pb from '../services/pocketbase';  

const DeleteAccountButton = () => {  
  const { mutate: deleteUser } = useMutation(async () => {  
    // Delete user and all associated data  
    await pb.collection('users').delete(pb.authStore.model?.id);  
    pb.authStore.clear();  
  });  

  return (  
    <Button  
      variant="contained"  
      color="error"  
      onClick={() => {  
        if (window.confirm('Permanently delete all data?')) deleteUser();  
      }}  
    >  
      Delete Account  
    </Button>  
  );  
};  
```  

#### **3. Backend: GDPR Logging (PocketBase Hooks)**  
Create a `gdpr_logs` collection with fields:  
- `user_id` (relation to `users`)  
- `action` (text: "consent", "delete", "data_access")  
- `timestamp` (date)  
- `metadata` (JSON: e.g., `{ "deleted_records": 15 }`).  

**Add JavaScript Hooks to Log Actions:**  
```js  
// PocketBase hook for users collection  
pb.collection('users').onAfterDelete((e) => {  
  const userId = e.record.id;  
  // Delete all user-linked data  
  pb.collection('links').delete(`user_id = '${userId}'`);  
  pb.collection('link_categories').delete(`user_id = '${userId}'`);  

  // Log deletion  
  pb.collection('gdpr_logs').create({  
    user_id: userId,  
    action: 'delete',  
    metadata: {  
      deleted_links: e.record.links?.length || 0,  
      deleted_categories: e.record.categories?.length || 0,  
    },  
  });  
});  
```  

#### **4. Backend: Data Minimization**  
- Remove unnecessary fields from forms/collections (e.g., redundant user metadata).  
- Update PocketBase collection rules to reject non-essential data.  

---

### **Testing**  
1. Verify consent banner appears for new users and blocks data collection if declined.  
2. Test account deletion:  
   - All user data (links, categories, logs) must be erased.  
   - Confirm `gdpr_logs` records the deletion.  
3. Check `gdpr_logs` for entries after consent changes or data access.  

---

### **Documentation**  
- Update privacy policy page with GDPR compliance details.  
- Provide a `GET /api/gdpr_logs` endpoint for audit purposes (admin-only).  

---

### **Future Enhancements**  
1. Add data portability (export user data as JSON/CSV).  
2. Implement automatic log cleanup after retention periods.  

---

This ticket ensures legal compliance and builds user trust through transparent data practices. Let me know if adjustments are needed!
