'use client'

import { useEffect, useState } from 'react'
import {
  fetchTodaySale,
  startTodaySale,
  confirmSale,
  settleSale,
  addSaleItem,
  cancelSale,
  removeSaleItem
} from './actions'
import { useAuth } from '@/providers/AuthProvider'

export function useSale() {
  const [sale, setSale] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const { user } = useAuth();

  useEffect(() => {
    if (user) { load() }
  }, [user])

  async function load() {
    setLoading(true)
    try {
      const data = await fetchTodaySale()
      setSale(data)
    } catch {
      setSale(null)
    } finally {
      setLoading(false)
    }
  }

  async function start() {
    setProcessing(true)
    try {
      const data = await startTodaySale()
      setSale(data)
    } finally {
      setProcessing(false)
    }
  }

  async function confirm() {
    if (!sale) return
    setProcessing(true)
    try {
      const data = await confirmSale(sale.id)
      setSale(data)
    } finally {
      setProcessing(false)
    }
  }

  async function settle() {
    if (!sale) return
    setProcessing(true)
    try {
      const data = await settleSale(sale.id)
      setSale(data)
    } finally {
      setProcessing(false)
    }
  }

  async function cancel() {
    if (!sale) return
    setProcessing(true)
    try {
      const data = await cancelSale(sale.id)
      setSale(data)
    } finally {
      setProcessing(false)
    }
  }

  async function addItem(productId: string) {
    if (!sale) return
    setProcessing(true)
    try {
      const data = await addSaleItem(sale.id, productId)
      setSale(data)
    } finally {
      setProcessing(false)
    }
  }

  async function removeItem(itemId: string) {
    if (!sale) return
    setProcessing(true)
    try {
      const data = await removeSaleItem(sale.id, itemId)
      setSale(data)
    } finally {
      setProcessing(false)
    }
  }

  return {
    sale,
    loading,
    processing,
    start,
    confirm,
    settle,
    cancel,
    addItem,
    removeItem
  }
}
