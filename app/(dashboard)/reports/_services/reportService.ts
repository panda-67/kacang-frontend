import { apiFetch, toQuery } from "@/lib/api"
import { Filters, ReportSummary } from "../_types/report"

const BASE = `${process.env.NEXT_PUBLIC_API_URL}/reports`

export const reportService = {

  async getSummary(filters: Filters): Promise<ReportSummary> {
    return await apiFetch(`${BASE}/summary${toQuery(filters)}`)
  },

  async getSalesDetail(filters: Filters) {
    return await apiFetch(`${BASE}/sales-detail${toQuery(filters)}`)
  },

  async getCashDifference(filters: Filters) {
    return await apiFetch(`${BASE}/cash-difference${toQuery(filters)}`)
  },

  async getProductionVsSales(filters: Filters) {
    return await apiFetch(`${BASE}/production-vs-sales${toQuery(filters)}`)
  },

  async getOutstandingSales(filters: Filters) {
    return await apiFetch(`${BASE}/outstanding-sales${toQuery(filters)}`)
  },

  async getProductStock(filters: Filters) {
    return await apiFetch(`${BASE}/product-stock${toQuery(filters)}`)
  },

  async getMaterialStock(filters: Filters) {
    return await apiFetch(`${BASE}/material-stock${toQuery(filters)}`)
  },

  async getMaterialLedger(materialId: string, filters: Filters) {
    return await apiFetch(`${BASE}/${materialId}/material-ledger${toQuery(filters)}`)
  },

  async getDailyMaterialUsage(filters: Filters) {
    return await apiFetch(`${BASE}/material-daily-usage${toQuery(filters)}`)
  }

}

