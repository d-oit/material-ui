import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import pb from '../services/pocketbase';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      pb.authStore.save(userData.token, userData);
      return userData;
    }
    return null;
  });

  const loginWithPassword = async (email: string, password: string) => {
    const authData = await pb.collection('users').authWithPassword(email, password);
    const userData = {
      id: authData.record.id,
      name: authData.record.name,
      email: authData.record.email,
      token: authData.token
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const loginWithOAuth = async (provider: string) => {
    try {
      // Start the OAuth flow - this will redirect to the provider
      await pb.collection('users').authWithOAuth2({
        provider: provider,
        createData: {
          emailVisibility: true,
        },
        // Use window.location.origin to get the base URL of the application
        redirectUrl: `${window.location.origin}/auth/callback`
      });
    } catch (error) {
      console.error('OAuth login error:', error);
      throw error;
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      if (token && model) {
        const userData = {
          id: model.id,
          name: model.name || model.username,
          email: model.email,
          token: token
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginWithPassword, loginWithOAuth, logout, isAuthenticated }}>
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
