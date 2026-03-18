import Card from "@/components/ui/Card"

export function MaterialUsageCard({ data }: { data: any[] }) {
  if (!data?.length) return null

  return (
    <Card>
      <h3 className="font-semibold mb-3">Material Usage</h3>

      {data.map((row, i) => (
        <div key={i} className="flex justify-between">
          <span>{row.material_name}</span>
          <span>{row.used}</span>
        </div>
      ))}
    </Card>
  )
}
