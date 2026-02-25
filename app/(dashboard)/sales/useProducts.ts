'use client'

import { useEffect, useState } from 'react'
import { fetchProducts } from './actions'
import { useAuth } from '@/providers/AuthProvider'

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) { load() }
  }, [user])


  async function load() {
    setLoading(true)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  async function refreshProducts() {
    setProcessing(true)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } finally {
      setProcessing(false)
    }
  }

  return {
    products,
    loading,
    processing,
    refreshProducts
  }
}
