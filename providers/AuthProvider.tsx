"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode; }) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.status === 401) {
        setUser(null);
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      setUser(data);

    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser().finally(() => setLoading(false));
  }, []);

  const refreshUser = async () => {
    await fetchUser();
  };

  const logout = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }} >
      {children}
    </AuthContext.Provider>
  );
}
