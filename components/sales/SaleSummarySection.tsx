import { Sale } from "@/type/sales"
import Card from "@/components/ui/Card"

type Props = {
  sale: Sale
  processing: boolean
  amountReceived: number
  setAmountReceived: (v: number) => void
  confirm: () => void
  cancel: () => void
  settle: (v: number) => void
  validationErrors: any
  toLocaleID: Function
}

export function SaleSummarySection({ sale, processing, amountReceived, setAmountReceived, confirm, cancel, settle, validationErrors, toLocaleID }: Props) {
  const printSale = () => {
    window.open(`/api/sales/${sale.id}/print`, '_blank')
  }

  return (
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

            <div className='flex gap-3'>
              {/* Confirm */}
              <button
                onClick={cancel}
                disabled={processing || sale.status !== 'confirmed'}
                className="w-full rounded-lg bg-slate-500 py-3 font-semibold text-black hover:cursor-pointer disabled:opacity-50"
              >
                Cancel Sale
              </button>

              {/* Confirm */}
              <button
                onClick={confirm}
                disabled={processing || sale.status !== 'draft'}
                className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-black hover:cursor-pointer disabled:opacity-50"
              >
                Confirm Sale
              </button>
            </div>

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

  );
}
