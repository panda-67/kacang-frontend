import Card from "@/components/ui/Card"
import { Product, Sale } from "@/type/sales"

type Props = {
  sale: Sale
  products: Product[]
  addItem: (id: string) => void
  removeItem: (id: string) => void
  getDraftQty: (id: string) => number
  toLocaleID: (value: number) => string
  statusColor: Record<string, string>
}

export function SaleItemsSection({ sale, products, addItem, removeItem, getDraftQty, toLocaleID, statusColor }: Props) {
  const formatDateID = (date: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  return (
    <div className="lg:col-span-7">
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-400">Invoice</p>
            <p className="font-medium">{sale.invoice_number}</p>
            <p className="text-sm text-slate-300">{formatDateID(sale.sale_date)}</p>
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
  );
}
