import CustomersOrders from '@/components/order/customers-orders'
import React from 'react'

export const metadata = {
  title: 'Customers Orders',
  description: 'Customers Orders Page',
}

const CustomersOrdersPage = () => {
  return (
    <div>
      <CustomersOrders />
    </div>
  )
}

export default CustomersOrdersPage