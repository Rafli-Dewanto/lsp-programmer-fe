"use client";

import { useCartStore } from '@/store/cart';
import { formatCurrency } from '@/utils/string';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Separator } from '@radix-ui/react-select';
import React from 'react'
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { usePlaceOrder } from '@/services/order/mutations/use-place-order';

const ShoppingCart = () => {
  const { items } = useCartStore();
  const orderMutation = usePlaceOrder();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleCheckout() {
    orderMutation.mutate({
      items: items.map((item) => ({
        cake_id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
    }, {
      onSuccess: (data) => {
        if (data.data?.redirect_url) {
          window.location.href = data.data.redirect_url;
        }
        alert("Order created successfully");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  }

  return (
    <div>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ScrollArea className="max-h-[400px] pr-2">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <CardContent className="flex justify-between items-center py-4">
                    <div>
                      <p className="text-lg font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × {formatCurrency(item.price, "id-ID")}
                      </p>
                    </div>
                    <p className="text-md font-semibold text-pink-600">
                      {formatCurrency(item.price * item.quantity, "id-ID")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <Separator className="my-6" />

          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold text-gray-800">Total</p>
            <p className="text-xl font-bold text-pink-600">{formatCurrency(total, 'id-ID')}</p>
          </div>

          <Button onClick={handleCheckout} className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white text-lg py-6 rounded-xl">
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  )
}

export default ShoppingCart