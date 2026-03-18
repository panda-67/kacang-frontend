import Card from "@/components/ui/Card"

export function ProductStockCard({ data }: { data: any[] }) {
  if (!data?.length) return null

  return (
    <Card>
      <h3 className="font-semibold mb-3">Product Stock</h3>

      {data.map((row, i) => (
        <div key={i} className="flex justify-between">
          <span>{row.product_name}</span>
          <span>{row.stock}</span>
        </div>
      ))}
    </Card>
  )
}
