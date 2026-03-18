import Card from "@/components/ui/Card"

export function SalesDetailCard({ data }: { data: any[] }) {
  if (!data?.length) return null

  return (
    <Card>
      <h3 className="font-semibold mb-3">Sales Detail</h3>

      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Total</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.invoice}</td>
              <td>{row.total}</td>
              <td>{row.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
