import Card from "@/components/ui/Card"

export function ProfitSummaryCard({ data }: { data: any }) {
  if (!data) return null

  return (
    <Card>
      <h3 className="font-semibold mb-2">Profit</h3>

      <p>COGS: {data.cogs}</p>
      <p>Gross Profit: {data.gross_profit}</p>
    </Card>
  )
}
