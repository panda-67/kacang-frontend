'use client'

import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";

export default function Home() {
  const { user, loading, logout } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-50 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute -bottom-50 -right-50 h-125 w-125 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Kacang<span className="text-indigo-400">.</span>
        </Link>

        {loading ? (
          <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
        ) : user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/overview"
              className="rounded-full bg-indigo-600 px-5 py-2 text-sm transition hover:bg-indigo-500"
            >
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="rounded-full border border-white/20 px-5 py-2 text-sm transition hover:border-white hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-full border border-white/20 px-5 py-2 text-sm transition hover:border-white hover:bg-white/10"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Hero */}
      <main className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 text-center">
        <h2 className="bg-linear-to-r from-white to-zinc-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
          Sistem yang cepat.
          <br />
          Tanpa kompromi.
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Backend kuat berbasis Laravel. Frontend modern dengan Next.js.
          Arsitektur bersih. Performa maksimal. Tidak ada lapisan yang sia-sia.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-medium transition hover:bg-indigo-500"
          >
            Masuk Sekarang
          </Link>

          <Link
            href="#features"
            className="rounded-full border border-white/20 px-8 py-3 text-sm transition hover:border-white hover:bg-white/10"
          >
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </main>

      {/* Feature Section */}
      <section
        id="features"
        className="mx-auto mt-32 grid max-w-6xl gap-8 px-6 pb-24 sm:grid-cols-3"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold">API Bersih</h3>
          <p className="mt-3 text-sm text-zinc-400">
            Arsitektur terpisah. Frontend dan backend independen namun
            terintegrasi rapi.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold">Token Based Auth</h3>
          <p className="mt-3 text-sm text-zinc-400">
            Autentikasi ringan dan aman menggunakan Laravel Sanctum.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold">Static Optimized</h3>
          <p className="mt-3 text-sm text-zinc-400">
            Build statis. Tanpa Node di server. Performa maksimal.
          </p>
        </div>
      </section>
    </div>
  );
}
