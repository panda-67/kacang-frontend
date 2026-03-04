import ProductInForm from "@/components/ProductInForm";

export default function ProductionPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-4">
      <div className="mx-auto max-w-md lg:max-w-3xl space-y-6">

        <div>
          <h1 className="text-2xl font-semibold text-slate-100">
            Production
          </h1>
          <p className="text-sm text-slate-400">
            Add new stock into inventory from production
          </p>
        </div>

        <ProductInForm />

      </div>
    </div>
  );
}
