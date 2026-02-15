import Card from "@/components/ui/Card";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Overview</h2>
        <p className="text-sm text-slate-400">
          Today’s operational summary
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Revenue Today
          </p>
          <p className="mt-2 text-3xl font-semibold">Rp 4.250.000</p>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Transactions
          </p>
          <p className="mt-2 text-3xl font-semibold">128</p>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Gross Margin
          </p>
          <p className="mt-2 text-3xl font-semibold">32%</p>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Low Stock
          </p>
          <p className="mt-2 text-3xl font-semibold text-red-400">
            5 Items
          </p>
        </Card>
      </div>
    </div>
  );
}
