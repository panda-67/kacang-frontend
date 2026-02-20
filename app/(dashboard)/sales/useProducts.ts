'use client'

import { useEffect, useState } from 'react'
import { fetchProducts } from './actions'

export function useProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    load()
  }, [])

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

  async function refresh() {
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
    refresh
  }
}
