'use client'

import Card from '@/components/ui/Card'
import { useSale } from './useSale'
import { useProducts } from './useProducts'
import { useEffect, useState } from 'react'

export default function SalesPage() {
  const { products, refreshProducts } = useProducts()
  const { sale, loading, processing, validationErrors, start, confirm, settle, addItem, removeItem } = useSale()
  const [amountReceived, setAmountReceived] = useState<number>(0)

  const formatNumberID = new Intl.NumberFormat('id-ID')

  const statusColor: Record<string, string> = {
    draft: 'bg-slate-600/80 text-slate-100',
    confirmed: 'bg-amber-500/80 text-black',
    settled: 'bg-green-600/80 text-white',
    cancelled: 'bg-red-600/80 text-white',
  }

  function getDraftQty(productId: string) {
    const item = sale.items?.find((i: any) => i.product_id === productId)
    return item ? item.quantity : 0
  }

  function toLocaleID(value: number) {
    return formatNumberID.format(value)
  }

  const printSale = () => {
    window.open(`/api/sales/${sale.id}/print`, '_blank')
  }

  useEffect(() => {
    refreshProducts()
  }, [sale])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="animate-spin h-8 w-8 border-4 border-amber-400 border-t-black rounded-full mx-auto" />
          <p className="text-sm text-gray-400">Preparing today's sales session...</p>
        </div>
      </div>
    )
  }

  if (!sale) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 max-w-sm">
          <div className="text-4xl">🧾</div>
          <h2 className="text-lg font-semibold">No Active Sale</h2>
          <p className="text-sm text-gray-400">
            You haven’t started today’s sales session yet.
          </p>

          <button
            onClick={start}
            className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:opacity-90 transition"
          >
            Start Today’s Sale
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 md:p-6">
      {/* LEFT - Items */}
      <div className="lg:col-span-7">
        <Card>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-400">Invoice</p>
              <p className="font-medium">{sale.invoice_number}</p>
            </div>

            <span className={`text-xs px-3 py-1 rounded ${statusColor[sale.status] ?? 'bg-slate-700 text-white'}`}>
              {sale.status.toUpperCase()}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {products.map(p => {
              const draftQty = sale.status === 'draft'
                ? getDraftQty(p.id)
                : 0

              const currentStock = p.available - draftQty
              const disabled =
                sale.status !== 'draft' ||
                currentStock <= 0

              return (
                <button
                  key={p.id}
                  disabled={disabled}
                  onClick={() => addItem(p.id)}
                  className={`rounded-lg border p-3 text-left transition hover:cursor-pointer
                  ${disabled
                      ? 'opacity-50 cursor-not-allowed border-slate-800'
                      : 'hover:bg-slate-800 border-slate-700'}
                  `}
                >
                  <div className="flex justify-between text-sm font-medium">
                    <span>{p.name}</span>
                    <span>Rp {toLocaleID(p.price)}</span>
                  </div>

                  <div className="mt-1 text-xs text-slate-400">
                    Stock: {toLocaleID(currentStock)}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-6 space-y-3">
            {sale.items?.length === 0 && (
              <p className="text-sm text-slate-500">
                No items yet.
              </p>
            )}

            {sale.items && sale.items?.map((item: any) => {
              const draftQty = sale.status === 'draft'
                ? getDraftQty(item.product.id)
                : 0

              const currentStock = item.product.available - draftQty

              return (
                <div key={item.id} className="flex justify-between items-center text-sm" >
                  <div>
                    <div>{item.product.name}</div>
                    <div className="text-xs text-slate-400">
                      Rp {toLocaleID(item.unit_price)} × {toLocaleID(item.quantity)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      disabled={sale.status !== 'draft'}
                      onClick={() => removeItem(item.id)}
                      className="w-6 h-7 rounded border border-slate-700 hover:bg-slate-800 disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="w-6 text-center">
                      {toLocaleID(item.quantity)}
                    </span>

                    <button
                      disabled={
                        sale.status !== 'draft' ||
                        currentStock <= 0
                      }
                      onClick={() => addItem(item.product.id)}
                      className="w-6 h-7 rounded border border-slate-700 hover:bg-slate-800 disabled:opacity-40"
                    >
                      +
                    </button>

                    <div className="w-24 text-right font-medium">
                      Rp {toLocaleID(item.total_price)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* RIGHT - Summary */}
      <div className="lg:col-span-5">
        <Card>
          <h3 className="text-sm text-slate-400">
            Summary
          </h3>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp {toLocaleID(sale.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>Rp {toLocaleID(sale.discount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>Rp {toLocaleID(sale.tax)}</span>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>Rp {toLocaleID(sale.total)}</span>
            </div>

            <div className="mt-6 border-t border-slate-800 pt-4 space-y-4">

              {/* Confirm */}
              <button
                onClick={confirm}
                disabled={processing || sale.status !== 'draft'}
                className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-black hover:cursor-pointer disabled:opacity-50"
              >
                Confirm Sale
              </button>

              {/* Amount + Settle */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">

                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">
                    Amount Received
                  </label>

                  {validationErrors?.amount && (
                    <p className="text-xs text-red-400 mt-1">
                      {validationErrors.amount[0]}
                    </p>
                  )}

                  <input
                    type="number"
                    // min="0"
                    value={amountReceived}
                    onChange={(e) => setAmountReceived(Number(e.target.value))}
                    disabled={sale.status !== 'confirmed'}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-sm focus:outline-none disabled:opacity-50"
                  />
                </div>

                <button
                  onClick={() => settle(amountReceived)}
                  disabled={processing || sale.status !== 'confirmed'}
                  className="w-full rounded-lg bg-green-500 py-3 font-semibold text-black hover:cursor-pointer disabled:opacity-50"
                >
                  Settle Sale
                </button>

              </div>

              {/* Print */}
              <button
                onClick={printSale}
                disabled={!['settled', 'confirmed'].includes(sale.status)}
                className="w-full rounded-lg bg-slate-700 py-3 font-semibold hover:cursor-pointer disabled:opacity-40"
              >
                Print PDF
              </button>

            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
