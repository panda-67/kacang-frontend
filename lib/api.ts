import { QueryParams } from '@/type/api';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchLocations(params?: QueryParams) {
  const query = buildQuery(params);
  return apiFetch(`${BASE_URL}/locations${query}`);
}

export async function fetchMaterials(params?: QueryParams) {
  const query = buildQuery(params)
  return apiFetch(`${BASE_URL}/materials${query}`)
}

export async function fetchProducts(params?: QueryParams) {
  const query = buildQuery(params)
  return apiFetch(`${BASE_URL}/products${query}`)
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

export function buildQuery(params?: QueryParams) {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}


