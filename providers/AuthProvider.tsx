"use client";

import { showError, showToast } from "@/lib/alert";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type Location = {
  id: string;
  name: string;
}

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  roleName: string;
  activeLocation: string;
  activeLocationName: string | null;
  accessibleLocations: Location[] | [];
  businessDay: {
    id: string;
    open: boolean;
  };
};

type AuthContextType = {
  activeLocation: string | null;
  setActiveLocation: Dispatch<SetStateAction<string | null>>;
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
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const fetchUser = async (location?: string | null) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(location && { "X-Active-Location": location }),
        },
      });

      if (res.status === 401) {
        setUser(null);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to fetch user");
      }

      const data = await res.json();
      setUser(data);

      if (!activeLocation && data.activeLocation) {
        setActiveLocation(data.activeLocation);
      }

    } catch (data: any) {
      setUser(null);
      showError(data.message);
    }
  };

  useEffect(() => {
    fetchUser().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeLocation) {
      fetchUser(activeLocation);
    }
  }, [activeLocation]);

  const refreshUser = async () => {
    await fetchUser();
  };

  const logout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: { "X-Active-Location": "" }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Logout failed");
      }

      showToast(data.message, "success");
      setUser(null);

    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        activeLocation,
        setActiveLocation,
        refreshUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
