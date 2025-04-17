import React from 'react';

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