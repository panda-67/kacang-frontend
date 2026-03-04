type NoProductsProps = {
  onGoInventory: () => void
}

type NoSaleProps = {
  onStart: () => void
}

export function NoProducts({ onGoInventory }: NoProductsProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4 max-w-sm">
        <div className="text-4xl">📦</div>
        <h2 className="text-lg font-semibold">No Product in Inventory</h2>
        <p className="text-sm text-gray-400">
          Add products before starting a sale.
        </p>

        <button
          onClick={onGoInventory}
          className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:opacity-90 transition"
        >
          Add Product Now
        </button>
      </div>
    </div>
  );
}

export function NoSales({ onStart }: NoSaleProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4 max-w-sm">
        <div className="text-4xl">🧾</div>
        <h2 className="text-lg font-semibold">No Active Sale</h2>
        <p className="text-sm text-gray-400">
          You haven’t started today’s sales session yet.
        </p>

        <button
          onClick={onStart}
          className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:opacity-90 transition"
        >
          Start Today’s Sale
        </button>
      </div>
    </div>
  )

}

export function SaleLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-3">
        <div className="animate-spin h-8 w-8 border-4 border-amber-400 border-t-black rounded-full mx-auto" />
        <p className="text-sm text-gray-400">Preparing today's sales session...</p>
      </div>
    </div>
  )
}
