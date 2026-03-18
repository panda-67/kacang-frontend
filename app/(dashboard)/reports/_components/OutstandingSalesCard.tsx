import Card from "@/components/ui/Card"

export function OutstandingSalesCard({ data }: { data: any[] }) {
  if (!data?.length) return null

  return (
    <Card>
      <h3 className="font-semibold mb-3">Outstanding Sales</h3>

      {data.map((row, i) => (
        <div key={i} className="flex justify-between">
          <span>{row.customer}</span>
          <span className="text-red-500">{row.amount}</span>
        </div>
      ))}
    </Card>
  )
}
