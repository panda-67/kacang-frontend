"use client"

import { useSale } from './useSale'
import { useProducts } from './useProducts'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { NoProducts, NoSales, SaleLoading } from '@/components/sales/SaleEmptyStates'
import { SaleItemsSection } from '@/components/sales/SaleItemsSection'
import { SaleSummarySection } from '@/components/sales/SaleSummarySection'

export default function SalesPage() {
  const router = useRouter();
  const { products, refreshProducts } = useProducts();
  const [amountReceived, setAmountReceived] = useState<number>(0);

  const {
    sale, loading, processing, validationErrors, statusColor,
    start, confirm, cancel, settle, addItem, removeItem, toLocaleID, getDraftQty
  } = useSale();

  useEffect(() => {
    refreshProducts()
  }, [sale])

  if (loading) { return <SaleLoading /> }

  if (products.length === 0) { return <NoProducts onGoInventory={() => router.push('/inventory')} /> }

  if (!sale) { return <NoSales onStart={start} /> }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 md:p-6">
      {/* LEFT - Items */}
      <SaleItemsSection
        sale={sale}
        products={products}
        addItem={addItem}
        removeItem={removeItem}
        getDraftQty={getDraftQty}
        toLocaleID={toLocaleID}
        statusColor={statusColor}
      />

      {/* RIGHT - Summary */}
      <SaleSummarySection
        sale={sale}
        processing={processing}
        amountReceived={amountReceived}
        setAmountReceived={setAmountReceived}
        confirm={confirm}
        cancel={cancel}
        settle={settle}
        validationErrors={validationErrors}
        toLocaleID={toLocaleID}
      />
    </div>
  )
}
