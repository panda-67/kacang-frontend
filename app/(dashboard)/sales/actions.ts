import { apiFetch } from '@/lib/api'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function fetchTodaySale() {
  return apiFetch(`${apiUrl}/sales/today`)
}

export async function startTodaySale() {
  return apiFetch(`${apiUrl}/sales/start`, {
    method: 'POST',
  })
}

export async function confirmSale(id: string) {
  return apiFetch(`${apiUrl}/sales/${id}/confirm`, {
    method: 'POST'
  })
}

export async function settleSale(id: string, amount: number) {
  return apiFetch(`${apiUrl}/sales/${id}/settle`, {
    method: 'POST',
    body: JSON.stringify({
      amount: amount,
    })

  })
}

export async function cancelSale(id: string) {
  return apiFetch(`${apiUrl}/sales/${id}/cancel`, {
    method: 'POST'
  })
}

export async function addSaleItem(id: string, productId: string) {
  return apiFetch(`${apiUrl}/sales/${id}/items`, {
    method: 'POST',
    body: JSON.stringify({
      product_id: productId,
      quantity: 1
    })
  })
}

export async function removeSaleItem(id: string, itemId: string) {
  return apiFetch(`${apiUrl}/sales/${id}/items/${itemId}`, {
    method: 'DELETE',
  })
}

export async function fetchProducts() {
  return apiFetch(`${apiUrl}/products`)
}
