export async function apiFetch(
  url: string,
  options: RequestInit = {}
) {
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
