import { useEffect, useRef, useState } from "react"
import { Filters } from "../_types/report"
import { reportService } from "../_services/reportService"
import { showError } from "@/lib/alert"

type Fetcher<T> = (filters: Filters) => Promise<T>

export const useSummary = (f: Filters) =>
  useReport(reportService.getSummary, f)

export const useSalesDetail = (f: Filters) =>
  useReport(reportService.getSalesDetail, f)

export const useCashDifference = (f: Filters) =>
  useReport(reportService.getCashDifference, f, { debounceMs: 0 })

export const useProductionVsSales = (f: Filters) =>
  useReport(reportService.getProductionVsSales, f)

export const useOutstandingSales = (f: Filters) =>
  useReport(reportService.getOutstandingSales, f)

export const useProductStock = (f: Filters) =>
  useReport(reportService.getProductStock, f, { debounceMs: 500 })

export const useMaterialStock = (f: Filters) =>
  useReport(reportService.getMaterialStock, f, { debounceMs: 500 })

export const useDailyMaterialUsage = (f: Filters) =>
  useReport(reportService.getDailyMaterialUsage, f)

export function useReport<T>(
  fetcher: Fetcher<T>,
  filters: Filters,
  options?: {
    enabled?: boolean
    debounceMs?: number
  }
) {

  const { enabled = true, debounceMs = 300 } = options || {}

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const abortRef = useRef<AbortController | null>(null)
  const cacheRef = useRef<Map<string, T>>(new Map())

  const key = JSON.stringify(filters)

  function refresh() {
    cacheRef.current.delete(key)
  }

  useEffect(() => {
    if (!enabled) return
    if (!filters.start_date || !filters.end_date) return

    const timeout = setTimeout(async () => {

      // cache hit
      if (cacheRef.current.has(key)) {
        setData(cacheRef.current.get(key)!)
        return
      }

      // cancel previous request
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        setLoading(true)
        setError(null)

        const result = await fetcher(filters)

        if (!controller.signal.aborted) {
          setData(result)
          cacheRef.current.set(key, result)
        }

      } catch (err: any) {
        if (!controller.signal.aborted) {
          setError(err)
          showError(err?.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }

    }, debounceMs)

    return () => clearTimeout(timeout)

  }, [key, enabled])

  return { data, loading, error, refresh }
}
