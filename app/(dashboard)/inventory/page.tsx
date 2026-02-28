import InventoryTable from "@/components/InventoryTable";

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-4">
      <div className="mx-auto max-w-6xl space-y-6">

        <div>
          <h1 className="text-2xl font-semibold text-slate-100">
            Inventory Overview
          </h1>
          <p className="text-sm text-slate-400">
            Current stock per product
          </p>
        </div>

        <InventoryTable />

      </div>
    </div>
  );
}
