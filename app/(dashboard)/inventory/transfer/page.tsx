import TransferForm from "@/components/TransferForm";

export default function TransferPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-4">
      <div className="mx-auto max-w-md lg:max-w-3xl space-y-6">

        <div>
          <h1 className="text-2xl font-semibold text-slate-100">
            Transfer Stock
          </h1>
          <p className="text-sm text-slate-400">
            Moving stock from central to sales point
          </p>
        </div>

        <TransferForm />

      </div>
    </div>
  );
}
