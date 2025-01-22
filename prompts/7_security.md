### **Ticket 7: Implement Security Best Practices**  
**Role:** Frontend Developer (FE) & Backend Developer (BE)  

---

#### **Description**  
Enhance application security by implementing input validation, CSRF protection, secure API communication, and error handling. Ensure compliance with security standards to protect against common vulnerabilities (e.g., XSS, CSRF, SQL injection).  

---

### **Acceptance Criteria**  
1. **Input Validation:**  
   - Frontend forms validate user inputs (e.g., URL format, text length).  
   - Backend PocketBase collections enforce strict validation rules.  

2. **CSRF Protection:**  
   - CSRF tokens are generated and validated for state-changing requests (POST/PUT/DELETE).  

3. **Secure Communication:**  
   - All client-server communication uses HTTPS (enforced in production).  
   - API endpoints reject non-HTTPS requests in production.  

4. **Error Handling:**  
   - Generic error messages are shown to users (no sensitive data exposure).  
   - Security-critical errors (e.g., failed logins) are logged in PocketBase.  

5. **PocketBase Hardening:**  
   - Admin credentials and secrets are stored securely (not in version control).  
   - Rate limiting is configured for authentication endpoints.  

---

### **Implementation Steps**  

#### **1. Frontend: Input Validation**  
- **React Hook Form + Yup Integration:**  
  ```tsx  
  // src/components/LinkForm.tsx  
  import { useForm } from 'react-hook-form';  
  import { yupResolver } from '@hookform/resolvers/yup';  
  import * as yup from 'yup';  

  const schema = yup.object({  
    url: yup.string().url('Invalid URL').required('URL is required'),  
    title: yup.string().max(100, 'Title too long'),  
  });  

  const LinkForm = () => {  
    const { register, handleSubmit, formState: { errors } } = useForm({  
      resolver: yupResolver(schema),  
    });  

    return (  
      <form onSubmit={handleSubmit(...)}>  
        <TextField  
          label="URL"  
          error={!!errors.url}  
          helperText={errors.url?.message}  
          {...register('url')}  
        />  
      </form>  
    );  
  };  
  ```  

#### **2. Backend: PocketBase Validation Rules**  
- **Update `links` Collection Schema:**  
  - `url`: Enforce URL format with `pattern: ^https?://.+`.  
  - `title`: Set max length to 100 characters.  
  - Enable "Required" for mandatory fields.  

#### **3. CSRF Protection**  
- **PocketBase Configuration:**  
  - Enable CSRF protection in PocketBase settings (`Settings → Security`).  
- **Frontend Axios Interceptor:**  
  ```ts  
  // src/services/api.ts  
  import pb from './pocketbase';  

  pb.client.interceptors.request.use((config) => {  
    config.headers['X-CSRF-Token'] = pb.authStore.token;  
    return config;  
  });  
  ```  

#### **4. HTTPS Enforcement**  
- **Netlify Configuration:**  
  - Redirect HTTP to HTTPS in `netlify.toml`:  
    ```toml  
    [[redirects]]  
      from = "http://*"  
      to = "https://splat.netlify.app/:splat"  
      status = 301  
    ```  
- **PocketBase Server:**  
  - Configure reverse proxy (Nginx/Apache) to enforce HTTPS.  

#### **5. Error Handling & Logging**  
- **Frontend Generic Errors:**  
  ```tsx  
  // src/components/ErrorBoundary.tsx  
  const ErrorFallback = () => (  
    <Alert severity="error">An unexpected error occurred. Please try again.</Alert>  
  );  
  ```  
- **Backend Security Logs:**  
  - Create a `security_logs` collection in PocketBase with fields:  
    - `action` (e.g., "login_failed", "invalid_input").  
    - `user_id` (relation to `users`).  
    - `ip_address`.  
    - `timestamp`.  

#### **6. Rate Limiting**  
- **PocketBase Rate Limiting (Hooks):**  
  ```js  
  // PocketBase hook for auth endpoints  
  pb.onBeforeAuth((req) => {  
    const ip = req.headers['x-real-ip'];  
    const key = `rate_limit:${ip}`;  
    const count = cache.get(key) || 0;  

    if (count > 5) throw new Error('Too many requests');  
    cache.set(key, count + 1, 60); // 60-second window  
  });  
  ```  

---

### **Testing**  
1. **Input Validation:**  
   - Submit invalid URLs/text to forms; verify rejection.  
2. **CSRF:**  
   - Test API requests without valid tokens; ensure 403 errors.  
3. **HTTPS:**  
   - Deploy to staging and confirm HTTP → HTTPS redirect.  
4. **Error Logging:**  
   - Trigger failed logins and check `security_logs`.  

