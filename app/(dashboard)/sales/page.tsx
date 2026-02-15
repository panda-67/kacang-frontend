'use client'

import { apiFetch } from '@/lib/api'
import { useEffect, useState } from 'react'
import Card from "@/components/ui/Card";


export default function SalesPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [sales, setSales] = useState<any[]>([])

  useEffect(() => {
    apiFetch(`${apiUrl}/sales`)
      .then(data => setSales(data.data ?? data))
      .catch(() => { })
  }, [])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Product Section */}
      <div className="lg:col-span-7 space-y-4">
        <input
          placeholder="Search product..."
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm outline-none focus:border-amber-500"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {sales.map((sale) => (
            <button
              key={sale.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-left transition hover:border-amber-500"
            >
              <p className="text-sm font-medium">{sale.invoice_number}</p>
              <p className="mt-1 text-xs text-slate-400">{sale.sale_date}</p>
              <p className="mt-1 text-xs text-slate-400">
                Rp 25.000
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="lg:col-span-5">
        <Card>
          <h3 className="text-sm font-medium text-slate-400">
            Current Sale
          </h3>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Kacang Original x2</span>
              <span>Rp 50.000</span>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>Rp 50.000</span>
            </div>

            <button className="mt-4 w-full rounded-lg bg-amber-500 py-3 font-semibold text-black transition hover:bg-amber-400">
              Complete Sale
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

