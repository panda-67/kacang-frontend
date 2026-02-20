'use client'

import Card from '@/components/ui/Card'
import { useAuth } from '@/providers/AuthProvider'
import { useSale } from './useSale'
import { useProducts } from './useProducts'

export default function SalesPage() {
  const { user } = useAuth()
  const { products } = useProducts()
  const { sale, loading, processing, start, confirm, settle, addItem, removeItem } = useSale()

  const formatNumberID = new Intl.NumberFormat('id-ID')
  const isOperator = user?.role === 'operator'
  const isManager = user?.role === 'manager'

  function getDraftQty(productId: string) {
    const item = sale.items.find((i: any) => i.product_id === productId)
    return item ? item.quantity : 0
  }

  function toLocaleID(value: number) {
    return formatNumberID.format(value)
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  if (!sale) {
    return (
      <div className="p-6">
        {isOperator && (
          <button onClick={start}>
            Start Today Sale
          </button>
        )}
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

            <span className="text-xs px-3 py-1 rounded bg-slate-600/80">
              {sale.status.toUpperCase()}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {products.map(p => {
              const disabled =
                !isOperator ||
                sale.status !== 'draft' ||
                p.available - getDraftQty(p.id) <= 0

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
                    Stock: {toLocaleID(p.available - getDraftQty(p.id))}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-6 space-y-3">
            {sale.items.length === 0 && (
              <p className="text-sm text-slate-500">
                No items yet.
              </p>
            )}

            {sale.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center text-sm" >
                <div>
                  <div>{item.product.name}</div>
                  <div className="text-xs text-slate-400">
                    Rp {toLocaleID(item.unit_price)} × {toLocaleID(item.quantity)}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    disabled={sale.status !== 'draft' || !isOperator}
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
                      !isOperator ||
                      item.product.available - getDraftQty(item.product.id) <= 0
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
            ))}
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

            {isOperator && sale.status === 'draft' && (
              <button
                onClick={confirm}
                disabled={processing}
                className="mt-4 w-full rounded-lg bg-amber-500 py-3 font-semibold text-black hover:cursor-pointer"
              >
                Confirm Sale
              </button>
            )}

            {isManager && sale.status === 'confirmed' && (
              <button
                onClick={settle}
                disabled={processing}
                className="mt-4 w-full rounded-lg bg-green-500 py-3 font-semibold text-black hover:cursor-pointer"
              >
                Settle Sale
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
