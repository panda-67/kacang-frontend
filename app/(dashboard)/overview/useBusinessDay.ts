"use client"

import { fetchLocations } from "@/lib/api";
import { useEffect, useState } from "react";
import { closeBusinessDay, fetchBusinessDay, openBusinessDay } from "./actions";
import { showError, showSuccess } from "@/lib/alert";

type Location = {
  id: string;
  name: string;
};

type BusinessDay = {
  id: number;
  location_id: number;
  status: "open" | "closed";
  opened_at: string;
  opened_by: string;
  closed_at: string;
  closed_by: string;
};

export function useBusinessDay() {
  const [type, setType] = useState<"sales_point" | "central">("sales_point");
  const [businessDays, setBusinessDays] = useState<Record<string, BusinessDay | null>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    init();
  }, [type]);

  const init = async () => {
    const locs = await fetchLocations({ type: type });
    setLocations(locs);

    for (const loc of locs) {
      const bd = await fetchBusinessDay(loc.id);
      setBusinessDays((prev) => ({ ...prev, [loc.id]: bd }));
    }
  };

  const handleOpen = async (locationId: string) => {
    setLoadingMap((prev) => ({ ...prev, [locationId]: true }));

    try {
      const data = await openBusinessDay(locationId);
      showSuccess(data.message)
    } catch (err: any) {
      showError(err.message)
    }

    const bd = await fetchBusinessDay(locationId);

    setBusinessDays((prev) => ({ ...prev, [locationId]: bd }));
    setLoadingMap((prev) => ({ ...prev, [locationId]: false }));
  };

  const handleClose = async (locationId: string) => {
    setLoadingMap((prev) => ({ ...prev, [locationId]: true }));

    try {
      const data = await closeBusinessDay(locationId);
      showSuccess(data.message)
    } catch (err: any) {
      showError(err.message)
    }

    const bd = await fetchBusinessDay(locationId);

    setBusinessDays((prev) => ({ ...prev, [locationId]: bd }));
    setLoadingMap((prev) => ({ ...prev, [locationId]: false }));
  };
  return {
    businessDays,
    loadingMap,
    locations,
    type,
    init,
    setType,
    handleOpen,
    handleClose
  }
}
