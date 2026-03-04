import MaterialStockInForm from "@/components/StockInForm";

export default function MaterialStockInPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-4">
      <div className="mx-auto max-w-md lg:max-w-3xl space-y-6">

        <div>
          <h1 className="text-2xl font-semibold text-slate-100">
            Material Stock-In (Purchase)
          </h1>
          <p className="text-sm text-slate-400">
            Add new material stock into inventory from Purchase
          </p>
        </div>

        <MaterialStockInForm />

      </div>
    </div>
  );
}
