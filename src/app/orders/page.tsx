import OrderHistory from '@/components/order/order-history'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Orders | CakeVille Bakery",
  description: "View your order history and track your delivery status.",
}

const OrderPage = () => {
  return (
    <div>
      <OrderHistory />
    </div>
  )
}

export default OrderPage