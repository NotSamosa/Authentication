'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, AuthStatus, LoginFormValues, SignupFormValues } from '@/types/auth';
import { mockAuthApi } from '@/services/mockAuthApi';

export interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (values: LoginFormValues) => Promise<{ success: boolean; error?: string }>;
  signup: (values: SignupFormValues) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  // Hydrate session on app mount
  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const response = await mockAuthApi.getSession();
        if (isMounted) {
          if (response.success && response.data) {
            setUser(response.data.user);
            setStatus('authenticated');
          } else {
            setUser(null);
            setStatus('unauthenticated');
          }
        }
      } catch {
        if (isMounted) {
          setUser(null);
          setStatus('unauthenticated');
        }
      }
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (values: LoginFormValues) => {
    const response = await mockAuthApi.login(values);
    if (response.success && response.data) {
      setUser(response.data.user);
      setStatus('authenticated');
      return { success: true };
    }
    return { success: false, error: response.error || 'Failed to login' };
  }, []);

  const signup = useCallback(async (values: SignupFormValues) => {
    const response = await mockAuthApi.signup(values);
    if (response.success && response.data) {
      setUser(response.data.user);
      setStatus('authenticated');
      return { success: true };
    }
    return { success: false, error: response.error || 'Failed to sign up' };
  }, []);

  const logout = useCallback(async () => {
    setStatus('loading');
    await mockAuthApi.logout();
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const value: AuthContextType = {
    user,
    status,
    isAuthenticated: status === 'authenticated' && !!user,
    isLoading: status === 'loading',
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
