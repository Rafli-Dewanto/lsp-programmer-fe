import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Orders | CakeVille Bakery",
  description: "View your order history and track your delivery status.",
}

const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className='min-h-screen container mx-auto py-8'>
        {children}
      </main>
    </>
  );
};

export default OrderLayout;