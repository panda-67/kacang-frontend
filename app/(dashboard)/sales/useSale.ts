'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { showCancel, showConfirm, showError, showSettle, showSuccess } from '@/lib/alert';
import {
  fetchTodaySale,
  startTodaySale,
  confirmSale,
  settleSale,
  addSaleItem,
  cancelSale,
  removeSaleItem
} from './actions'

export function useSale() {
  const [validationErrors, setValidationErrors] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [sale, setSale] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const formatNumberID = new Intl.NumberFormat('id-ID')

  const statusColor: Record<string, string> = {
    draft: 'bg-slate-600/80 text-slate-100',
    confirmed: 'bg-amber-500/80 text-black',
    settled: 'bg-green-600/80 text-white',
    cancelled: 'bg-red-600/80 text-white',
  }

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
    } catch (err: any) {
      await showError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  async function confirm() {
    if (!sale) return
    setValidationErrors(null)
    setError(null)

    const result = await showConfirm('Confirm this sale?')
    if (!result.isConfirmed) return

    setProcessing(true)

    try {
      const data = await confirmSale(sale.id)
      setSale(data)
      await showSuccess('Sale confirmed successfully')
    } catch (err: any) {
      setError(err.message)
      await showError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  async function settle(amount: number) {
    if (!sale) return
    setValidationErrors(null)
    setError(null)

    const result = await showSettle('Settle this sale?')
    if (!result.isConfirmed) return

    setProcessing(true)

    try {
      const data = await settleSale(sale.id, amount)
      setSale(data)
      await showSuccess('Sale settled successfully')
    } catch (err: any) {
      if (err.status === 403) {
        setError(err.message)
        await showError(err.message)
      } else if (err.status === 422) {
        setValidationErrors(err.errors)
      } else {
        setError(err.message || 'Something went wrong.')
        await showError(err.message || 'Something went wrong.')
      }
    } finally {
      setProcessing(false)
    }
  }

  async function cancel() {
    if (!sale) return
    setValidationErrors(null)
    setError(null)

    const result = await showCancel('Cancel this sale?')
    if (!result.isConfirmed) return

    setProcessing(true)

    try {
      const data = await cancelSale(sale.id)
      setSale(data)
      await showSuccess('Sale cancelled successfully')
    } catch (err: any) {
      setError(err.message)
      await showError(err.message)
    } finally {
      load()
      setProcessing(false)
    }
  }

  async function addItem(productId: string) {
    if (!sale) return
    setValidationErrors(null)
    setProcessing(true)
    setError(null)

    try {
      const data = await addSaleItem(sale.id, productId)
      setSale(data)
    } catch (err: any) {
      setError(err.message)
      await showError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  async function removeItem(itemId: string) {
    if (!sale) return
    setValidationErrors(null)
    setProcessing(true)
    setError(null)

    try {
      const data = await removeSaleItem(sale.id, itemId)
      setSale(data)
    } catch (err: any) {
      setError(err.message)
      await showError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  function toLocaleID(value: number) {
    return formatNumberID.format(value)
  }

  function getDraftQty(productId: string) {
    const item = sale.items?.find((i: any) => i.product_id === productId)
    return item ? item.quantity : 0
  }


  return {
    sale,
    loading,
    processing,
    error,
    validationErrors,
    statusColor,
    load,
    start,
    confirm,
    settle,
    cancel,
    addItem,
    removeItem,
    toLocaleID,
    getDraftQty
  }
}
