import { QueryParams } from "@/type/api"

export interface Filters extends QueryParams {
  start_date?: string
  end_date?: string
  location_id?: string
  status?: string
}

export interface ReportSummary {
  total_sales: number
  transactions: number
  items_sold: number
  avg_transaction: number
}
