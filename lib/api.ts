import { QueryParams } from '@/type/api';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchLocations(params?: QueryParams) {
  return apiFetch(`${BASE_URL}/locations${toQuery(params)}`);
}

export async function fetchMaterials(params?: QueryParams) {
  return apiFetch(`${BASE_URL}/materials${toQuery(params)}`)
}

export async function fetchProducts(params?: QueryParams) {
  return apiFetch(`${BASE_URL}/products${toQuery(params)}`)
}

export async function apiFetch(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(options?.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options?.headers || {})
    },
    ...options,
  })

  let data: any = null

  try {
    data = await response.json()
  } catch {
    // Laravel kadang tidak mengirim JSON (misal 204 No Content)
    data = null
  }

  if (!response.ok) {
    const error: any = new Error(
      data?.message ?? response.statusText ?? 'Request failed'
    )

    error.status = response.status
    error.errors = data?.errors ?? null
    error.data = data ?? null

    throw error
  }

  return data
}

export function toQuery(params?: QueryParams) {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}


