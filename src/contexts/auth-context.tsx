"use client";

import { LS_TOKEN as COOKIE_TOKEN } from "@/constants"; // You can rename this to COOKIE_TOKEN for clarity
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookie, setCookie, deleteCookie } from "cookies-next/client";
import { logger } from "@/utils/logger";

interface JwtPayload {
  email: string;
  name: string;
  role: string;
  [key: string]: string;
}

interface AuthContextType {
  token: string | null;
  email: string | null;
  name: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean;
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
        logger.error("Invalid token:", err);
        setEmail(null);
        setName(null);
        setRole(null);
      }
    } else {
      setEmail(null);
      setName(null);
      setRole(null);
    }
  };

  // Load token from cookies on mount
  useEffect(() => {
    const storedToken = getCookie(COOKIE_TOKEN) as string | undefined;
    logger.trace("Cookie value retrieved:", storedToken);
    if (storedToken) {
      setToken(storedToken);
      decodeToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Redirect if not authenticated
  // useEffect(() => {
  //   if (!loading && !token) {
  //     const currentPath = window.location.pathname;
  //     const publicPaths = ["/auth/login", "/auth/register", "/", "/shop", "/about"];
  //     if (!publicPaths.includes(currentPath)) {
  //       router.push("/auth/login");
  //     }
  //   }
  // }, [token, loading, router]);

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      setCookie(COOKIE_TOKEN, newToken, { secure: false, sameSite: "lax", path: "/" });
    } else {
      deleteCookie(COOKIE_TOKEN, { path: "/" });
    }
    decodeToken(newToken);
  };

  const onLogout = () => {
    handleSetToken(null);
    setToken(null);
    setEmail(null);
    setName(null);
    setRole(null);
    router.push("/auth/login");
  };

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        token,
        email,
        name,
        role,
        setToken: handleSetToken,
        logout: onLogout,
        isLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
