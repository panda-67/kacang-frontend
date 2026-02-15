"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <div>
        <h1 className="text-sm font-medium text-slate-400">
          Active Location
        </h1>
        <p className="text-sm font-semibold text-slate-200">
          Main Store
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
          Business Day: OPEN
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg cursor-pointer border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-red-500 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
