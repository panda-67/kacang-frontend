import Card from "@/components/ui/Card"

export function ProductionVsSalesCard({ data }: { data: any[] }) {
  if (!data?.length) return null

  return (
    <Card>
      <h3 className="font-semibold mb-3">Production vs Sales</h3>

      {data.map((row, i) => {
        const diff = row.production - row.sales

        return (
          <div key={i} className="flex justify-between">
            <span>{row.product_name}</span>
            <span className={
              diff > 0 ? "text-yellow-600" :
                diff < 0 ? "text-red-600" :
                  "text-green-600"
            }>
              {diff}
            </span>
          </div>
        )
      })}
    </Card>
  )
}
