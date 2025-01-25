import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import PocketBase, { ClientResponseError, AuthMethodsList } from 'pocketbase';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log('AuthProvider initialized'); // Debug log

  const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
  console.log('PocketBase URL:', import.meta.env.VITE_POCKETBASE_URL); // Debug log

  const loginWithPassword = async (email: string, password: string) => {
    const authData = await pb.collection('users').authWithPassword(email, password);
    setUser({
      id: authData.record.id,
      name: authData.record.name,
      email: authData.record.email
    });
  };

  const loginWithOAuth = async (provider: string) => {
    console.log('loginWithOAuth called with provider:', provider); // Debug log
    setIsLoading(true);
    try {
      console.log('Starting OAuth flow...'); // Debug log
      
      const redirectUrl = `${window.location.origin}/auth/callback`;
      console.log('Redirect URL:', redirectUrl); // Debug log

      // List auth methods to debug
      const authMethods = await pb.collection('users').listAuthMethods();
      console.log('Available auth methods:', JSON.stringify(authMethods, null, 2)); // Debug log

      console.log('Initiating OAuth2 authentication...'); // Debug log
      await pb.collection('users').authWithOAuth2({
        provider: provider,
        createData: {
          emailVisibility: true,
        },
        redirectUrl: redirectUrl
      });
      
      // We should never reach this point as the above should redirect
      console.log('Warning: OAuth redirect did not occur'); // Debug log
      throw new Error('OAuth redirect failed');
      
    } catch (error) {
      console.log('Caught error in loginWithOAuth'); // Debug log
      if (error instanceof ClientResponseError) {
        console.error('OAuth ClientResponseError:', {
          message: error.message,
          response: error.response,
          url: error.url,
          status: error.status,
          data: error.data
        });
        throw new Error(`Authentication failed: ${error.message}`);
      }
      console.error('OAuth general error:', error);
      throw error;
    } finally {
      setIsLoading(false);
      console.log('loginWithOAuth completed'); // Debug log
    }
  };

  const logout = () => {
    console.log('Logging out...'); // Debug log
    pb.authStore.clear();
    setUser(null);
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    console.log('Auth effect running...'); // Debug log
    
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth state...'); // Debug log
        // Refresh auth token if valid
        if (pb.authStore.isValid) {
          console.log('Auth token is valid, refreshing...'); // Debug log
          const authData = await pb.collection('users').authRefresh();
          setUser({
            id: authData.record.id,
            name: authData.record.name,
            email: authData.record.email
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        pb.authStore.clear();
        setUser(null);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      console.log('Auth state changed:', { hasToken: !!token, hasModel: !!model }); // Debug log
      if (token && model) {
        setUser({
          id: model.id,
          name: model.name || model.username,
          email: model.email
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
      console.log('Auth effect cleanup'); // Debug log
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginWithPassword, loginWithOAuth, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
