import ShopPage from '@/components/shop/menus'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Shop | CakeVille Bakery",
  description: "Browse our selection of cakes and pastries, and place your order.",
}

const ShoppingPage = () => {
  return (
    <>
      <ShopPage />
    </>
  )
}

export default ShoppingPage