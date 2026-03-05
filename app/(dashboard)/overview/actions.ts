import { apiFetch } from "@/lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBusinessDay(locationId: string) {
  return apiFetch(`${BASE_URL}/business-day?location=${locationId}`);
}

export async function openBusinessDay(locationId: string) {
  return apiFetch(`${BASE_URL}/business-day/open`, {
    method: "POST",
    body: JSON.stringify({ location: locationId }),
  });
}

export async function closeBusinessDay(locationId: string) {
  return apiFetch(`${BASE_URL}/business-day/close`, {
    method: "POST",
    body: JSON.stringify({ location: locationId }),
  });
}

