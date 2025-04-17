"use client";

import { LS_TOKEN } from '@/constants';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  email: string;
  name: string;
  role: string;
  [key: string]: string; // In case there are additional fields
}

interface AuthContextType {
  token: string | null;
  email: string | null;
  name: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Decode and store user info
  const decodeToken = (token: string | null) => {
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setEmail(decoded.email || null);
        setName(decoded.name || null);
        setRole(decoded.role || null);
      } catch (err) {
        console.error("Invalid token:", err);
        setEmail(null);
        setName(null);
      }
    } else {
      setEmail(null);
      setName(null);
    }
  };

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(LS_TOKEN);
    setToken(storedToken);
    decodeToken(storedToken);
    setLoading(false);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !token) {
      const currentPath = window.location.pathname;
      const publicPaths = ['/auth/login', '/auth/register', '/'];
      if (!publicPaths.includes(currentPath)) {
        router.push('/auth/login');
      }
    }
  }, [token, loading, router]);

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem(LS_TOKEN, newToken);
    } else {
      localStorage.removeItem(LS_TOKEN);
    }
    decodeToken(newToken);
  };

  const logout = () => {
    handleSetToken(null);
    router.push('/auth/login');
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ token, email, name, setToken: handleSetToken, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};