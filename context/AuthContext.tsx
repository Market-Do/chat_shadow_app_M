import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User } from '@/types';
import { Platform } from 'react-native';

// Fallback for web platform where SecureStore is not available
const secureStorage = {
  async getItem(key: string) {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    return SecureStore.setItemAsync(key, value);
  },
  async deleteItem(key: string) {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    return SecureStore.deleteItemAsync(key);
  }
};

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  signIn: async () => {},
  register: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Check for existing authentication on startup
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await secureStorage.getItem('user');
        const token = await secureStorage.getItem('token');
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      // In a real app, we would validate with an API
      // For demo purposes, we'll simulate a successful login
      const token = 'demo-token-' + Date.now();
      
      // Mock user data
      const userData: User = {
        id: 'user1',
        username,
        status: 'Available',
      };
      
      // Save to secure storage
      await secureStorage.setItem('token', token);
      await secureStorage.setItem('user', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  const register = async (username: string, password: string) => {
    try {
      // In a real app, we would register with an API
      // For demo purposes, we'll simulate a successful registration
      const token = 'demo-token-' + Date.now();
      
      // Mock user data
      const userData: User = {
        id: 'user1',
        username,
        status: 'Available',
      };
      
      // Save to secure storage
      await secureStorage.setItem('token', token);
      await secureStorage.setItem('user', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  };

  const signOut = async () => {
    try {
      // Clear secure storage
      await secureStorage.deleteItem('token');
      await secureStorage.deleteItem('user');
      
      // Update state
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      user,
      signIn,
      register,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}