export type SaleStatus = 'draft' | 'confirmed' | 'settled' | 'cancelled'

export type Product = {
  id: string
  name: string
  price: number
  available: number
}

export type SaleItem = {
  id: number
  product: Product
  unit_price: number
  quantity: number
  total_price: number
}

export type Sale = {
  id: number
  invoice_number: string
  sale_date: string
  status: SaleStatus
  subtotal: number
  discount: number
  tax: number
  total: number
  items: SaleItem[]
}
