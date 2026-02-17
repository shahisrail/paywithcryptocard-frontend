'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  balance: number;
  isActive?: boolean;
  isEmailVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    try {
      const response = await api.getMe() as { success: boolean; data?: User };
      if (response.success && response.data) {
        setUser({
          id: response.data.id,
          email: response.data.email,
          fullName: response.data.fullName,
          role: response.data.role,
          balance: response.data.balance,
          isActive: response.data.isActive,
          isEmailVerified: response.data.isEmailVerified,
        });
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.login({ email, password }) as { success: boolean; user?: User };
    if (response.success && response.user) {
      setUser(response.user);
      if (response.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    const response = await api.register({ email, password, fullName }) as { success: boolean; user?: User };
    if (response.success && response.user) {
      setUser(response.user);
      router.push('/dashboard');
    }
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
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
