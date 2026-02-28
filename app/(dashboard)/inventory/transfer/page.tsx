import TransferForm from "@/components/TransferForm";

export default function TransferPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-4">
      <div className="mx-auto max-w-md space-y-6">

        <h1 className="text-2xl font-semibold text-slate-100">
          Transfer Stock
        </h1>

        <TransferForm />

      </div>
    </div>
  );
}
