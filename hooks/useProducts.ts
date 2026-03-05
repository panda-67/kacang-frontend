'use client'

import { useEffect, useState } from 'react'
import { showError } from '@/lib/alert';
import { QueryParams } from '@/type/api';
import { fetchProducts } from '@/lib/api';

type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  available: number
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<QueryParams>({});
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    try {
      const data = await fetchProducts(query)
      setProducts(data)
    } catch (err: any) {
      setProducts([])
      showError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function refreshProducts() {
    setProcessing(true)
    try {
      const data = await fetchProducts(query)
      setProducts(data)
    } finally {
      setProcessing(false)
    }
  }

  return {
    loading,
    processing,
    products,
    setQuery,
    refreshProducts
  }
}
