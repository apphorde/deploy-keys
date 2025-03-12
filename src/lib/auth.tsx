
// Mock authentication service - would connect to a real authentication service in production
import { useEffect, useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

// Local storage keys
const USER_STORAGE_KEY = 'keymaster_user';

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
};

// Auth state management
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = () => {
    return new Promise<User>((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Set user data in state and localStorage
        setUser(mockUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
        resolve(mockUser);
      }, 800);
    });
  };

  const signOut = () => {
    return new Promise<void>((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Clear user data from state and localStorage
        setUser(null);
        localStorage.removeItem(USER_STORAGE_KEY);
        resolve();
      }, 500);
    });
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user
  };
}

// Create an auth context to provide authentication throughout the app
import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<User>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
