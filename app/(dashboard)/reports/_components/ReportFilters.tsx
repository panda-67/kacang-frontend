"use client"

import { Filters } from "../_types/report"
import { useLocations } from "@/hooks/useLocations";

export default function ReportFilters({
  filters,
  onChangeAction
}: {
  filters: Filters
  onChangeAction: (filters: Filters) => void
}) {

  const { locations } = useLocations()

  function update(key: keyof Filters, value: any) {
    const next = { ...filters, [key]: value }
    onChangeAction(next)
  }
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-3">

      <input
        type="date"
        value={filters.start_date}
        onChange={(e) => update("start_date", e.target.value)}
      />

      <input
        type="date"
        value={filters.end_date}
        onChange={(e) => update("end_date", e.target.value)}
      />

      <select
        onChange={(e) =>
          update("location_id", (e.target.value))
        }
      >
        <option value="">All locations</option>
        {locations?.map((loc: any) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

    </div>
  )
}
