export async function apiFetch(
  url: string,
  options?: RequestInit
) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error('Request failed')
  }

  return response.json()
}
