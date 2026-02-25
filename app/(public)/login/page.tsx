'use client'

import { showToast } from '@/lib/alert';
import { useAuth } from '@/providers/AuthProvider'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!
  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect jika sudah login
  useEffect(() => {
    if (!loading && user) {
      router.push("/overview");
    }
  }, [loading, user, router]);

  const handleLogin = () => {
    setLoading(true);
    setError(null);

    fetch(`${apiUrl}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          return await response
            .json()
            .catch(() => null)
            .then((data) => {
              throw new Error(data?.message || "Login failed.");
            });
        }

        return await response.json(); // jika Anda ingin membaca body
      })
      .then((data) => {
        refreshUser();
        showToast(data.message, 'success')
      })
      .catch((err) => {
        setError(err.message);
        showToast(err.message, 'error');
      })
      .finally(() => { setLoading(false); });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8 shadow-sm">

        <Link href="/" className="mb-2 text-xs uppercase tracking-widest text-amber-500">
          KacangRebus
        </Link>

        <h1 className="mb-6 text-2xl font-semibold text-slate-100">
          Sign in
        </h1>

        {error && (
          <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400 border border-red-500/20">
            {error}
          </p>
        )}

        <div className="space-y-5">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100
                     outline-none transition
                     focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100
                     outline-none transition
                     focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-black
                   transition hover:bg-amber-400 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  )
}
