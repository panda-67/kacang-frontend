"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BurgerButton from "../ui/BurgerButton";

export default function Topbar({ open, setOpen }: { open: any, setOpen: any }) {
  const { user, setActiveLocation, logout } = useAuth();
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="relative flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 md:px-6">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <BurgerButton open={open} setOpen={setOpen} />

        <div className="hidden md:block">
          <h1 className="text-xs font-medium text-slate-400">
            Active Location
          </h1>
          <p className="text-sm font-semibold text-slate-200">
            {user?.activeLocationName}
          </p>
        </div>
      </div>

      {user?.role === 'manager' && (
        <select
          value={user?.activeLocation}
          onChange={(e) => setActiveLocation(e.target.value)}
        >
          {user?.accessibleLocations?.map((loc: any) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      )}

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Desktop business status */}
        <div
          className={`hidden md:inline-flex rounded-lg px-3 py-1 text-xs font-medium
            ${user?.businessDay?.open
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-rose-500/20 text-rose-400"
            }`}
        >
          Business Day: {user?.businessDay?.open ? "OPEN" : "CLOSED"}
        </div>

        {user && (
          <div ref={ref} className="relative">

            {/* Mobile avatar button */}
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-300"
            >
              <span className="hidden md:inline">
                {user.name}
              </span>
              <span className="md:hidden">
                👤
              </span>
            </button>

            {/* Dropdown panel */}
            {profileOpen && (
              <div className="absolute flex flex-col items-center right-0 mt-2 w-48 rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-xl">

                <div className="mb-3 text-sm text-slate-300 text-center">
                  <p className="text-sm font-semibold text-slate-200">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {user.roleName}
                  </p>
                </div>

                <div className="md:hidden mb-3 flex flex-col items-center">
                  <p className="text-xs text-slate-400">
                    Active Location
                  </p>
                  <p className="text-sm font-semibold text-slate-200">
                    Main Store
                  </p>
                </div>

                <div className="md:hidden mb-3 w-max rounded-lg bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                  Business Day: OPEN
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 transition hover:border-red-500 hover:text-red-400"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
