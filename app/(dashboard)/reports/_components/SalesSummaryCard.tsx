import Card from "@/components/ui/Card"

export function SalesSummaryCard({ data }: { data: any }) {
  if (!data) return null

  return (
    <Card>
      <h3 className="font-semibold mb-2">Sales</h3>

      <p>Total Sales: {data.total_sales}</p>
      <p>Transactions: {data.transactions}</p>
      <p>Avg Transaction: {data.avg_transaction}</p>
    </Card>
  )
}
