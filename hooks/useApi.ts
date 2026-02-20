'use client'

import { useAuth } from '@/providers/AuthProvider'
import { apiFetch } from '@/lib/api'

export function useApi() {
  const { activeLocation } = useAuth()

  async function apiWithLocation(
    url: string,
    options?: RequestInit
  ) {
    return apiFetch(url, {
      ...options,
      headers: {
        ...(options?.headers || {}),
        'X-Active-Location': activeLocation ?? '',
      },
    })
  }

  return { apiWithLocation }
}
