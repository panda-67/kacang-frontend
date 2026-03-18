import Card from "@/components/ui/Card"

export function SettlementSummaryCard({ data }: { data: any }) {
  if (!data) return null

  return (
    <Card>
      <h3 className="font-semibold mb-2">Settlement</h3>

      <p>Cash: {data.cash_total}</p>
      <p>Transfer: {data.transfer_total}</p>
      <p>E-Wallet: {data.ewallet_total}</p>
    </Card>
  )
}
