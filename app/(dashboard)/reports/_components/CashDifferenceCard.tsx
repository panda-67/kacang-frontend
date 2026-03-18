import Card from "@/components/ui/Card"

export function CashDifferenceCard({ data }: { data: any[] }) {
  if (!data?.length) return null

  return (
    <Card>
      <h3 className="font-semibold mb-3">Cash Difference</h3>

      {data.map((row, i) => (
        <div key={i} className="flex justify-between">
          <span>{row.date}</span>
          <span className={
            row.difference !== 0 ? "text-red-500" : "text-green-600"
          }>
            {row.difference}
          </span>
        </div>
      ))}
    </Card>
  )
}
