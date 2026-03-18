"use client"

import { useState } from "react"
import ReportFilters from "./_components/ReportFilters"
import { Filters } from "./_types/report"
import {
  useCashDifference, useDailyMaterialUsage, useMaterialStock, useOutstandingSales,
  useProductionVsSales, useProductStock, useSalesDetail, useSummary
} from "./_hooks/useReport"
import { SalesSummaryCard } from "./_components/SalesSummaryCard"
import { ProfitSummaryCard } from "./_components/ProfitSummaryCard"
import { SettlementSummaryCard } from "./_components/SettlementSummaryCard"
import { SalesDetailCard } from "./_components/SalesDetailCard"
import { ProductionVsSalesCard } from "./_components/ProductionVsSalesCard"
import { OutstandingSalesCard } from "./_components/OutstandingSalesCard"
import { ProductStockCard } from "./_components/ProductStockCard"
import { MaterialStockCard } from "./_components/MaterialStockCard"
import { MaterialUsageCard } from "./_components/MaterialUsageCard"
import { CashDifferenceCard } from "./_components/CashDifferenceCard"

export default function ReportsPage() {

  const today = new Date().toISOString().slice(0, 10)

  const [filters, setFilters] = useState<Filters>({
    start_date: today,
    end_date: today
  })

  const summary = useSummary(filters)
  const sales = useSalesDetail(filters)
  const production = useProductionVsSales(filters)
  const outstanding = useOutstandingSales(filters)
  const productStock = useProductStock(filters)
  const materialStock = useMaterialStock(filters)
  const usage = useDailyMaterialUsage(filters)
  const cashDiff = useCashDifference(filters)

  const loading =
    summary.loading ||
    sales.loading ||
    production.loading ||
    outstanding.loading ||
    productStock.loading ||
    materialStock.loading ||
    usage.loading ||
    cashDiff.loading

  return (
    <div className="space-y-8">

      <ReportFilters
        filters={filters}
        onChangeAction={setFilters}
      />

      {loading && <p>Loading...</p>}

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SalesSummaryCard data={summary.data} />
        <ProfitSummaryCard data={summary.data} />
        <SettlementSummaryCard data={summary.data} />
      </div>

      {/* DETAIL */}
      <SalesDetailCard data={sales.data} />

      {/* INSIGHT */}
      <ProductionVsSalesCard data={production.data} />

      {/* RISK */}
      <OutstandingSalesCard data={outstanding.data} />

      {/* INVENTORY */}
      <div className="grid md:grid-cols-2 gap-4">
        <ProductStockCard data={productStock.data} />
        <MaterialStockCard data={materialStock.data} />
      </div>

      {/* USAGE */}
      <MaterialUsageCard data={usage.data} />

      {/* AUDIT */}
      <CashDifferenceCard data={cashDiff.data} />

    </div>
  )
}
