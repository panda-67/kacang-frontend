'use client'

import { useEffect, useState } from 'react'
import { showError } from '@/lib/alert';
import { QueryParams } from '@/type/api';
import { fetchLocations } from '@/lib/api';

type Location = {
  id: string;
  name: string;
}

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [query, setQuery] = useState<QueryParams>({});
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    load()
  }, [query])

  async function load() {
    setLoading(true)
    try {
      const data = await fetchLocations(query)
      setLocations(data)
    } catch (err: any) {
      setLocations([])
      showError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function refreshLocations() {
    setProcessing(true)
    try {
      const data = await fetchLocations(query)
      setLocations(data)
    } finally {
      setProcessing(false)
    }
  }

  return {
    loading,
    processing,
    locations,
    setQuery,
    refreshLocations
  }
}
